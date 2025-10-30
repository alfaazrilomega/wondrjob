import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/lib/db";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const company = await prisma.company.findUnique({
    where: { user_id: user.id },
  });

  if (!company) {
    return new NextResponse(JSON.stringify({ error: "Company not found" }), {
      status: 404,
    });
  }

  return new NextResponse(
    JSON.stringify({
      logoUrl: company.logo,
      companyName: company.name,
      tagline: company.tagline,
      website: company.website,
      phone: company.phone,
      address: company.address,
      certificateUrl: company.companyCertificateUrl,
      description: company.description,
    }),
    { status: 200 },
  );
}

export async function PUT(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const company = await prisma.company.findUnique({
    where: { user_id: user.id },
  });

  if (!company) {
    return new NextResponse(JSON.stringify({ error: "Company not found" }), {
      status: 404,
    });
  }

  try {
    const body = await request.json();
    const {
      companyName,
      tagline,
      website,
      phone,
      address,
      certificateUrl,
      description,
      logoUrl,
    } = body;

    const updatedCompany = await prisma.company.update({
      where: { id: company.id },
      data: {
        name: companyName,
        tagline: tagline,
        website: website,
        phone: phone,
        address: address,
        companyCertificateUrl: certificateUrl,
        description: description,
        logo: logoUrl,
      },
    });

    return new NextResponse(JSON.stringify(updatedCompany), { status: 200 });
  } catch {
    return new NextResponse(
      JSON.stringify({ error: "Failed to update profile" }),
      { status: 500 },
    );
  }
}
