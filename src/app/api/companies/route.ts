import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  // Get the Supabase server client and user session
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  // If user is not logged in, return unauthorized
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    if (id) {
      const company = await prisma.company.findUnique({
        where: { id: parseInt(id) },
        include: {
          jobs: {
            include: {
              skills: true,
            },
          },
          monthlyStats: true,
          hrds: {
            include: {
              user: true,
            },
          },
          _count: {
            select: {
              Follow: true,
            },
          },
        },
      });

      if (!company) {
        return NextResponse.json(
          { success: false, error: "Company not found" },
          { status: 404 },
        );
      }

      // Transform the data to match frontend expectations
      const transformedCompany = {
        id: company.id,
        name: company.name,
        tagline: company.name, // Using name as tagline since it's not in schema
        logo:
          company.logo ||
          "https://placehold.co/100x100/1e1e2f/9f54ff?text=Logo",
        address: company.address,
        phone: company.phone,
        description: company.description,
        companyCertificateUrl: company.companyCertificateUrl || "#",
        website:
          "https://" + company.name.toLowerCase().replace(/\s+/g, "") + ".com", // Mock website
        followerCount: company._count.Follow,
        availablePositions: company.jobs.map((job) => ({
          id: job.id,
          position_name: job.position_name,
          location: company.address, // Using company address as location
          capacity: job.capacity,
          jobType: job.jobType,
          workStyle: job.workStyle,
          salaryMin: job.salaryMin,
          salaryMax: job.salaryMax,
        })),
        historicalSuccessRate:
          company.monthlyStats.length > 0
            ? Math.round(
                company.monthlyStats.reduce(
                  (sum, stat) => sum + stat.successRate,
                  0,
                ) / company.monthlyStats.length,
              )
            : 0,
        monthlyStats: company.monthlyStats.map((stat) => ({
          month: new Date(stat.year, stat.month - 1).toLocaleDateString(
            "en-US",
            { month: "short", year: "numeric" },
          ),
          successRate: stat.successRate,
        })),
        hrds: company.hrds.map((hrd) => ({
          id: hrd.id,
          user: {
            name: hrd.user.name,
            avatar:
              "https://placehold.co/40x40/777/FFF?text=" +
              hrd.user.name
                .split(" ")
                .map((n) => n[0])
                .join(""),
          },
        })),
      };

      return NextResponse.json({ success: true, data: transformedCompany });
    }

    // Filter companies by the logged-in user's ID
    const companies = await prisma.company.findMany({
      where: {
        user_id: user.id,
      },
      include: {
        user: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json({ success: true, data: companies });
  } catch (error) {
    console.error("GET_COMPANIES_ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
