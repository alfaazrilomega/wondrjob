// prisma/restore.ts
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import {
  PrismaClient,
  UserRole,
  JobType,
  WorkStyle,
  ApplicationStatus,
} from "@prisma/client";
import * as fs from "fs";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DIRECT_URL,
    },
  },
});

const backupData = JSON.parse(fs.readFileSync("backup.json", "utf-8"));

async function main() {
  console.log("Restoring database from backup.json...");

  // Seed User
  for (const user of backupData.User) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {
        ...user,
        role: user.role as UserRole,
        date_of_birth: new Date(user.date_of_birth),
        createdAt: new Date(user.createdAt),
      },
      create: {
        ...user,
        role: user.role as UserRole,
        date_of_birth: new Date(user.date_of_birth),
        createdAt: new Date(user.createdAt),
      },
    });
  }

  // Seed Company
  for (const company of backupData.Company) {
    const { id, user_id, ...companyData } = company;
    await prisma.company.upsert({
      where: { id: id },
      update: companyData,
      create: {
        ...companyData,
        user: {
          connect: { id: user_id },
        },
      },
    });
  }

  // Seed HRD
  if (backupData.HRD) {
    for (const hrd of backupData.HRD) {
      const { id, user_id, company_id, ...hrdData } = hrd;
      await prisma.hRD.upsert({
        where: { id: id },
        update: hrdData,
        create: {
          ...hrdData,
          user: {
            connect: { id: user_id },
          },
          company: {
            connect: { id: company_id },
          },
        },
      });
    }
  }

  // Seed Society
  for (const society of backupData.Society) {
    const { id, user_id, ...societyData } = society;
    await prisma.society.upsert({
      where: { id: id },
      update: {
        ...societyData,
        date_of_birth: new Date(society.date_of_birth),
        available_dates: society.available_dates
          ? society.available_dates.map((d: string) => new Date(d))
          : [],
      },
      create: {
        ...societyData,
        date_of_birth: new Date(society.date_of_birth),
        available_dates: society.available_dates
          ? society.available_dates.map((d: string) => new Date(d))
          : [],
        user: {
          connect: { id: user_id },
        },
      },
    });
  }

  // Seed CompanyMonthlyStats
  if (backupData.CompanyMonthlyStats) {
    for (const stats of backupData.CompanyMonthlyStats) {
      const { id, ...statsData } = stats;
      await prisma.companyMonthlyStats.upsert({
        where: { id: id },
        update: statsData,
        create: statsData,
      });
    }
  }

  // Seed AvailablePosition
  for (const position of backupData.AvailablePosition) {
    const { id, ...positionData } = position;
    await prisma.availablePosition.upsert({
      where: { id: id },
      update: {
        ...positionData,
        jobType: position.jobType as JobType,
        workStyle: position.workStyle as WorkStyle,
        submission_start_date: new Date(position.submission_start_date),
        submission_end_date: new Date(position.submission_end_date),
      },
      create: {
        ...positionData,
        jobType: position.jobType as JobType,
        workStyle: position.workStyle as WorkStyle,
        submission_start_date: new Date(position.submission_start_date),
        submission_end_date: new Date(position.submission_end_date),
      },
    });
  }

  // Seed Portofolio
  if (backupData.Portofolio) {
    for (const portfolio of backupData.Portofolio) {
      const { id, ...portfolioData } = portfolio;
      await prisma.portofolio.upsert({
        where: { id: id },
        update: portfolioData,
        create: portfolioData,
      });
    }
  }

  // Seed PositionApplied
  if (backupData.PositionApplied) {
    for (const application of backupData.PositionApplied) {
      const { id, ...applicationData } = application;
      await prisma.positionApplied.upsert({
        where: { id: id },
        update: {
          ...applicationData,
          status: application.status as ApplicationStatus,
          apply_date: new Date(application.apply_date),
          earliestStartDate: new Date(application.earliestStartDate),
        },
        create: {
          ...applicationData,
          status: application.status as ApplicationStatus,
          apply_date: new Date(application.apply_date),
          earliestStartDate: new Date(application.earliestStartDate),
        },
      });
    }
  }

  // Seed Skill
  for (const skill of backupData.Skill) {
    const { id, ...skillData } = skill;
    await prisma.skill.upsert({
      where: { id: id },
      update: skillData,
      create: skillData,
    });
  }

  // Seed Setting
  if (backupData.Setting) {
    for (const setting of backupData.Setting) {
      await prisma.setting.upsert({
        where: { key: setting.key },
        update: setting,
        create: setting,
      });
    }
  }

  // Seed RolePermission
  if (backupData.RolePermission) {
    for (const permission of backupData.RolePermission) {
      const { id, ...permissionData } = permission;
      await prisma.rolePermission.upsert({
        where: { id: id },
        update: permissionData,
        create: permissionData,
      });
    }
  }

  console.log("Restoration completed.");
}

main()
  .catch((e) => {
    console.error("Error during restoration:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });