import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query", "error", "warn"],
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

// Helper function to disconnect from database
export async function disconnectDB() {
  await prisma.$disconnect();
}

// Helper function to connect to database
export async function connectDB() {
  await prisma.$connect();
}

export interface DatabaseHealthResult {
  status: "healthy" | "unhealthy";
  error?: string;
  timestamp: string;
}

export async function testDatabaseConnection(
  retries = 3,
  delay = 1000,
): Promise<{ success: boolean; error?: string }> {
  for (let i = 0; i < retries; i++) {
    try {
      await prisma.$connect();
      await prisma.$disconnect();
      return { success: true };
    } catch (error) {
      if (i === retries - 1) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        console.error(
          `Database connection failed after ${retries} retries:`,
          errorMessage,
        );
        return { success: false, error: errorMessage };
      }
      await new Promise((res) => setTimeout(res, delay));
    }
  }
  return { success: false, error: "Unknown error after retries" };
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
