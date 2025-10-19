import React from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import NewProfilePage from "./NewProfilePage";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return <NewProfilePage userId={user.id} />;
}
