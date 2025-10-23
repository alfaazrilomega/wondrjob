import { NextResponse } from "next/server";
import { prisma } from "@/lib/lib/db";
import { UserRole } from "@prisma/client";

export const dynamic = "force-dynamic";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: userId } = await params;
  if (!userId) {
    return NextResponse.json(
      { error: "User ID is required." },
      { status: 400 },
    );
  }

  try {
    await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { id: userId },
        include: {
          society: true,
          company: { include: { jobs: true, hrds: true } },
          hrd: true,
          Admin: true,
        },
      });

      if (!user) {
        throw new Error("User not found.");
      }

      // Delete role-specific data first
      switch (user.role) {
        case UserRole.ADMIN:
          if (user.Admin) {
            await tx.admin.delete({ where: { user_id: userId } });
          }
          break;

        case UserRole.SOCIETY:
          if (user.society) {
            // Delete related applications and portfolios first
            await tx.positionApplied.deleteMany({
              where: { society_id: user.society.id },
            });
            const portfolios = await tx.portofolio.findMany({
              where: { society_id: user.society.id },
            });
            for (const portfolio of portfolios) {
              await tx.portfolioEmbedding.deleteMany({
                where: { portfolioId: portfolio.id },
              });
            }
            await tx.portofolio.deleteMany({
              where: { society_id: user.society.id },
            });
            await tx.society.delete({ where: { id: user.society.id } });
          }
          break;

        case UserRole.COMPANY:
          if (user.company) {
            // This is complex. Deleting all related entities.
            for (const hrd of user.company.hrds) {
              await tx.hRD.delete({ where: { id: hrd.id } });
            }
            for (const job of user.company.jobs) {
              await tx.positionApplied.deleteMany({
                where: { available_position_id: job.id },
              });
              await tx.jobEmbedding.deleteMany({ where: { jobId: job.id } });
            }
            await tx.availablePosition.deleteMany({
              where: { company_id: user.company.id },
            });
            await tx.companyMonthlyStats.deleteMany({
              where: { companyId: user.company.id },
            });
            await tx.company.delete({ where: { id: user.company.id } });
          }
          break;

        case UserRole.HRD:
          if (user.hrd) {
            await tx.hRD.delete({ where: { user_id: userId } });
          }
          break;
      }

      // Finally, delete the user itself
      await tx.user.delete({ where: { id: userId } });
    });

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(`DELETE_USER_ERROR (ID: ${userId})`, error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
