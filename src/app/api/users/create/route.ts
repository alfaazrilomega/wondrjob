import { NextResponse } from "next/server";
import { prisma } from "@/lib/lib/db";
import { UserRole } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { z } from "zod";

const userSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
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
      if (!data.companyAddress) {
        ctx.addIssue({
          code: "custom",
          path: ["companyAddress"],
          message: "Company address is required for company role",
        });
      }
      if (!data.companyPhone) {
        ctx.addIssue({
          code: "custom",
          path: ["companyPhone"],
          message: "Company phone is required for company role",
        });
      }
      if (!data.companyDescription) {
        ctx.addIssue({
          code: "custom",
          path: ["companyDescription"],
          message: "Company description is required for company role",
        });
      }
    } else if (data.role === UserRole.HRD) {
      if (!data.companyId) {
        ctx.addIssue({
          code: "custom",
          path: ["companyId"],
          message: "Company ID is required for HRD role",
        });
      }
    }
  });

export async function POST(request: Request) {
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

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists." },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();

    const newUser = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          id: userId,
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
              name,
              email,
              password: hashedPassword,
              user_id: userId,
              phone,
              address,
              date_of_birth: date_of_birth ? new Date(date_of_birth) : null,
            },
          });
          break;

        case UserRole.SOCIETY:
          await tx.society.create({
            data: {
              user_id: userId,
              name,
              phone: phone || "",
              address: address || "Default Address",
              date_of_birth: date_of_birth
                ? new Date(date_of_birth)
                : new Date(),
              skills: [],
            },
          });
          break;

        case UserRole.COMPANY:
          await tx.company.create({
            data: {
              user_id: userId,
              name: companyName,
              address: companyAddress,
              phone: companyPhone,
              description: companyDescription,
            },
          });
          break;

        case UserRole.HRD:
          const companyExists = await tx.company.findUnique({
            where: { id: parseInt(companyId) },
          });
          if (!companyExists) {
            throw new Error(`Company with ID ${companyId} not found.`);
          }
          await tx.hRD.create({
            data: {
              user_id: userId,
              company_id: parseInt(companyId),
            },
          });
          break;

        default:
          throw new Error(`Unsupported user role: ${role}`);
      }

      return user;
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("CREATE_USER_ERROR", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
