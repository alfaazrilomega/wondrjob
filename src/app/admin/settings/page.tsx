"use client";

import {
  useState,
  useEffect,
  type ReactNode,
  type ButtonHTMLAttributes,
} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserRole } from "@prisma/client";
import Image from "next/image";

// --- Type Definitions ---
interface AdminUser {
  name: string;
  email: string;
  twoFactorEnabled: boolean;
}

interface AppSettings {
  websiteName?: string;
  websiteLogo?: string;
  maintenanceMode?: boolean;
  sendWelcomeEmail?: boolean;
  notifyAdminOnRegistration?: boolean;
}

const PERMISSIONS = [
  "Can Post Jobs",
  "Can View All Applicants",
  "Can Edit Company Profiles",
] as const;

type Permission = (typeof PERMISSIONS)[number];

type PermissionsByRole = {
  [key in UserRole]?: {
    [key in Permission]?: boolean;
  };
};

// --- Mock Components (with improved typing) ---
const Button = ({
  children,
  ...props
}: { children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...props}
    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-purple-500 text-purple-500 hover:bg-purple-500/10 h-10 px-4 py-2"
  >
    {children}
  </button>
);

const PrimaryButton = ({
  children,
  ...props
}: { children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...props}
    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-purple-600 text-white hover:bg-purple-700 h-10 px-4 py-2"
  >
    {children}
  </button>
);

const Switch = ({
  checked,
  onCheckedChange,
  ...props
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick">) => (
  <button
    {...props}
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onCheckedChange(!checked)}
    data-state={checked ? "checked" : "unchecked"}
    className="peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-purple-600 data-[state=unchecked]:bg-gray-700"
  >
    <span
      data-state={checked ? "checked" : "unchecked"}
      className="pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
    />
  </button>
);

const ROLES = [UserRole.HRD, UserRole.COMPANY, UserRole.SOCIETY];

const AdminSettingsPage = () => {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [settings, setSettings] = useState<AppSettings>({});
  const [permissions, setPermissions] = useState<PermissionsByRole>({});
  const [loading, setLoading] = useState(true);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isMaintenanceModalOpen, setIsMaintenanceModalOpen] = useState(false);
  const [nextMaintenanceMode, setNextMaintenanceMode] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [adminRes, settingsRes, permissionsRes] = await Promise.all([
          fetch("/api/auth/me"),
          fetch("/api/settings"),
          fetch("/api/permissions"),
        ]);
        const adminData: AdminUser = await adminRes.json();
        const settingsData: AppSettings = await settingsRes.json();
        const permissionsData: {
          role: UserRole;
          permission: Permission;
          enabled: boolean;
        }[] = await permissionsRes.json();

        setAdmin(adminData);
        setSettings(settingsData);

        const permsObj = permissionsData.reduce((acc: PermissionsByRole, p) => {
          return {
            ...acc,
            [p.role]: {
              ...acc[p.role],
              [p.permission]: p.enabled,
            },
          };
        }, {});
        setPermissions(permsObj);
      } catch (error) {
        console.error("Failed to fetch data", error);
        alert("Failed to load settings.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSettingChange = async (
    key: keyof AppSettings,
    value: AppSettings[keyof AppSettings],
  ) => {
    const originalValue = settings[key];
    setSettings((prev) => ({ ...prev, [key]: value }));

    try {
      const response = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [key]: value }),
      });
      if (!response.ok) throw new Error("Failed to save setting");
      alert(`${key} updated successfully.`);
    } catch (error) {
      console.error(error);
      alert(`Failed to save ${key}.`);
      setSettings((prev) => ({ ...prev, [key]: originalValue }));
    }
  };

  const handle2FAChange = async (enabled: boolean) => {
    if (!admin) return;
    const originalValue = admin.twoFactorEnabled;
    setAdmin((prev) => (prev ? { ...prev, twoFactorEnabled: enabled } : null));

    try {
      const response = await fetch("/api/users/me/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ twoFactorEnabled: enabled }),
      });
      if (!response.ok) throw new Error("Failed to update 2FA status");
      alert("2FA settings updated");
    } catch (error) {
      console.error(error);
      alert("Failed to update 2FA status.");
      setAdmin((prev) =>
        prev ? { ...prev, twoFactorEnabled: originalValue } : null,
      );
    }
  };

  const handlePermissionChange = async (
    role: UserRole,
    permission: Permission,
    enabled: boolean,
  ) => {
    const originalValue = permissions[role]?.[permission];
    setPermissions((prev) => ({
      ...prev,
      [role]: { ...prev[role], [permission]: enabled },
    }));

    try {
      const response = await fetch("/api/permissions", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, permission, enabled }),
      });
      if (!response.ok) throw new Error("Failed to save permission");
    } catch (error) {
      console.error(error);
      alert(`Failed to save permission for ${role}.`);
      setPermissions((prev) => ({
        ...prev,
        [role]: { ...prev[role], [permission]: originalValue },
      }));
    }
  };

  const promptMaintenanceModeChange = (value: boolean) => {
    setNextMaintenanceMode(value);
    setIsMaintenanceModalOpen(true);
  };

  const confirmMaintenanceModeChange = () => {
    handleSettingChange("maintenanceMode", nextMaintenanceMode);
    setIsMaintenanceModalOpen(false);
  };

  const handleLogoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const signedUrlRes = await fetch("/api/settings/generate-upload-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: file.name }),
      });

      if (!signedUrlRes.ok) {
        const errorText = await signedUrlRes.text();
        throw new Error(`Failed to get signed URL: ${errorText}`);
      }

      const { signedUrl, publicUrl } = await signedUrlRes.json();

      const uploadRes = await fetch(signedUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!uploadRes.ok) {
        throw new Error("Upload failed.");
      }

      await handleSettingChange("websiteLogo", publicUrl);
    } catch (error) {
      console.error(error);
      alert("Logo upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-8 text-white p-8">
      <h1 className="text-3xl font-bold text-white">Application Settings</h1>

      {/* My Admin Profile Card */}
      <Card className="bg-black/30 border-purple-500/30 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-white">My Admin Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-gray-400">
                  Name
                </label>
                <Input
                  readOnly
                  value={admin?.name || ""}
                  className="bg-gray-900/80 border-gray-700 text-white"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-gray-400">
                  Email
                </label>
                <Input
                  readOnly
                  value={admin?.email || ""}
                  className="bg-gray-900/80 border-gray-700 text-white"
                />
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-white">
                  Enable Two-Factor Authentication
                </span>
                <Switch
                  checked={admin?.twoFactorEnabled || false}
                  onCheckedChange={handle2FAChange}
                />
              </div>
              <div className="pt-2">
                <Dialog
                  open={isPasswordModalOpen}
                  onOpenChange={setIsPasswordModalOpen}
                >
                  <DialogTrigger asChild>
                    <Button>Change Password</Button>
                  </DialogTrigger>
                  <DialogContent className="bg-black/50 border-purple-500/50 text-white backdrop-blur-xl">
                    <DialogHeader>
                      <DialogTitle>Change Your Password</DialogTitle>
                    </DialogHeader>
                    <ChangePasswordModal
                      closeModal={() => setIsPasswordModalOpen(false)}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* General Application Settings Card */}
      <Card className="bg-black/30 border-purple-500/30 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-white">
            General Application Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-2">
            <label className="text-sm font-medium text-gray-400">
              Website Name
            </label>
            <Input
              value={settings.websiteName || ""}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  websiteName: e.target.value,
                }))
              }
              onBlur={() =>
                handleSettingChange("websiteName", settings.websiteName)
              }
              className="bg-gray-900/80 border-gray-700 text-white"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-gray-400">
              Website Logo
            </label>
            <div className="flex items-center gap-4">
              {settings.websiteLogo ? (
                <Image
                  src={settings.websiteLogo}
                  alt="Website Logo"
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-md object-cover"
                />
              ) : null}
              <Input
                id="website-logo"
                type="file"
                onChange={handleLogoUpload}
                disabled={uploading}
                className="bg-gray-900/80 border-gray-700 text-white file:text-white"
              />
              {uploading && <p>Uploading...</p>}
            </div>
          </div>
          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="text-white">Activate Maintenance Mode</p>
              <p className="text-sm text-gray-400">
                When activated, the public site will be temporarily unavailable.
              </p>
            </div>
            <Switch
              checked={settings.maintenanceMode || false}
              onCheckedChange={promptMaintenanceModeChange}
            />
          </div>
        </CardContent>
      </Card>

      {/* Role & Permission Management Card */}
      <Card className="bg-black/30 border-purple-500/30 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-white">
            Role & Permission Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800">
                <TableHead className="text-white">Role</TableHead>
                {PERMISSIONS.map((p) => (
                  <TableHead key={p} className="text-white">
                    {p}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {ROLES.map((role) => (
                <TableRow key={role} className="border-gray-800">
                  <TableCell className="font-medium text-white">
                    {role}
                  </TableCell>
                  {PERMISSIONS.map((p) => (
                    <TableCell key={p}>
                      <Switch
                        checked={permissions[role]?.[p] || false}
                        onCheckedChange={(value) =>
                          handlePermissionChange(role, p, value)
                        }
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* System Notifications Card */}
      <Card className="bg-black/30 border-purple-500/30 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-white">System Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-white">Send welcome email to new users.</p>
            <Switch
              checked={settings.sendWelcomeEmail || false}
              onCheckedChange={(value) =>
                handleSettingChange("sendWelcomeEmail", value)
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-white">
              Notify admin of new company registrations.
            </p>
            <Switch
              checked={settings.notifyAdminOnRegistration || false}
              onCheckedChange={(value) =>
                handleSettingChange("notifyAdminOnRegistration", value)
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Maintenance Mode Confirmation Modal */}
      <Dialog
        open={isMaintenanceModalOpen}
        onOpenChange={setIsMaintenanceModalOpen}
      >
        <DialogContent className="bg-black/50 border-purple-500/50 text-white backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle>Confirm Maintenance Mode</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>
              Are you sure you want to{" "}
              {nextMaintenanceMode ? "activate" : "deactivate"} maintenance
              mode?
            </p>
          </div>
          <div className="flex justify-end space-x-4">
            <Button onClick={() => setIsMaintenanceModalOpen(false)}>
              Cancel
            </Button>
            <PrimaryButton onClick={confirmMaintenanceModeChange}>
              Confirm
            </PrimaryButton>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const ChangePasswordModal = ({ closeModal }: { closeModal: () => void }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (newPassword !== confirmNewPassword) {
      setError("New passwords do not match.");
      return;
    }
    setIsSaving(true);
    try {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });
      const data = await response.text();
      if (!response.ok) {
        throw new Error(data || "Failed to change password.");
      }
      alert("Password changed successfully!");
      closeModal();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="password"
        placeholder="Current Password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        className="bg-gray-900/80 border-gray-700"
        required
      />
      <Input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="bg-gray-900/80 border-gray-700"
        required
      />
      <Input
        type="password"
        placeholder="Confirm New Password"
        value={confirmNewPassword}
        onChange={(e) => setConfirmNewPassword(e.target.value)}
        className="bg-gray-900/80 border-gray-700"
        required
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="flex justify-end space-x-4 pt-4">
        <Button type="button" onClick={closeModal} disabled={isSaving}>
          Cancel
        </Button>
        <PrimaryButton type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save New Password"}
        </PrimaryButton>
      </div>
    </form>
  );
};

export default AdminSettingsPage;
