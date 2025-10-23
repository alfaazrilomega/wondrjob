import "dotenv/config";
import { PrismaClient } from "@prisma/client";

declare global {
  // allow global `var` declarations
  var prisma: PrismaClient | undefined;
}

const getDbUrlWithTimeout = (): string => {
  const url = process.env.DATABASE_URL;
  if (!url) {
    // In a real app, you'd want to throw an error or handle this case appropriately.
    // For this example, we'll log a warning and proceed without the timeout.
    console.warn(
      "DATABASE_URL is not set. Cannot apply connection pool timeout.",
    );
    return ""; // Prisma will use the URL from schema.prisma if this is empty or undefined.
  }
  if (url.includes("pool_timeout")) {
    return url;
  }
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}pool_timeout=60`;
};

const dbUrl = getDbUrlWithTimeout();

export const prisma =
  globalThis.prisma ||
  new PrismaClient({
    log: [
      { emit: "event", level: "query" },
      { emit: "stdout", level: "warn" },
      { emit: "stdout", level: "error" },
    ],
    ...(dbUrl && {
      datasources: {
        db: {
          url: dbUrl,
        },
      },
    }),
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

// Listen for query events and surface slow queries in dev. This helps
// identify which queries may hold connections for long durations.
if (process.env.NODE_ENV !== "production") {
  // Use a loose event listener typing to avoid strict generated client typings
  // in some environments where the Prisma client's $on overloads are narrow.
  // Use a typed assertion for the $on listener to avoid strict generated
  // client overloads while keeping the listener properly typed locally.
  type PrismaQueryEvent = {
    query: string;
    duration?: number;
    [key: string]: unknown;
  };
  const prismaWithOn = prisma as unknown as {
    $on: (event: "query", listener: (e: PrismaQueryEvent) => void) => void;
  };

  prismaWithOn.$on("query", (e) => {
    // e.duration is available in ms — warn if greater than 2s
    if (typeof e.duration === "number" && e.duration > 2000) {
      console.warn(`Slow query (${e.duration}ms): ${e.query}`);
    }
  });
}

export interface DatabaseHealthResult {
  status: "healthy" | "unhealthy";
  error?: string;
  timestamp: string;
}

export async function testDatabaseConnection(): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    // Use a lightweight query to validate connection. Avoid explicit
    // $connect/$disconnect as Prisma manages pooling; calling connect/disconnect
    // repeatedly can increase pressure on the pool in some environments.
    await prisma.$queryRaw`SELECT 1`;
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Database connection test failed:", message);
    return { success: false, error: message };
  }
}

export async function getDatabaseHealth(): Promise<DatabaseHealthResult> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return {
      status: "healthy",
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return {
      status: "unhealthy",
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    };
  }
}

// Export the Prisma client for use in other files
export default prisma;
