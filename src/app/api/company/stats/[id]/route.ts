import { NextResponse } from "next/server";
import { prisma } from "@/lib/lib/db";

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const companyId = parseInt(id);
    if (isNaN(companyId)) {
      return NextResponse.json(
        { success: false, error: "Invalid company ID" },
        { status: 400 },
      );
    }

    const body = await req.json();
    const { month, year, successRate } = body;

    if (
      month === undefined ||
      year === undefined ||
      successRate === undefined
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: month, year, successRate",
        },
        { status: 400 },
      );
    }

    const updatedStats = await prisma.companyMonthlyStats.upsert({
      where: {
        companyId_month_year: {
          companyId: companyId,
          month: parseInt(month),
          year: parseInt(year),
        },
      },
      update: {
        successRate: parseFloat(successRate),
      },
      create: {
        companyId: companyId,
        month: parseInt(month),
        year: parseInt(year),
        successRate: parseFloat(successRate),
      },
    });

    return NextResponse.json({ success: true, data: updatedStats });
  } catch (error) {
    console.error("UPDATE_STATS_ERROR", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const companyId = parseInt(id);
    if (isNaN(companyId)) {
      return NextResponse.json(
        { success: false, error: "Invalid company ID" },
        { status: 400 },
      );
    }

    const body = await req.json();
    const { month, year } = body;

    if (month === undefined || year === undefined) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: month, year" },
        { status: 400 },
      );
    }

    const result = await prisma.companyMonthlyStats.delete({
      where: {
        companyId_month_year: {
          companyId: companyId,
          month: parseInt(month),
          year: parseInt(year),
        },
      },
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("DELETE_STATS_ERROR", error);
    // Prisma throws a specific error code if the record to delete is not found
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code: unknown }).code === "P2025"
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Stat entry not found for the given month and year.",
        },
        { status: 404 },
      );
    }
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 },
    );
  }
}
