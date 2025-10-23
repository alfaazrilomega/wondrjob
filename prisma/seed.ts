// prisma/seed.ts
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
console.log('DATABASE_URL:', process.env.DATABASE_URL ? process.env.DATABASE_URL.substring(0, 30) + "..." : "Not defined");

// 1. Import PrismaClient untuk berinteraksi dengan database
import { PrismaClient } from "@prisma/client";

// Buat instance dari PrismaClient
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DIRECT_URL,
    },
  },
});

// 2. Salin dan tempel data skillsData yang sudah saya berikan sebelumnya di sini
const skillsData = [
  {
    name: "JavaScript",
    category: "Language",
    aliases: ["js", "frontend", "backend"],
  },
  {
    name: "TypeScript",
    category: "Language",
    aliases: ["ts", "javascript", "frontend", "backend"],
  },
  {
    name: "Python",
    category: "Language",
    aliases: ["py", "backend", "data science", "ai"],
  },
  {
    name: "Java",
    category: "Language",
    aliases: ["backend", "android", "enterprise"],
  },
  {
    name: "C#",
    category: "Language",
    aliases: ["csharp", "dotnet", ".net", "backend", "game dev"],
  },
  {
    name: "Go",
    category: "Language",
    aliases: ["golang", "backend", "system"],
  },
  {
    name: "Rust",
    category: "Language",
    aliases: ["backend", "system", "performance"],
  },
  { name: "PHP", category: "Language", aliases: ["backend", "web"] },
  { name: "SQL", category: "Language", aliases: ["database", "query", "data"] },
  {
    name: "HTML",
    category: "Language",
    aliases: ["frontend", "web", "markup"],
  },
  {
    name: "CSS",
    category: "Language",
    aliases: ["frontend", "web", "styling", "design"],
  },

  // --- Frontend Development ---
  {
    name: "React",
    category: "Frontend",
    aliases: ["reactjs", "frontend", "javascript", "ui"],
  },
  {
    name: "Next.js",
    category: "Frontend",
    aliases: ["nextjs", "react", "frontend", "ssr"],
  },
  {
    name: "Angular",
    category: "Frontend",
    aliases: ["angularjs", "frontend", "javascript"],
  },
  {
    name: "Vue.js",
    category: "Frontend",
    aliases: ["vue", "frontend", "javascript"],
  },
  { name: "Svelte", category: "Frontend", aliases: ["frontend", "javascript"] },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    aliases: ["css", "utility-first", "styling"],
  },
  {
    name: "Figma",
    category: "Frontend",
    aliases: ["design", "ui", "ux", "prototyping"],
  },
  {
    name: "UI/UX Design",
    category: "Frontend",
    aliases: ["ui", "ux", "design", "user experience"],
  },

  // --- Backend Development ---
  {
    name: "Node.js",
    category: "Backend",
    aliases: ["nodejs", "backend", "javascript"],
  },
  {
    name: "Express.js",
    category: "Backend",
    aliases: ["express", "nodejs", "backend"],
  },
  { name: "Django", category: "Backend", aliases: ["python", "backend"] },
  { name: "Flask", category: "Backend", aliases: ["python", "backend"] },
  {
    name: "Spring Boot",
    category: "Backend",
    aliases: ["java", "backend", "enterprise"],
  },
  {
    name: ".NET Core",
    category: "Backend",
    aliases: ["dotnet", "csharp", "backend"],
  },
  {
    name: "REST APIs",
    category: "Backend",
    aliases: ["api", "restful", "backend"],
  },
  {
    name: "GraphQL",
    category: "Backend",
    aliases: ["api", "query language", "backend"],
  },

  // --- Databases ---
  {
    name: "PostgreSQL",
    category: "Database",
    aliases: ["postgres", "sql", "database"],
  },
  { name: "MySQL", category: "Database", aliases: ["sql", "database"] },
  {
    name: "MongoDB",
    category: "Database",
    aliases: ["nosql", "database", "document"],
  },
  {
    name: "Redis",
    category: "Database",
    aliases: ["cache", "in-memory", "database"],
  },
  {
    name: "Prisma",
    category: "Database",
    aliases: ["orm", "database", "typescript"],
  },

  // --- DevOps & Cloud ---
  {
    name: "Docker",
    category: "DevOps",
    aliases: ["container", "devops", "deployment"],
  },
  {
    name: "Kubernetes",
    category: "DevOps",
    aliases: ["k8s", "orchestration", "devops"],
  },
  {
    name: "CI/CD",
    category: "DevOps",
    aliases: ["continuous integration", "continuous delivery", "devops"],
  },
  {
    name: "AWS",
    category: "Cloud",
    aliases: ["amazon web services", "cloud", "devops"],
  },
  {
    name: "Google Cloud (GCP)",
    category: "Cloud",
    aliases: ["gcp", "cloud", "devops"],
  },
  {
    name: "Microsoft Azure",
    category: "Cloud",
    aliases: ["azure", "cloud", "devops"],
  },
  {
    name: "Terraform",
    category: "DevOps",
    aliases: ["iac", "infrastructure as code", "devops"],
  },
  {
    name: "Git",
    category: "DevOps",
    aliases: ["version control", "source control"],
  },

  // --- Mobile Development ---
  {
    name: "React Native",
    category: "Mobile",
    aliases: ["mobile", "react", "javascript"],
  },
  {
    name: "Flutter",
    category: "Mobile",
    aliases: ["mobile", "dart", "google"],
  },
  { name: "Swift", category: "Mobile", aliases: ["ios", "apple", "mobile"] },
  {
    name: "Kotlin",
    category: "Mobile",
    aliases: ["android", "google", "mobile"],
  },

  // --- AI & Machine Learning ---
  {
    name: "Machine Learning",
    category: "AI/ML",
    aliases: ["ml", "ai", "data science"],
  },
  {
    name: "TensorFlow",
    category: "AI/ML",
    aliases: ["deep learning", "ai", "google"],
  },
  {
    name: "PyTorch",
    category: "AI/ML",
    aliases: ["deep learning", "ai", "facebook"],
  },
  {
    name: "Data Analysis",
    category: "AI/ML",
    aliases: ["data", "analytics", "pandas", "numpy"],
  },

  // --- IT & Cybersecurity ---
  {
    name: "IT Support",
    category: "IT",
    aliases: ["it", "helpdesk", "technical support"],
  },
  {
    name: "Network Administration",
    category: "IT",
    aliases: ["networking", "cisco", "sysadmin"],
  },
  {
    name: "Cybersecurity",
    category: "Security",
    aliases: ["security", "infosec", "hacking"],
  },
  {
    name: "Penetration Testing",
    category: "Security",
    aliases: ["pentesting", "ethical hacking", "security"],
  },

  // --- Project Management & Methodologies ---
  {
    name: "Agile",
    category: "Methodology",
    aliases: ["scrum", "kanban", "project management"],
  },
  {
    name: "Scrum",
    category: "Methodology",
    aliases: ["agile", "project management"],
  },
  {
    name: "JIRA",
    category: "Methodology",
    aliases: ["project management", "ticketing", "atlassian"],
  },
];

// 3. Fungsi utama untuk menjalankan proses seeding
async function main() {
  console.log(`Start seeding...`);

  // Gunakan createMany untuk memasukkan semua data sekaligus.
  // 'skipDuplicates: true' akan mencegah eror jika Anda menjalankan script ini lagi.
  await prisma.skill.createMany({
    data: skillsData,
    skipDuplicates: true,
  });

  console.log(`Seeding finished.`);

  // --- follow seed ---
  // NOTE: Replace the IDs below with real user IDs/company IDs from your DB when running seed in production
  const followData = [
    // user-1 follows user-2
    { followerId: "user-1", followedUserId: "user-2" },
    // user-1 follows company with id 3
    { followerId: "user-1", followedCompanyId: 3 },
  ];

  try {
    await prisma.follow.createMany({ data: followData, skipDuplicates: true });
    console.log("Follow seed applied (skipDuplicates: true)");
  } catch (e: unknown) {
    const error = e instanceof Error ? e.message : String(e);
    console.warn(
      "Could not insert follow seed, please check user/company IDs exist:",
      error,
    );
  }
}

// 4. Jalankan fungsi utama dan tangani eror jika ada
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // Selalu tutup koneksi database setelah selesai
    await prisma.$disconnect();
  });
