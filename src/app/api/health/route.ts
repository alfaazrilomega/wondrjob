import { NextResponse } from "next/server";
import {
  getDatabaseHealth,
  testDatabaseConnection,
  type DatabaseHealthResult,
} from "../../../../lib/db";

interface HealthCheckResponse {
  status: "healthy" | "unhealthy" | "error";
  database: DatabaseHealthResult;
  environment: string;
  timestamp: string;
  uptime?: string;
}

export async function GET(): Promise<NextResponse<HealthCheckResponse>> {
  try {
    // Test connection first
    const connectionResult = await testDatabaseConnection(1);

    if (!connectionResult.success) {
      return NextResponse.json(
        {
          status: "unhealthy",
          database: {
            status: "unhealthy",
            error: connectionResult.error,
            timestamp: new Date().toISOString(),
          },
          environment: process.env.NODE_ENV || "unknown",
          timestamp: new Date().toISOString(),
        },
        { status: 503 },
      );
    }

    // Get detailed health information
    const healthInfo = await getDatabaseHealth();

    const response: HealthCheckResponse = {
      status: healthInfo.status,
      database: healthInfo,
      environment: process.env.NODE_ENV || "unknown",
      timestamp: new Date().toISOString(),
      uptime: process.uptime ? `${Math.floor(process.uptime())}s` : undefined,
    };

    return NextResponse.json(response, {
      status: healthInfo.status === "healthy" ? 200 : 503,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "X-Health-Check": "true",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        database: {
          status: "unhealthy",
          error: error instanceof Error ? error.message : "Unknown error",
          timestamp: new Date().toISOString(),
        },
        environment: process.env.NODE_ENV || "unknown",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
