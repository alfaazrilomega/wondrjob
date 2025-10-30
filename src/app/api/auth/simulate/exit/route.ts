import { NextResponse } from "next/server";
// This endpoint exits the simulation
export async function POST() {
  const response = NextResponse.json({ success: true });

  // Clear the simulation cookies
  response.cookies.set("simulation_mode", "", { path: "/", maxAge: -1 });
  response.cookies.set("simulated_user_id", "", { path: "/", maxAge: -1 });
  response.cookies.set("original_admin_id", "", { path: "/", maxAge: -1 });
  response.cookies.set("simulated_user_name", "", { path: "/", maxAge: -1 });

  return response;
}
