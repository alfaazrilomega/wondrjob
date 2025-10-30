"use client";

import React, { useState, useEffect } from "react"; // Tambahkan useEffect
import { Bell, CheckCircle, XCircle, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  approveJobDraft,
  rejectJobDraft,
  markNotificationRead,
} from "@/actions/notifications";

// --- Tipe Notifikasi (Gunakan tipe yang sama seperti di page.tsx) ---
interface NotificationData {
  id: string;
  type: "job_approval" | "info" | "applicant_update";
  text: string;
  timestamp: string; // Atau Date
  read: boolean;
  jobId?: number; // Seharusnya draftId
  hrdName?: string;
  jobTitle?: string;
}
// --- AKHIR TIPE ---

// Terima initialNotifications sebagai prop
export function NotificationDropdown({
  initialNotifications = [],
}: {
  initialNotifications: NotificationData[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  // Gunakan prop untuk inisialisasi state
  const [notifications, setNotifications] =
    useState<NotificationData[]>(initialNotifications);
  const router = useRouter();

  // Efek untuk memperbarui state jika prop berubah (opsional, tergantung cara Anda refresh)
  useEffect(() => {
    setNotifications(initialNotifications);
  }, [initialNotifications]);

  const hasUnread = notifications.some((n) => !n.read);

  const handleAccept = async (notificationId: string, draftId?: number) => {
    if (!draftId) return;
    console.log(
      `Accepted draft ${draftId} from notification ${notificationId}`,
    );
    const result = await approveJobDraft(draftId);
    if (!result?.error) {
      setNotifications((prev) => prev.filter((n) => n.id !== notificationId)); // Update UI
    } else {
      console.error("Failed to accept draft:", result.error);
      // Handle error
    }
  };

  const handleReject = async (notificationId: string, draftId?: number) => {
    if (!draftId) return;
    console.log(
      `Rejected draft ${draftId} from notification ${notificationId}`,
    );
    const result = await rejectJobDraft(draftId);
    if (!result?.error) {
      setNotifications((prev) => prev.filter((n) => n.id !== notificationId)); // Update UI
    } else {
      console.error("Failed to reject draft:", result.error);
      // Handle error
    }
  };

  const handleView = (notificationId: string, draftId?: number) => {
    if (draftId) {
      console.log(`Viewing draft ${draftId}`);
      // TODO: Buka Modal atau navigasi ke halaman preview draft
      router.push(`/dashboard/company-owner/job-preview/${draftId}`);
      markAsRead(notificationId); // Tandai read saat dilihat
      setIsOpen(false);
    }
  };

  const markAsRead = (notificationId: string) => {
    // Update UI optimis
    const alreadyRead = notifications.find(
      (n) => n.id === notificationId,
    )?.read;
    if (!alreadyRead) {
      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n)),
      );
      // PANGGIL SERVER ACTION MARK READ
      markNotificationRead(notificationId).catch((err) =>
        console.error("Failed to mark read:", err),
      );
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-gray-400 hover:text-white hover:bg-gray-700"
        >
          <Bell size={20} />
          {hasUnread && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#1e1e24]"></span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80 md:w-96 bg-[#2a2a30] border-gray-700 text-gray-200 p-0"
        align="end"
      >
        <div className="p-4 border-b border-gray-700">
          <h3 className="font-semibold text-white">Notifications</h3>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <p className="p-4 text-sm text-gray-400 text-center">
              No new notifications.
            </p>
          ) : (
            notifications.map(
              (
                notif, // Gunakan state `notifications`
              ) => (
                <div
                  key={notif.id}
                  className={`p-4 border-b border-gray-700 last:border-b-0 ${
                    !notif.read ? "bg-gray-700/50" : "hover:bg-gray-700/30"
                  }`}
                  onClick={() => markAsRead(notif.id)} // Opsional: tandai read saat klik item
                >
                  <div className="flex items-start gap-3">
                    {!notif.read && (
                      <span className="mt-1 w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                    )}
                    <div className={`flex-grow ${notif.read ? "ml-5" : ""}`}>
                      <p className="text-sm">
                        {notif.type === "job_approval" && notif.hrdName && (
                          <>
                            <span className="font-semibold text-purple-400">
                              {notif.hrdName}
                            </span>{" "}
                            {notif.text}
                          </>
                        )}
                        {notif.type !== "job_approval" && notif.text}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {notif.timestamp}
                      </p>

                      {/* Tombol Aksi */}
                      {notif.type === "job_approval" &&
                        notif.jobId && ( // Gunakan jobId/draftId
                          <div className="flex gap-2 mt-3">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="bg-green-600 hover:bg-green-500 text-white h-8 px-3 text-xs"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAccept(notif.id, notif.jobId);
                              }} // Gunakan jobId/draftId
                            >
                              <CheckCircle size={14} className="mr-1.5" />{" "}
                              Accept
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="bg-red-600 hover:bg-red-500 text-white h-8 px-3 text-xs"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleReject(notif.id, notif.jobId);
                              }} // Gunakan jobId/draftId
                            >
                              <XCircle size={14} className="mr-1.5" /> Reject
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="bg-gray-600 hover:bg-gray-500 text-white h-8 px-3 text-xs"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleView(notif.id, notif.jobId);
                              }} // Gunakan jobId/draftId
                            >
                              <Eye size={14} className="mr-1.5" /> View
                            </Button>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              ),
            )
          )}
        </div>
        <div className="p-2 text-center border-t border-gray-700">
          <Button variant="link" className="text-purple-400 text-sm h-auto p-1">
            View All Notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
