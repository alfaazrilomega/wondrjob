import { UserRole } from "@prisma/client";

export interface SimulatePageParams {
  role: string;
}

export interface SimulateUserSelectionPageProps {
  params: SimulatePageParams;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  companyName?: string | null;
}
