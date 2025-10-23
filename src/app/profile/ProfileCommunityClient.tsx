"use client";

import React, { useEffect, useState } from "react";
import CommunityList from "@/app/Component/CommunityList";

type IUserItem = {
  id: string;
  name: string;
  role?: string | null;
  initials?: string | null;
  avatarUrl?: string | null;
};

type ICompanyItem = {
  id: number;
  name: string;
  industry?: string | null;
  logoUrl?: string | null;
};

type ProfileResp = { user: { id: string } };

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function isProfileResp(obj: unknown): obj is ProfileResp {
  if (!isObject(obj)) return false;
  const u = (obj as Record<string, unknown>).user;
  if (!isObject(u)) return false;
  return typeof (u as Record<string, unknown>).id === "string";
}

function isUserArray(obj: unknown): obj is IUserItem[] {
  if (!Array.isArray(obj)) return false;
  return obj.every(
    (it) =>
      isObject(it) &&
      typeof (it as Record<string, unknown>).id === "string" &&
      typeof (it as Record<string, unknown>).name === "string",
  );
}

function isCompanyArray(obj: unknown): obj is ICompanyItem[] {
  if (!Array.isArray(obj)) return false;
  return obj.every(
    (it) =>
      isObject(it) &&
      typeof (it as Record<string, unknown>).id === "number" &&
      typeof (it as Record<string, unknown>).name === "string",
  );
}

const ProfileCommunityClient: React.FC = () => {
  const [users, setUsers] = useState<IUserItem[]>([]);
  const [companies, setCompanies] = useState<ICompanyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const pRes = await fetch(`/api/profile/me`);
        if (!pRes.ok) throw new Error(`profile fetch failed: ${pRes.status}`);
        const pJson = await pRes.json();
        if (!isProfileResp(pJson))
          throw new Error("Invalid profile response shape");
        const userId = pJson.user.id;

        const uRes = await fetch(
          `/api/followers/users?userId=${encodeURIComponent(userId)}`,
        );
        if (!uRes.ok) throw new Error(`users fetch failed: ${uRes.status}`);
        const uJson = await uRes.json();
        const uObj = isObject(uJson)
          ? (uJson as Record<string, unknown>)
          : null;
        const userItemsRaw: unknown[] =
          uObj && Array.isArray(uObj["users"])
            ? (uObj["users"] as unknown[])
            : [];
        if (!isUserArray(userItemsRaw))
          throw new Error("Invalid users response");

        const cRes = await fetch(
          `/api/followers/companies?userId=${encodeURIComponent(userId)}`,
        );
        if (!cRes.ok) throw new Error(`companies fetch failed: ${cRes.status}`);
        const cJson = await cRes.json();
        const cObj = isObject(cJson)
          ? (cJson as Record<string, unknown>)
          : null;
        const companyItemsRaw: unknown[] =
          cObj && Array.isArray(cObj["companies"])
            ? (cObj["companies"] as unknown[])
            : [];
        if (!isCompanyArray(companyItemsRaw))
          throw new Error("Invalid companies response");

        if (!mounted) return;
        setUsers(userItemsRaw as IUserItem[]);
        setCompanies(companyItemsRaw as ICompanyItem[]);
        setLoading(false);
      } catch (err) {
        if (!mounted) return;
        const msg = err instanceof Error ? err.message : String(err);
        setError(msg);
        setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <div>Loading community…</div>;
  if (error) return <div className="text-red-400">{error}</div>;

  return (
    <div className="space-y-4">
      <CommunityList
        title="Followers"
        items={users}
        totalItems={users.length}
        variant="user"
      />
      <CommunityList
        title="Companies Following"
        items={companies}
        totalItems={companies.length}
        variant="company"
      />
    </div>
  );
};

export default ProfileCommunityClient;
