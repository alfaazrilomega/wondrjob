"use server";

import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateUserProfile(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to update your profile." };
  }

  // Get all the text-based fields
  const name = formData.get("name") as string;
  const headline = formData.get("headline") as string;
  const about = formData.get("about") as string;
  const location = formData.get("location") as string;
  const phone = formData.get("phone") as string;
  const address = formData.get("address") as string;
  const skills = formData.get("skills") as string; // JSON string of skill IDs
  const profilePictureUrl = formData.get("profile_picture_url") as string | null;

  const skillIds = skills ? JSON.parse(skills) : [];

  try {
    const updateData: any = {
        name,
        headline,
        about,
        location,
        phone,
        address,
    };

    // Only add the profile picture URL if a new one was uploaded
    if (profilePictureUrl) {
        updateData.profile_picture = profilePictureUrl;
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        society: {
          update: updateData,
        },
        skills: {
          set: skillIds.map((id: number) => ({ id })),
        },
      },
    });
  } catch (dbError) {
    console.error("Database Error:", dbError);
    return { error: "Failed to update profile." };
  }

  revalidatePath("/profile");
  revalidatePath("/profile/edit");
  redirect("/profile");
}



export async function getFullUserProfile() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

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
