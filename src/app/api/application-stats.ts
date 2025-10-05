import { prisma } from "@/lib/lib/db";

// Overall Success Rate
export async function getOverallApplicationStats(): Promise<{
  totalApplications: number;
  successfulApplications: number;
  successRate: number;
}> {
  const totalApplications = await prisma.positionApplied.count();
  const successfulApplications = await prisma.positionApplied.count({
    where: { status: "ACCEPTED" },
  });

  const successRate =
    totalApplications > 0
      ? (successfulApplications / totalApplications) * 100
      : 0;

  return {
    totalApplications,
    successfulApplications,
    successRate,
  };
}

// Success Rate Per Company
export async function getCompanyApplicationStats(): Promise<
  {
    companyName: string;
    totalApplications: number;
    successfulApplications: number;
    successRate: number;
  }[]
> {
  const result: {
    name: string;
    totalapplications: bigint;
    successfulapplications: bigint;
  }[] = await prisma.$queryRaw`
    SELECT
        c.name,
        COUNT(pa.id) AS totalapplications,
        COUNT(CASE WHEN pa.status = 'ACCEPTED' THEN 1 END) AS successfulapplications
    FROM
        "Company" c
    LEFT JOIN
        "AvailablePosition" ap ON c.id = ap.company_id
    LEFT JOIN
        "PositionApplied" pa ON ap.id = pa.available_position_id
    GROUP BY
        c.name;
  `;

  const companyStats = result.map((r) => {
    const totalApplications = Number(r.totalapplications);
    const successfulApplications = Number(r.successfulapplications);
    return {
      companyName: r.name,
      totalApplications,
      successfulApplications,
      successRate:
        totalApplications > 0
          ? (successfulApplications / totalApplications) * 100
          : 0,
    };
  });

  return companyStats;
}
