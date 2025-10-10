import { prisma } from "@/lib/lib/db";
import AdminDashboardClient from "./AdminDashboardClient";

// The page function CAN and SHOULD be async
export default async function AdminDashboardPage() {
  // Perform all your server-side data fetching here
  const totalUsers = await prisma.user.count();
  const totalJobs = await prisma.availablePosition.count();

  // Example for new users in the last 24h
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const newUsers = await prisma.user.count({
    where: {
      createdAt: {
        gte: yesterday,
      },
    },
  });

  const recentActivities = await prisma.user.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      name: true,
      role: true,
      createdAt: true,
    },
  });

  // Render the Client Component and pass the fetched data as props
  return (
    <AdminDashboardClient
      totalUsers={totalUsers}
      newUsers={newUsers}
      totalJobs={totalJobs}
      recentActivities={recentActivities}
    />
  );
}
