import { Client } from "pg";
import * as fs from "fs";

function getEnvVariable(key: string): string | undefined {
  try {
    const envFile = fs.readFileSync(".env.local", "utf8");
    const match = envFile.match(new RegExp(`^${key}=(.*)`, "m"));
    if (match && match[1]) {
      return match[1].replace(/"/g, "").trim();
    }
    return undefined;
  } catch (error) {
    console.error("Error reading .env.local file:", error);
    return undefined;
  }
}

const connectionString = getEnvVariable("DATABASE_URL");

if (!connectionString) {
  throw new Error("DATABASE_URL is missing from .env.local");
}

const tableNames = [
  "User",
  "Admin",
  "HRD",
  "Society",
  "Company",
  "CompanyMonthlyStats",
  "AvailablePosition",
  "Portofolio",
  "PositionApplied",
  "JobEmbedding",
  "PortfolioEmbedding",
  "Skill",
  "Setting",
  "RolePermission",
];

async function backupDatabase() {
  const backupData: { [key: string]: any[] } = {};
  const client = new Client({ connectionString });

  try {
    await client.connect();
    console.log("Connected to the database");

    for (const tableName of tableNames) {
      console.log(`Backing up ${tableName}...`);
      try {
        const result = await client.query(`SELECT * FROM "${tableName}"`);
        backupData[tableName] = result.rows;
      } catch (error) {
        console.error(`Error backing up ${tableName}:`, error);
      }
    }

    fs.writeFileSync("backup.json", JSON.stringify(backupData, null, 2));
    console.log("Backup complete! Data saved to backup.json");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  } finally {
    await client.end();
    console.log("Disconnected from the database");
  }
}

backupDatabase();
