"use client";

import React, { useState, useTransition } from "react";
import { updateEmail, updatePassword, deleteAccount } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// --- Reusable Components ---
const GlassCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-2xl shadow-lg p-6 md:p-8 ${className}`}
  >
    {children}
  </div>
);

const Section = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start py-6 border-b border-purple-500/20">
    <div className="md:col-span-1">
      <h3 className="font-bold text-white text-lg">{title}</h3>
      <p className="text-gray-400 text-sm mt-1">{description}</p>
    </div>
    <div className="md:col-span-2">{children}</div>
  </div>
);

// --- Main Page Component ---
export default function SettingsPage() {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleEmailUpdate = async (formData: FormData) => {
    startTransition(async () => {
      const result = await updateEmail(formData);
      if (result.error) setMessage({ type: "error", text: result.error });
      else if (result.success)
        setMessage({ type: "success", text: result.success });
    });
  };

  const handlePasswordUpdate = async (formData: FormData) => {
    startTransition(async () => {
      const result = await updatePassword(formData);
      if (result.error) setMessage({ type: "error", text: result.error });
      else if (result.success)
        setMessage({ type: "success", text: result.success });
    });
  };

  const handleDeleteAccount = async () => {
    startTransition(async () => {
      const result = await deleteAccount();
      if (result.error) {
        setMessage({ type: "error", text: result.error });
        setIsDeleteDialogOpen(false);
      }
    });
  };

  return (
    <GlassCard className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-4">Account Settings</h1>
      <p className="text-gray-400 mb-6">
        Manage your account details and security settings.
      </p>

      {message && (
        <div
          className={`p-4 rounded-md mb-6 text-sm ${message.type === "error" ? "bg-red-900/50 text-red-200" : "bg-green-900/50 text-green-200"}`}
        >
          {message.text}
        </div>
      )}

      <div className="flex flex-col">
        {/* --- Change Email Section --- */}
        <Section
          title="Email Address"
          description="Update the email address associated with your account."
        >
          <form action={handleEmailUpdate} className="space-y-4">
            <div>
              <Label htmlFor="email">New Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="bg-gray-800 border-gray-600 mt-1"
              />
            </div>
            <div className="text-right">
              <Button
                type="submit"
                disabled={isPending}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Update Email
              </Button>
            </div>
          </form>
        </Section>

        {/* --- Change Password Section --- */}
        <Section
          title="Password"
          description="Set a new password for your account."
        >
          <form action={handlePasswordUpdate} className="space-y-4">
            <div>
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="bg-gray-800 border-gray-600 mt-1"
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="bg-gray-800 border-gray-600 mt-1"
              />
            </div>
            <div className="text-right">
              <Button
                type="submit"
                disabled={isPending}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Update Password
              </Button>
            </div>
          </form>
        </Section>

        {/* --- Delete Account Section --- */}
        <Section
          title="Delete Account"
          description="Permanently delete your account and all associated data."
        >
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 flex justify-between items-center">
            <p className="text-red-200 text-sm">
              This action cannot be undone.
            </p>
            <Button
              variant="destructive"
              onClick={() => setIsDeleteDialogOpen(true)}
              className="bg-red-600 hover:bg-red-700 shadow-red-500/30 shadow-lg"
            >
              Delete Account
            </Button>
          </div>
        </Section>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-[#101018] border-purple-500/30 text-white">
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription className="text-gray-400 pt-2">
              This action is permanent and cannot be reversed. This will
              permanently delete your account and remove all your data from our
              servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={handleDeleteAccount}
              disabled={isPending}
              className="bg-red-600 hover:bg-red-700"
            >
              {isPending ? "Deleting..." : "Yes, delete my account"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </GlassCard>
  );
}
