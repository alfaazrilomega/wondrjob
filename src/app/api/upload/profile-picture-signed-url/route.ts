import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "You must be logged in." },
        { status: 401 },
      );
    }

    const { name, type } = await request.json();

    if (!name || !type) {
      return NextResponse.json(
        { error: "File name and type are required." },
        { status: 400 },
      );
    }

    const filePath = `${user.id}/${Date.now()}-${name}`;

    const { data, error } = await supabase.storage
      .from("profile-pictures")
      .createSignedUploadUrl(filePath, {
        upsert: true,
      });

    if (error) {
      console.error("Error creating signed URL:", error);
      return NextResponse.json(
        { error: "Failed to create upload URL." },
        { status: 500 },
      );
    }

    // Return the signed URL and the path to store in the DB later
    return NextResponse.json({ success: { ...data, path: filePath } });
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
