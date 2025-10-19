import { NextResponse } from "next/server";
import { prisma } from "@/lib/lib/db";
import { ApplicationStatus } from "@prisma/client";

export async function PATCH(
  request: Request,
  context: { params: { applicationId: string } }
) {
  try {
    const applicationId = parseInt(context.params.applicationId, 10);
    if (isNaN(applicationId)) {
      return NextResponse.json(
        { success: false, error: "Invalid application ID" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { status } = body as { status: ApplicationStatus };

    if (!status || !Object.values(ApplicationStatus).includes(status)) {
      return NextResponse.json(
        { success: false, error: "Invalid status value" },
        { status: 400 }
      );
    }

    const updatedApplication = await prisma.positionApplied.update({
      where: { id: applicationId },
      data: { status },
    });

    return NextResponse.json({ success: true, data: updatedApplication });
  } catch (error) {
    console.error(`Error updating application status:`, error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}