"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useParams } from "next/navigation";
import { useState } from "react";

// This should be a real component from your UI library
const Button = ({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
}) => (
  <button
    {...props}
    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-purple-600 text-white hover:bg-purple-700 h-10 px-4 py-2"
  >
    {children}
  </button>
);

interface SimulatedUser {
  id: string;
  name: string;
  email: string;
  role: string;
  companyName?: string | null;
}

const SimulateUserSelectionClient = ({ users }: { users: SimulatedUser[] }) => {
  const params = useParams();
  const role = params.role as string;
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);

  const handleSimulate = async (
    targetUserId: string,
    targetUserRole: string,
  ) => {
    setLoadingUserId(targetUserId);
    try {
      const response = await fetch("/api/auth/simulate/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ targetUserId }),
      });

      if (!response.ok) {
        throw new Error("Failed to start simulation.");
      }

      // CRUCIAL FIX: Redirect to the correct dashboard based on the role
      let dashboardPath = "/";
      switch (targetUserRole) {
        case "HRD":
          dashboardPath = "/dashboard/hrd";
          break;
        case "COMPANY":
          dashboardPath = "/dashboard/company";
          break;
        case "SOCIETY":
        default:
          dashboardPath = "/homepage"; // Or wherever society users should land
          break;
      }
      window.location.href = dashboardPath;
    } catch (error) {
      console.error("Simulation error:", error);
      alert("Simulation failed. You must be an admin.");
      setLoadingUserId(null);
    }
  };

  return (
    <div className="p-8 text-white">
      <Card className="bg-black/30 border-purple-500/30 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-white uppercase">
            Simulate {role} View
          </CardTitle>
          <p className="text-gray-400 pt-2">
            Select a user to begin simulation as.
          </p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800">
                <TableHead className="text-white">User Name</TableHead>
                <TableHead className="text-white">Email</TableHead>
                <TableHead className="text-white">Associated Company</TableHead>
                <TableHead className="text-white">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="border-gray-800">
                  <TableCell className="font-medium text-white">
                    {user.name}
                  </TableCell>
                  <TableCell className="text-gray-300">{user.email}</TableCell>
                  <TableCell className="text-gray-300">
                    {user.companyName || "N/A"}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleSimulate(user.id, user.role)}
                      disabled={loadingUserId !== null}
                    >
                      {loadingUserId === user.id
                        ? "Starting..."
                        : "Simulate as this User"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimulateUserSelectionClient;
