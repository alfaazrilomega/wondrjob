import { NextResponse } from "next/server";
import { prisma } from "@/lib/lib/db";

export async function PUT(
  request: Request,
  { params }: { params: { applicationId: string } },
) {
  const { applicationId } = params;
  const { status } = await request.json();

  if (!status || !["ACCEPTED", "REJECTED"].includes(status)) {
    return NextResponse.json(
      { success: false, error: "Invalid status" },
      { status: 400 },
    );
  }

  try {
    const updatedApplication = await prisma.positionApplied.update({
      where: { id: parseInt(applicationId) },
      data: { status },
    });
    return NextResponse.json({ success: true, data: updatedApplication });
  } catch (error) {
    console.error(`UPDATE_APPLICATION_ERROR (ID: ${applicationId})`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
