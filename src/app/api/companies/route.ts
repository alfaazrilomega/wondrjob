import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/lib/db";
import {
  getOverallApplicationStats,
  getCompanyApplicationStats,
} from "../application-stats";

async function testDatabaseConnection() {
  try {
    await prisma.$connect();
    return { success: true };
  } catch (error) {
    console.error("Database connection test failed:", error);
    return { success: false };
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(request: NextRequest) {
  try {
    const connectionResult = await testDatabaseConnection();
    if (!connectionResult.success) {
      return NextResponse.json(
        { success: false, error: "Database connection failed" },
        { status: 503 },
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id"); // Check for a single company ID

    // If a specific company ID is provided, fetch that single company
    if (id) {
      const companyId = parseInt(id, 10);

      if (isNaN(companyId)) {
        return NextResponse.json(
          { success: false, error: "Invalid ID format" },
          { status: 400 },
        );
      }

      const company = await prisma.company.findUnique({
        where: { id: companyId },
        include: {
          jobs: true, // Include all related jobs for the detail page
          monthlyStats: true,
        },
      });

      if (!company) {
        return NextResponse.json(
          { success: false, error: "Company not found" },
          { status: 404 },
        );
      }

      return NextResponse.json({ success: true, data: company });
    }

    const stats = searchParams.get("stats");
    const companyIdForStats = searchParams.get("companyId");

    // Handle request for stats
    if (stats) {
      let statsData;
      if (companyIdForStats) {
        if (
          typeof companyIdForStats === "string" &&
          !isNaN(parseInt(companyIdForStats))
        ) {
          statsData = await getCompanyApplicationStats(); // CALLING THE FUNCTION
        } else {
          return NextResponse.json(
            { error: "Invalid company ID" },
            { status: 400 },
          );
        }
      } else {
        statsData = await getOverallApplicationStats();
      }
      return NextResponse.json(statsData);
    }

    // Handle request for a list of all companies
    const search = searchParams.get("search") || "";
    const sort = searchParams.get("sort") || "name-asc";
    const category = searchParams.get("category") || "";

    const whereClause: { name?: object; description?: object } = {};
    if (search.trim()) {
      whereClause.name = { contains: search.trim(), mode: "insensitive" };
    }
    if (category.trim()) {
      whereClause.description = {
        contains: category.trim(),
        mode: "insensitive",
      };
    }

    let orderBy: object;
    switch (sort) {
      case "name-asc":
        orderBy = { name: "asc" };
        break;
      case "name-desc":
        orderBy = { name: "desc" };
        break;
      case "jobs-asc":
        orderBy = { jobs: { _count: "asc" } };
        break;
      case "jobs-desc":
        orderBy = { jobs: { _count: "desc" } };
        break;
      default:
        orderBy = { name: "asc" };
    }

    const companies = await prisma.company.findMany({
      where: whereClause,
      orderBy,
      include: {
        _count: { select: { jobs: true } },
        jobs: {
          select: {
            id: true,
            position_name: true,
            capacity: true,
            submission_end_date: true,
          },
          take: 5,
        },
        monthlyStats: true,
      },
      take: 100,
    });

    return NextResponse.json({
      success: true,
      data: companies,
      count: companies.length,
      filters: { search, category, sort },
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch companies" },
      { status: 500 },
    );
  }
}

export async function HEAD() {
  try {
    const connected = await testDatabaseConnection();
    return new NextResponse(null, { status: connected.success ? 200 : 503 });
  } catch {
    return new NextResponse(null, { status: 503 });
  }
}
