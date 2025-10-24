/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect, useState } from "react";
import { MapPin, Calendar, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getFullUserProfile } from "@/app/actions/user";
import { logout } from "@/app/actions/auth";
import { useRouter } from "next/navigation";

// Prisma client in this project generates model types that may not be exported
// exactly as named in all environments/TS configs. Use local interfaces that
// match the subset of fields we need in this component to avoid import errors.
interface ISociety {
  id: number;
  name: string;
  headline?: string | null;
  address?: string;
  phone?: string;
  date_of_birth?: string | Date;
  gender?: string | null;
  location?: string | null;
  about?: string | null;
  profile_picture?: string | null;
  social_media_url?: string | null;
  working_papers_url?: string | null;
  occupation?: string | null;
  most_memorable_tip?: string | null;
  available_dates?: (string | Date)[];
}

interface ISkill {
  id: number;
  name: string;
  category: string;
}

interface IUserProfile {
  id: string;
  name?: string | null;
  email: string;
  society?: ISociety | null;
  skills?: ISkill[];
}
// Import CSS Modules
import containerStyles from "./ProfileContainer.module.css";
import styles from "./MentorProfile.module.css";

// Import Background Component
import OptimizedProfileBackground from "./components/OptimizedProfileBackground";
import ProfileCommunityClient from "./ProfileCommunityClient";

const MentorProfile: React.FC = () => {
  const [user, setUser] = useState<IUserProfile | null>(null);
  // Calendar state for editable availability
  const [selectedSet, setSelectedSet] = useState<Set<string>>(new Set());
  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  // fetch user profile once
  useEffect(() => {
    const fetchUser = async () => {
      const userProfile = await getFullUserProfile();
      setUser(userProfile as unknown as IUserProfile);
    };

    fetchUser();
  }, []);

  // initialize selectedSet after society is available
  useEffect(() => {
    if (
      user?.society &&
      Array.isArray((user.society as ISociety).available_dates) &&
      (user.society as ISociety).available_dates!.length > 0
    ) {
      const initial = new Set<string>(
        (user.society as ISociety).available_dates!.map((d) =>
          new Date(d).toISOString().slice(0, 10),
        ),
      );
      setSelectedSet(initial);
    }
  }, [user]);

  // (moved) initialize selectedSet after society is available

  // Keep hooks at the top-level of the component to satisfy Rules of Hooks.
  // We still early-return for loading user, but all hooks are already declared.
  if (!user) {
    return <div>Loading...</div>;
  }

  const { name, email, society, skills } = user;
  const {
    headline,
    location,
    phone,
    profile_picture,
    about,
    occupation,
    social_media_url,
    working_papers_url,
  } = society || {};

  // Calendar helpers
  const todayISO = new Date().toISOString().slice(0, 10);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const calendarTitle = `${monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`;

  function getCalendarDays(firstOfMonth: Date) {
    const year = firstOfMonth.getFullYear();
    const month = firstOfMonth.getMonth();
    const first = new Date(year, month, 1);
    const startDay = first.getDay(); // 0..6
    const days: Date[] = [];

    // Start from the previous month's tail so calendar aligns to week
    const startDate = new Date(year, month, 1 - startDay);
    for (let i = 0; i < 42; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      days.push(d);
    }
    return days;
  }

  const calendarDays = getCalendarDays(currentMonth);

  function toggleDate(iso: string) {
    setSaveMessage(null);
    setSelectedSet((prev) => {
      const next = new Set(prev);
      if (next.has(iso)) next.delete(iso);
      else next.add(iso);
      return next;
    });
  }

  async function saveAvailability() {
    setIsSaving(true);
    setSaveMessage(null);
    try {
      const dates = Array.from(selectedSet);
      const res = await fetch(`/api/user/availability`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dates }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to save");
      }
      setSaveMessage("Availability saved.");
    } catch (err) {
      console.error(err);
      const message = err instanceof Error ? err.message : String(err);
      setSaveMessage(message || "Failed to save availability.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className={containerStyles.profileContainer}>
      {/* Background Effects - Isolated */}
      <OptimizedProfileBackground
        variant="intense"
        enablePerformanceMode={true}
      />

      {/* Profile Body */}
      <div className={containerStyles.profileBody}>
        <div className={containerStyles.contentWrapper}>
          <header className={containerStyles.header}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between h-auto md:h-16 gap-4 md:gap-0">
                <div
                  className={`text-2xl font-bold ${styles.brandText} md:flex-shrink-0`}
                >
                  <Link href="/">WonderJob</Link>
                </div>

                <nav className="flex justify-center space-x-8 md:flex-1 md:justify-center">
                  <a
                    href="#"
                    className={`${styles.navLink} ${styles.active} text-white font-semibold pb-4`}
                  >
                    Overview
                  </a>
                  <a
                    href="/portfolio"
                    className={`${styles.navLink} text-gray-300 hover:text-white pb-4`}
                  >
                    Portfolio's Users
                  </a>
                  <a
                    href="#"
                    className={`${styles.navLink} text-gray-300 hover:text-white pb-4`}
                  >
                    Experiences
                  </a>
                </nav>

                <div className="flex justify-end space-x-4 md:flex-shrink-0">
                  <a
                    href="/profile/edit"
                    className={`${styles.shareButton} text-gray-300 hover:text-white`}
                  >
                    Edit Profile
                  </a>
                  <button
                    onClick={handleLogout}
                    className={`${styles.shareButton} text-gray-300 hover:text-white`}
                  >
                    Log Out
                  </button>
                  <button
                    className={`${styles.shareButton} text-gray-300 hover:text-white`}
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className={containerStyles.mainContent}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Sidebar - Profile Card */}
                <aside className={`lg:col-span-3 ${containerStyles.sidebar}`}>
                  <div className={containerStyles.cardContainer}>
                    <div className="flex justify-center mb-4">
                      <div className="relative w-24 h-24">
                        <Image
                          src={
                            profile_picture ||
                            "https://placehold.co/96x96/1a1a2e/ffffff?text=KV"
                          }
                          alt={name || "User"}
                          width={96}
                          height={96}
                          className={`w-full h-full rounded-full object-cover ${styles.neonBorder}`}
                          unoptimized={true}
                        />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20"></div>
                      </div>
                    </div>

                    <div className="text-center mb-6">
                      <h1
                        className={`text-2xl font-bold mb-1 text-white ${styles.profileName} ${styles.glowText}`}
                      >
                        {name}
                      </h1>
                      <p
                        className={`mb-2 text-purple-200 ${styles.profileRole}`}
                      >
                        {headline || "No headline provided"}
                      </p>
                      {/* Occupation moved to Business Development section below */}
                      <div
                        className={`flex items-center justify-center text-sm text-gray-400 ${styles.profileLocation}`}
                      >
                        <MapPin className="w-4 h-4 mr-1" />
                        {location || "No location provided"}
                      </div>
                    </div>

                    <button
                      className={`w-full ${styles.neonButton} text-white font-semibold py-3 px-6 rounded-lg mb-6`}
                    >
                      <Calendar className="w-4 h-4 mr-2 inline" />
                      Book {name?.split(" ")[0]}
                    </button>

                    <div className="mb-6">
                      <h3
                        className={`text-sm font-semibold mb-3 text-white ${styles.sectionTitle} ${styles.glowBlue}`}
                      >
                        Contact
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span
                            className={`text-gray-400 ${styles.contactLabel}`}
                          >
                            Social Media
                          </span>
                          <a
                            href={social_media_url || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-purple-200 ${styles.contactValue}`}
                          >
                            {social_media_url ? "View Profile" : "Not provided"}
                          </a>
                        </div>
                        <div className="flex justify-between">
                          <span
                            className={`text-gray-400 ${styles.contactLabel}`}
                          >
                            Working Papers
                          </span>
                          <a
                            href={working_papers_url || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-purple-200 ${styles.contactValue}`}
                          >
                            {working_papers_url
                              ? "View Papers"
                              : "Not provided"}
                          </a>
                        </div>
                        <div className="flex justify-between">
                          <span
                            className={`text-gray-400 ${styles.contactLabel}`}
                          >
                            Email
                          </span>
                          <span
                            className={`text-purple-200 ${styles.contactValue}`}
                          >
                            {email}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span
                            className={`text-gray-400 ${styles.contactLabel}`}
                          >
                            Phone
                          </span>
                          <span
                            className={`text-purple-200 ${styles.contactValue}`}
                          >
                            {phone || "No phone provided"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p
                        className={`text-sm text-purple-100 ${styles.cardText}`}
                      >
                        {occupation || "No occupation provided."}
                      </p>
                    </div>
                  </div>
                </aside>

                {/* Main Content */}
                <main className="lg:col-span-6">
                  <div className="space-y-6">
                    <div className={containerStyles.cardContainer}>
                      <h2
                        className={`text-xl font-semibold mb-4 text-white ${styles.cardTitle} ${styles.glowText}`}
                      >
                        How I'd Describe Myself
                      </h2>
                      <p
                        className={`leading-relaxed text-purple-100 ${styles.cardText}`}
                      >
                        {about || "No description provided."}
                      </p>
                    </div>

                    <div className={containerStyles.cardContainer}>
                      <h2
                        className={`text-xl font-semibold mb-4 text-white ${styles.cardTitle} ${styles.glowText}`}
                      >
                        What Resonates To Me
                      </h2>
                      <p
                        className={`leading-relaxed text-purple-100 ${styles.cardText}`}
                      >
                        I am looking to create relationships that can industry
                        experience, expertise, and long-term.
                      </p>
                    </div>

                    <div className={containerStyles.cardContainer}>
                      <div className="flex justify-between items-center mb-4">
                        <h2
                          className={`text-xl font-semibold text-white ${styles.cardTitle} ${styles.glowText}`}
                        >
                          Community
                        </h2>
                      </div>
                      {/* New client component that fetches typed API responses for followers */}
                      <div>
                        {/* ProfileCommunityClient is a client component that will
                            call /api/profile/me and /api/followers/* endpoints,
                            validate the responses and render CommunityList components.
                         */}
                        <React.Suspense
                          fallback={<div>Loading community…</div>}
                        >
                          {/* dynamically import to avoid hydration issues in some cases */}
                          <ProfileCommunityClient />
                        </React.Suspense>
                      </div>
                    </div>
                  </div>
                </main>

                {/* Right Sidebar */}
                <aside className={`lg:col-span-3 ${containerStyles.sidebar}`}>
                  <div className="space-y-6">
                    <div className={containerStyles.cardContainer}>
                      <h3
                        className={`text-lg font-semibold mb-4 text-white ${styles.sectionTitle} ${styles.glowBlue}`}
                      >
                        Availability
                      </h3>

                      {/* Interactive Calendar (month view) */}
                      <div className="cyber-card mb-6 rounded-lg p-4 bg-gradient-to-b from-[#1a1a2e]/80 to-[#101024]/80">
                        <div className="text-center mb-3">
                          <div className="text-2xl font-bold text-white">
                            {calendarTitle}
                          </div>
                        </div>

                        <div className="grid grid-cols-7 gap-1 text-center text-sm mb-3">
                          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                            <div
                              key={`${d}-${i}`}
                              className="text-gray-400 font-medium py-2"
                            >
                              {d}
                            </div>
                          ))}

                          {calendarDays.map((day) => {
                            const iso = day.toISOString().slice(0, 10);
                            const isAvailable = selectedSet.has(iso);
                            const isToday = iso === todayISO;
                            return (
                              <button
                                key={iso}
                                onClick={() => toggleDate(iso)}
                                className={`py-2 rounded ${isAvailable ? "bg-gradient-to-r from-purple-500 to-cyan-400 text-white font-semibold shadow" : "text-gray-300 bg-transparent"} ${isToday ? "ring-2 ring-purple-400" : ""}`}
                                aria-pressed={isAvailable}
                                aria-label={`Toggle availability for ${iso}`}
                              >
                                {day.getDate()}
                              </button>
                            );
                          })}
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-300">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-cyan-400 rounded mr-2" />
                            <span>Available</span>
                          </div>
                          <div>
                            <button
                              className="text-sm px-3 py-1 border border-gray-700 rounded hover:bg-gray-700"
                              onClick={() => setSelectedSet(new Set())}
                            >
                              Clear
                            </button>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <div className="text-xs text-gray-300">
                            {saveMessage}
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                setCurrentMonth(
                                  new Date(
                                    currentMonth.getFullYear(),
                                    currentMonth.getMonth() - 1,
                                    1,
                                  ),
                                )
                              }
                              className="px-2 py-1 text-sm rounded bg-gray-800 hover:bg-gray-700"
                              aria-label="Previous month"
                            >
                              ‹
                            </button>
                            <button
                              onClick={() =>
                                setCurrentMonth(
                                  new Date(
                                    currentMonth.getFullYear(),
                                    currentMonth.getMonth() + 1,
                                    1,
                                  ),
                                )
                              }
                              className="px-2 py-1 text-sm rounded bg-gray-800 hover:bg-gray-700"
                              aria-label="Next month"
                            >
                              ›
                            </button>
                            <button
                              onClick={() => saveAvailability()}
                              disabled={isSaving}
                              className="px-3 py-1 text-sm rounded bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white"
                            >
                              {isSaving ? "Saving..." : "Save"}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className={containerStyles.cardContainer}>
                        <h3
                          className={`text-lg font-semibold mb-4 text-white ${styles.sectionTitle} ${styles.glowBlue}`}
                        >
                          {name}'s Best Skills
                        </h3>
                        <div className="space-y-3">
                          {skills?.map((skill: ISkill) => (
                            <div
                              className={`${styles.skillItem}`}
                              key={skill.id}
                            >
                              <span
                                className={`text-purple-100 ${styles.skillName}`}
                              >
                                {skill.name}
                              </span>
                              <span
                                className={`text-sm text-cyan-400 ${styles.skillLevel} ${styles.glowBlue}`}
                              >
                                {skill.category}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className={containerStyles.cardContainer}>
                        <h3
                          className={`text-lg font-semibold mb-4 text-white ${styles.sectionTitle} ${styles.glowBlue}`}
                        >
                          Most Memorable Tip
                        </h3>
                        <p className={`text-purple-100 ${styles.cardText}`}>
                          {society?.most_memorable_tip ||
                            "No memorable tip provided."}
                        </p>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer className={containerStyles.footer}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <div
                    className={`text-2xl font-bold mb-4 ${styles.footerBrand} ${styles.glowText}`}
                  >
                    JOBSEEKER
                  </div>
                  <p className={`text-sm leading-relaxed ${styles.footerText}`}>
                    Guiding ambitious individuals around the globe. Book a
                    mentor. Expand your network, and learn from the best in the
                    industry.
                  </p>
                </div>

                <div>
                  <h4
                    className={`font-semibold mb-4 ${styles.footerTitle} ${styles.glowBlue}`}
                  >
                    Quick links
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a href="#" className={`${styles.footerLink}`}>
                        Browse Mentors
                      </a>
                    </li>
                    <li>
                      <a href="#" className={`${styles.footerLink}`}>
                        Become a Mentor
                      </a>
                    </li>
                    <li>
                      <a href="#" className={`${styles.footerLink}`}>
                        Mentor Registration
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4
                    className={`font-semibold mb-4 ${styles.footerTitle} ${styles.glowBlue}`}
                  >
                    About
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a href="#" className={`${styles.footerLink}`}>
                        About us
                      </a>
                    </li>
                    <li>
                      <a href="#" className={`${styles.footerLink}`}>
                        Mentors
                      </a>
                    </li>
                    <li>
                      <a href="#" className={`${styles.footerLink}`}>
                        Terms & Conditions
                      </a>
                    </li>
                    <li>
                      <a href="#" className={`${styles.footerLink}`}>
                        Contact
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4
                    className={`font-semibold mb-4 ${styles.footerTitle} ${styles.glowBlue}`}
                  >
                    Social
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a href="#" className={`${styles.footerLink}`}>
                        LinkedIn
                      </a>
                    </li>
                    <li>
                      <a href="#" className={`${styles.footerLink}`}>
                        Instagram
                      </a>
                    </li>
                    <li>
                      <a href="#" className={`${styles.footerLink}`}>
                        Facebook
                      </a>
                    </li>
                    <li>
                      <a href="#" className={`${styles.footerLink}`}>
                        YouTube
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default MentorProfile;
