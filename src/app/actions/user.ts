"use server";

import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from 'next/headers';

export async function updateUserProfile(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to update your profile." };
  }

  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const address = formData.get("address") as string;
  const location = formData.get("location") as string;
  const gender = formData.get("gender") as string;
  const skills = formData.get("skills") as string;
  const headline = formData.get("headline") as string;

  const skillsArray = skills
    ? skills
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s)
    : [];

  try {
    await prisma.society.update({
      where: { user_id: user.id },
      data: {
        name,
        phone,
        address,
        location,
        gender,
        skills: skillsArray,
        headline,
      },
    });
  } catch (dbError) {
    console.error("Database Error:", dbError);
    return { error: "Failed to update profile." };
  }

  revalidatePath("/profile");
  redirect("/profile");
}

export async function getFullUserProfile() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  try {
    const userProfile = await prisma.user.findUnique({
      where: { id: user.id },
    });
    return userProfile;
  } catch (error) {
    console.error("Database Error fetching user profile:", error);
    return null;
  }
}
