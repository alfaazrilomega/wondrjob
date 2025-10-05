import { NextResponse } from "next/server";
import {
  getOverallApplicationStats,
  getCompanyApplicationStats,
} from "../application-stats";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const companyId = searchParams.get("companyId");

  if (companyId) {
    const stats = await getCompanyApplicationStats();
    if (companyId === "all") {
      return NextResponse.json(stats);
    }
    const companyStat = stats.find(
      (stat: { companyName: string }) => stat.companyName === companyId,
    );
    return NextResponse.json(companyStat);
  } else {
    const stats = await getOverallApplicationStats();
    return NextResponse.json(stats);
  }
}
