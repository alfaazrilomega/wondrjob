import { prisma } from "@/lib/lib/db";
import { UserRole } from "@prisma/client";
import SimulateUserSelectionClient from "./SimulationClient";

const roleMap: { [key: string]: UserRole } = {
  hrd: UserRole.HRD,
  company: UserRole.COMPANY,
  society: UserRole.SOCIETY,
};

async function getUsers(role: string) {
  const userRole = roleMap[role.toLowerCase()];
  if (!userRole) {
    return [];
  }

  const users = await prisma.user.findMany({
    where: {
      role: userRole,
    },
    include: {
      company: true, // For COMPANY role
      hrd: {
        // For HRD role
        include: {
          company: true,
        },
      },
    },
  });

  // Normalize the data to include companyName and role
  return users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role, // Include the role for redirection
    companyName: user.company?.name || user.hrd?.company?.name,
  }));
}

// Define a more explicit interface for the page props
interface SimulateUserSelectionPageProps {
  params: {
    role: string;
  };
}

export default async function SimulateUserSelectionPage(
  props: SimulateUserSelectionPageProps,
) {
  const { role } = props.params;
  const users = await getUsers(role);

  return <SimulateUserSelectionClient users={users} />;
}