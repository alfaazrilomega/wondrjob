"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Bell,
  CheckCircle,
  XCircle,
  Eye,
  Info,
  Users,
  FileCheck,
  Filter,
  ArrowDownUp,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  getMyNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  approveJobDraft,
  rejectJobDraft,
  type NotificationData,
} from "@/actions/notifications";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getMyNotifications();
        setNotifications(data);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const displayedNotifications = useMemo(() => {
    let filtered = notifications;
    if (filter === "unread") {
      filtered = notifications.filter((n) => !n.read);
    } else if (filter === "read") {
      filtered = notifications.filter((n) => n.read);
    }

    filtered.sort((a, b) => {
      if (sortBy === "newest") {
        return b.timestamp.localeCompare(a.timestamp);
      } else {
        return a.timestamp.localeCompare(b.timestamp);
      }
    });

    return filtered;
  }, [notifications, filter, sortBy]);

  const handleAccept = async (notificationId: string, jobId?: number) => {
    if (!jobId) return;

    try {
      const result = await approveJobDraft(jobId);
      if (result.success) {
        setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
      } else {
        console.error("Failed to approve job draft:", result.error);
        // TODO: Show error toast
      }
    } catch (error) {
      console.error("Error approving job draft:", error);
      // TODO: Show error toast
    }
  };

  const handleReject = async (notificationId: string, jobId?: number) => {
    if (!jobId) return;

    try {
      const result = await rejectJobDraft(jobId);
      if (result.success) {
        setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
      } else {
        console.error("Failed to reject job draft:", result.error);
        // TODO: Show error toast
      }
    } catch (error) {
      console.error("Error rejecting job draft:", error);
      // TODO: Show error toast
    }
  };

  const handleView = async (notificationId: string) => {
    try {
      await markNotificationRead(notificationId);
      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n)),
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleNotificationClick = async (notification: NotificationData) => {
    if (!notification.read) {
      try {
        await markNotificationRead(notification.id);
        setNotifications((prev) =>
          prev.map((n) =>
            n.id === notification.id ? { ...n, read: true } : n,
          ),
        );
      } catch (error) {
        console.error("Error marking notification as read:", error);
      }
    }
    if (notification.type === "applicant_update" && notification.jobId) {
      router.push(`/dashboard/company/jobs/${notification.jobId}/applicants`);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllNotificationsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  const getNotificationIcon = (type: NotificationData["type"]) => {
    switch (type) {
      case "job_approval":
        return <FileCheck size={20} className="text-purple-400" />;
      case "applicant_update":
        return <Users size={20} className="text-blue-400" />;
      case "info":
        return <Info size={20} className="text-teal-400" />;
      default:
        return <Bell size={20} className="text-gray-400" />;
    }
  };

  return (
    <div className="p-8 md:p-12 text-gray-200">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-white">All Notifications</h1>
        <div className="flex gap-2 flex-wrap">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="border-purple-600 text-purple-400 hover:bg-purple-600/10 hover:text-purple-300"
              >
                <Filter size={16} className="mr-2" /> Filter:{" "}
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#2a2a30] border-gray-700 text-gray-200">
              <DropdownMenuItem
                className="hover:bg-gray-700 focus:bg-gray-700"
                onClick={() => setFilter("all")}
              >
                All
              </DropdownMenuItem>
              <DropdownMenuItem
                className="hover:bg-gray-700 focus:bg-gray-700"
                onClick={() => setFilter("unread")}
              >
                Unread
              </DropdownMenuItem>
              <DropdownMenuItem
                className="hover:bg-gray-700 focus:bg-gray-700"
                onClick={() => setFilter("read")}
              >
                Read
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-400 hover:bg-gray-700/50 hover:text-gray-300"
              >
                <ArrowDownUp size={16} className="mr-2" /> Sort:{" "}
                {sortBy === "newest" ? "Newest First" : "Oldest First"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#2a2a30] border-gray-700 text-gray-200">
              <DropdownMenuItem
                className="hover:bg-gray-700 focus:bg-gray-700"
                onClick={() => setSortBy("newest")}
              >
                Newest First
              </DropdownMenuItem>
              <DropdownMenuItem
                className="hover:bg-gray-700 focus:bg-gray-700"
                onClick={() => setSortBy("oldest")}
              >
                Oldest First
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="outline"
            size="sm"
            onClick={handleMarkAllRead}
            className="border-gray-600 text-gray-400 hover:bg-gray-700/50 hover:text-gray-300"
          >
            Mark All as Read
          </Button>
        </div>
      </div>

      <div className="bg-[#1e1e24] rounded-lg shadow-lg overflow-hidden">
        {loading ? (
          <div className="p-16 text-center text-gray-500">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
            <p className="mt-4">Loading notifications...</p>
          </div>
        ) : displayedNotifications.length === 0 ? (
          <div className="p-16 text-center text-gray-500">
            <Bell size={48} className="mx-auto mb-4" />
            <p>
              You have no notifications{" "}
              {filter !== "all" ? `matching the filter "${filter}"` : "yet"}.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-700">
            {displayedNotifications.map((notif) => (
              <li
                key={notif.id}
                className={`p-4 md:p-6 transition-colors cursor-pointer ${
                  !notif.read
                    ? "bg-gray-700/30 hover:bg-gray-700/50"
                    : "hover:bg-gray-800/50"
                }`}
                onClick={() => handleNotificationClick(notif)}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 flex items-center pt-1">
                    {!notif.read && (
                      <span className="w-2 h-2 mr-3 bg-blue-500 rounded-full"></span>
                    )}
                    {getNotificationIcon(notif.type)}
                  </div>

                  <div className="flex-grow">
                    <p
                      className={`text-sm mb-1 ${!notif.read ? "text-white" : "text-gray-300"}`}
                    >
                      {notif.type === "job_approval" && notif.hrdName && (
                        <>
                          <span className="font-semibold text-purple-400">
                            {notif.hrdName}
                          </span>{" "}
                          {notif.text}{" "}
                          {notif.jobTitle && (
                            <span className="font-semibold text-white">{`"${notif.jobTitle}"`}</span>
                          )}
                        </>
                      )}
                      {notif.type !== "job_approval" && notif.text}
                    </p>
                    <p className="text-xs text-gray-500">{notif.timestamp}</p>
                  </div>

                  {notif.type === "job_approval" &&
                    notif.jobId &&
                    !notif.read && (
                      <div className="flex-shrink-0 flex flex-col sm:flex-row gap-2 self-center sm:self-auto mt-3 sm:mt-0">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="bg-green-600 hover:bg-green-500 text-white h-8 px-3 text-xs w-full sm:w-auto"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAccept(notif.id, notif.jobId);
                          }}
                        >
                          <CheckCircle size={14} className="mr-1.5" /> Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="bg-red-600 hover:bg-red-500 text-white h-8 px-3 text-xs w-full sm:w-auto"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReject(notif.id, notif.jobId);
                          }}
                        >
                          <XCircle size={14} className="mr-1.5" /> Reject
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="bg-gray-600 hover:bg-gray-500 text-white h-8 px-3 text-xs w-full sm:w-auto"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleView(notif.id);
                          }}
                        >
                          <Eye size={14} className="mr-1.5" /> View
                        </Button>
                      </div>
                    )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
