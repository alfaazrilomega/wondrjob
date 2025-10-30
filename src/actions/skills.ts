/* eslint-disable prettier/prettier */
"use server";

import { prisma } from "@/lib/lib/db";

export async function getSkills() {
  try {
    const skills = await prisma.skill.findMany({
      select: {
        id: true,
        name: true,
        category: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return skills;
  } catch (error) {
    console.error("Error fetching skills:", error);
    throw new Error("Failed to fetch skills");
  }
}

export async function createSkill(name: string, category: string = "Custom") {
  try {
    const skill = await prisma.skill.create({
      data: {
        name,
        category,
      },
      select: {
        id: true,
        name: true,
        category: true,
      },
    });

    return skill;
  } catch (error) {
    console.error("Error creating skill:", error);
    throw new Error("Failed to create skill");
  }
}
