import React from "react";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/lib/db";
import { redirect } from "next/navigation";
import NewEditProfilePage from "./NewEditProfilePage";

// --- Main Page Server Component ---
export default async function EditProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const userProfile = await prisma.society.findUnique({
    where: { user_id: user.id },
    select: {
      id: true,
      user_id: true,
      name: true,
      headline: true,
      location: true,
      phone: true,
      address: true,
      gender: true,
      about: true,
      profile_picture: true,
      user: {
        select: {
          skills: true,
        },
      },
    },
  });

  if (!userProfile) {
    // Or redirect to a creation page
    return <div className="text-center">Profile not found.</div>;
  }

  // Pass the initial data to the client component form
  return <NewEditProfilePage userProfile={userProfile} />;
}
