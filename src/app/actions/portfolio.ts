"use server";

import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addPortfolioItem(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "You must be logged in to add a portfolio item." };
  }

  const society = await prisma.society.findUnique({
    where: { user_id: user.id },
  });
  if (!society) {
    return { error: "User profile not found." };
  }

  const skill = formData.get("skill") as string;
  const description = formData.get("description") as string;
  const file = formData.get("file") as File;

  if (!skill || !description || !file || file.size === 0) {
    return { error: "All fields are required." };
  }

  // Upload file to Supabase Storage
  const filePath = `portfolios/${user.id}/${Date.now()}-${file.name}`;
  const { error: uploadError } = await supabase.storage
    .from("wondrjob") // Make sure this is your bucket name
    .upload(filePath, file);

  if (uploadError) {
    console.error("Storage Error:", uploadError);
    return { error: "Failed to upload file." };
  }

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from("wondrjob").getPublicUrl(filePath);

  if (!publicUrl) {
    return { error: "Failed to get public URL for the file." };
  }

  // Create portfolio item in database
  try {
    await prisma.portofolio.create({
      data: {
        skill,
        description,
        file: publicUrl,
        society_id: society.id,
      },
    });
  } catch (dbError) {
    console.error("Database Error:", dbError);
    return { error: "Failed to save portfolio item to the database." };
  }

  // Revalidate path and redirect
  revalidatePath("/profile");
  redirect("/profile");
}
