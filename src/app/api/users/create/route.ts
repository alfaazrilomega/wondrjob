import { NextResponse } from "next/server";
import { prisma } from "@/lib/lib/db";
import { UserRole } from "@prisma/client";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";

const userSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.nativeEnum(UserRole),
    phone: z.string().optional(),
    address: z.string().optional(),
    date_of_birth: z.string().optional(),
    companyName: z.string().optional(),
    companyAddress: z.string().optional(),
    companyPhone: z.string().optional(),
    companyDescription: z.string().optional(),
    companyId: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.role === UserRole.COMPANY) {
      if (!data.companyName) {
        ctx.addIssue({
          code: "custom",
          path: ["companyName"],
          message: "Company name is required for company role",
        });
      }
      // Add other company-specific validations if needed
    }
  });

export async function POST(request: Request) {
  let newAuthUserId: string | undefined;
  const supabaseAdmin = createAdminClient();

  try {
    const body = await request.json();
    const {
      name,
      email,
      password,
      role,
      phone,
      address,
      date_of_birth,
      companyName,
      companyAddress,
      companyPhone,
      companyDescription,
      companyId,
    } = userSchema.parse(body);

    // Step 1: Attempt to create the user in Supabase Auth.
    // This will also act as our check for whether the user already exists.
    const { data: authData, error: authError } =
      await supabaseAdmin.auth.admin.createUser({
        email: email,
        password: password,
        email_confirm: true, // Automatically confirm the email
        user_metadata: { name: name, role: role },
      });

    if (authError) {
      // If the error indicates the user already exists, return a specific message.
      if (authError.message.toLowerCase().includes("already registered")) {
        return NextResponse.json(
          { error: "User with this email already exists." },
          { status: 409 }, // 409 Conflict
        );
      }
      // For any other auth-related error, throw it to be caught by the outer catch block.
      throw new Error(`Supabase auth error: ${authError.message}`);
    }

    if (!authData.user?.id) {
      throw new Error("Failed to create auth user in Supabase.");
    }

    newAuthUserId = authData.user.id;

    // Step 2: Create the user and related profiles in your public database
    const newUser = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          id: newAuthUserId!, // Use the ID from Supabase Auth
          name,
          email,
          role,
          phone,
          address,
          date_of_birth: date_of_birth ? new Date(date_of_birth) : null,
        },
      });

      switch (role) {
        case UserRole.ADMIN:
          await tx.admin.create({
            data: {
              user_id: newAuthUserId!,
              name,
              email,
              phone,
              address,
              date_of_birth: date_of_birth ? new Date(date_of_birth) : null,
            },
          });
          break;

        case UserRole.SOCIETY:
          await tx.society.create({
            data: {
              user_id: newAuthUserId!,
              name,
              phone: phone || "",
              address: address || "Default Address",
              date_of_birth: date_of_birth
                ? new Date(date_of_birth)
                : new Date(),
            },
          });
          break;

        case UserRole.COMPANY:
          await tx.company.create({
            data: {
              user_id: newAuthUserId!,
              name: companyName!,
              address: companyAddress!,
              phone: companyPhone!,
              description: companyDescription!,
            },
          });
          break;

        case UserRole.HRD:
          if (companyId) {
            const companyExists = await tx.company.findUnique({
              where: { id: parseInt(companyId) },
            });
            if (!companyExists) {
              throw new Error(`Company with ID ${companyId} not found.`);
            }
            await tx.hRD.create({
              data: {
                user_id: newAuthUserId!,
                company_id: parseInt(companyId),
              },
            });
          }
          break;

        default:
          throw new Error(`Unsupported user role: ${role}`);
      }

      return user;
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    // CRITICAL: If anything fails after Supabase user creation, delete the orphaned user.
    if (newAuthUserId) {
      console.log(`Rolling back orphaned Supabase auth user: ${newAuthUserId}`);
      await supabaseAdmin.auth.admin.deleteUser(newAuthUserId);
    }

    console.error("CREATE_USER_ERROR", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
