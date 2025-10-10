"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import CompanyMonthlySuccessRateChart from "@/app/Component/company/CompanyMonthlySuccessRateChart";

// --- TYPES ---
type Job = { id: number; position_name: string; capacity: number };
type MonthlyStat = { month: number; year: number; successRate: number };
type Company = {
  id: number;
  name: string;
  logo: string | null;
  address: string;
  phone: string;
  description: string;
  jobs: Job[];
  monthlyStats: MonthlyStat[];
};

// --- HELPERS ---
const sanitizeLogoUrl = (url: string | null | undefined): string => {
    if (!url) return '/next.svg';
    if (url.includes("google.com/imgres")) {
        try {
            const urlObj = new URL(url);
            const imgurl = urlObj.searchParams.get("imgurl");
            if (imgurl) return imgurl;
        } catch (e) {
            console.error("Could not parse logo URL", e);
            return '/next.svg';
        }
    }
    return url;
};

// --- ICONS ---
const MapPinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9F54FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9F54FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>;

// --- MODAL COMPONENT ---
const Modal = ({ title, isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="glass-pane w-full max-w-md p-6 border border-[#9F54FF]/30">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <button onClick={onClose} className="text-white/60 hover:text-white">&times;</button>
        </div>
        {children}
      </div>
    </div>
  );
};

// --- PAGE ---
export default function CompanyProfilePage() {
  const params = useParams();
  const id = params.id as string;

  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [notification, setNotification] = useState("");

  // Form state for stats modal
  const [statsYear, setStatsYear] = useState<number | ''>(new Date().getFullYear());
  const [statsMonth, setStatsMonth] = useState<number | ''>(new Date().getMonth() + 1);
  const [statsRate, setStatsRate] = useState<number | ''>(0);

  // Form state for delete modal
  const [deleteYear, setDeleteYear] = useState<number | ''>(new Date().getFullYear());
  const [deleteMonth, setDeleteMonth] = useState<number | ''>(new Date().getMonth() + 1);

  useEffect(() => {
    if (!id) return;
    async function fetchCompanyData() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/company/${id}`);
        const result = await response.json();

        if (!response.ok) {
          setError(result.error || `An error occurred: ${response.statusText}`);
          setCompany(null);
        } else if (result.success) {
          setCompany(result.data);
        } else {
          setError(result.error || 'Failed to retrieve valid data.');
          setCompany(null);
        }
      } catch (err) {
        setError('An unexpected network error occurred.');
        setCompany(null);
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCompanyData();
  }, [id]);

  const handleStatsUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company) return;

    const res = await fetch(`/api/company/stats/${company.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ year: statsYear, month: statsMonth, successRate: Number(statsRate || 0) / 100 }),
    });

    if (res.ok) {
      const updatedStat = await res.json();
      setCompany(prev => {
          if (!prev) return null;
          const existingStatIndex = prev.monthlyStats.findIndex(s => s.year === updatedStat.data.year && s.month === updatedStat.data.month);
          const newStats = [...prev.monthlyStats];
          if (existingStatIndex > -1) newStats[existingStatIndex] = updatedStat.data;
          else newStats.push(updatedStat.data);
          return { ...prev, monthlyStats: newStats };
      });
      setNotification("Stats updated successfully!");
      setIsStatsModalOpen(false);
    } else {
      setNotification("Failed to update stats.");
    }
    setTimeout(() => setNotification(""), 3000);
  };

  const handleStatsDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company) return;

    const res = await fetch(`/api/company/stats/${company.id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ year: deleteYear, month: deleteMonth }),
      }
    );

    if (res.ok) {
      setCompany((prev) => {
        if (!prev) return null;
        const newStats = prev.monthlyStats.filter(
          (s) => !(s.year === deleteYear && s.month === deleteMonth)
        );
        return { ...prev, monthlyStats: newStats };
      });
      setNotification("Stat deleted successfully!");
      setIsDeleteModalOpen(false);
    } else {
      const data = await res.json();
      setNotification(data.error || "Failed to delete stat.");
    }
    setTimeout(() => setNotification(""), 3000);
  };

  const latestSuccessRate = useMemo(() => {
    if (!company || !company.monthlyStats || company.monthlyStats.length === 0) return 0;
    const sortedStats = [...company.monthlyStats].sort((a, b) => (a.year * 12 + a.month) - (b.year * 12 + b.month));
    return sortedStats[sortedStats.length - 1].successRate * 100;
  }, [company]);

  if (loading) return <div className="p-8 text-white">Loading...</div>;
  if (error) return <div className="p-8 text-white">Error: {error}</div>;
  if (!company) {
    return <div className="p-8 text-white">Company Not Found.</div>;
  }

  return (
    <>
      <style jsx global>{`
        .glass-pane { background-color: rgba(26, 26, 46, 0.5); border: 1px solid rgba(159, 84, 255, 0.2); backdrop-filter: blur(10px); border-radius: 10px; box-shadow: 0 0 20px rgba(159, 84, 255, 0.1); }
      `}</style>
      
      {notification && <div className="fixed top-5 right-5 bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg z-50">{notification}</div>}

      <div className="p-8 text-white" style={{ background: '#101018' }}>
        <div className="glass-pane flex items-center justify-between p-6 mb-8">
          <div className="flex items-center gap-6">
            <Image src={sanitizeLogoUrl(company.logo)} alt={`${company.name} logo`} width={80} height={80} className="rounded-full" />
            <h1 className="text-4xl font-bold text-[#E0E0E0]">{company.name}</h1>
          </div>
          <button onClick={() => setIsFollowing(!isFollowing)} className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${isFollowing ? 'border-2 border-[#9F54FF] text-[#9F54FF]' : 'bg-[#9F54FF] text-white shadow-[0_0_15px_rgba(159,84,255,0.5)] hover:bg-purple-600'}`}>
            {isFollowing ? "Following" : "Follow"}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="glass-pane p-8"><h2 className="text-2xl font-bold text-white mb-4">Description</h2><p style={{ color: 'rgba(224, 224, 224, 0.6)' }} className="leading-relaxed">{company.description}</p></div>
            <div className="glass-pane p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Available Positions</h2>
              <div className="flex flex-col">
                {company.jobs && company.jobs.length > 0 ? company.jobs.map((job, index) => (
                  <div key={job.id} className={`flex items-center justify-between py-4 ${index < company.jobs.length - 1 ? 'border-b border-[rgba(159,84,255,0.2)]' : ''}`}>
                    <div>
                      <h3 className="font-bold text-lg text-white">{job.position_name}</h3>
                      <p className="text-sm text-white/60">Jakarta, Indonesia • {job.capacity} Openings</p>
                    </div>
                    <Link href={`/admin/job-posting/${job.id}`} passHref>
                      <button className="px-5 py-2 rounded-lg border-2 border-[#9F54FF] text-[#9F54FF] font-semibold transition-all duration-300 hover:bg-[#9F54FF] hover:text-white">View Details</button>
                    </Link>
                  </div>
                )) : <p className="text-center text-white/60 py-8">No available positions at the moment.</p>}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 flex flex-col gap-8">
            <div className="glass-pane p-6">
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-4"><MapPinIcon /><span className="text-white/80">{company.address}</span></div>
                <div className="flex items-center gap-4"><PhoneIcon /><span className="text-white/80">{company.phone}</span></div>
              </div>
            </div>
            <div className="glass-pane p-6">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold text-white">Company Monthly Stats</h2>
                <div className="flex gap-2">
                  <button onClick={() => setIsStatsModalOpen(true)} className="px-4 py-1 rounded-lg border-2 border-[#9F54FF] text-[#9F54FF] font-semibold text-sm transition-all duration-300 hover:bg-[#9F54FF] hover:text-white">Edit</button>
                  <button onClick={() => setIsDeleteModalOpen(true)} className="px-4 py-1 rounded-lg border-2 border-red-500 text-red-500 font-semibold text-sm transition-all duration-300 hover:bg-red-500 hover:text-white">Delete</button>
                </div>
              </div>
              <p className="text-sm text-white/60 mb-4">Historical Success Rate</p>
              <p className="text-6xl font-bold text-white mb-1">{latestSuccessRate.toFixed(0)}%</p>
              <p className="text-sm text-white/60 mb-6">Last 12 Months</p>
              <div className="h-48"><CompanyMonthlySuccessRateChart data={company.monthlyStats || []} lineColor="#9F54FF" /></div>
            </div>
          </div>
        </div>
      </div>

      <Modal title="Edit Monthly Stats" isOpen={isStatsModalOpen} onClose={() => setIsStatsModalOpen(false)}>
        <form onSubmit={handleStatsUpdate} className="flex flex-col gap-4">
          <div className="flex gap-4">
            <input type="number" placeholder="Year" value={statsYear} onChange={e => { const v = parseInt(e.target.value); setStatsYear(isNaN(v) ? '' : v); }} className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#9F54FF]" />
            <input type="number" placeholder="Month" value={statsMonth} onChange={e => { const v = parseInt(e.target.value); setStatsMonth(isNaN(v) ? '' : v); }} className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#9F54FF]" />
          </div>
          <input type="number" placeholder="Success Rate (%)" value={statsRate} onChange={e => { const v = parseFloat(e.target.value); setStatsRate(isNaN(v) ? '' : v); }} className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#9F54FF]" />
          <button type="submit" className="w-full px-6 py-2 rounded-lg bg-[#9F54FF] text-white font-semibold shadow-[0_0_15px_rgba(159,84,255,0.5)] transition-all duration-300 hover:bg-purple-600">Save Changes</button>
        </form>
      </Modal>

      <Modal title="Delete Monthly Stat" isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <form onSubmit={handleStatsDelete} className="flex flex-col gap-4">
          <p className="text-sm text-white/70">Select the month and year of the stat you want to delete.</p>
          <div className="flex gap-4">
            <input type="number" placeholder="Year" value={deleteYear} onChange={e => { const v = parseInt(e.target.value); setDeleteYear(isNaN(v) ? '' : v); }} className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500" />
            <input type="number" placeholder="Month" value={deleteMonth} onChange={e => { const v = parseInt(e.target.value); setDeleteMonth(isNaN(v) ? '' : v); }} className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>
          <button type="submit" className="w-full px-6 py-2 rounded-lg bg-red-500 text-white font-semibold shadow-[0_0_15px_rgba(255,0,0,0.5)] transition-all duration-300 hover:bg-red-600">Delete Stat</button>
        </form>
      </Modal>
    </>
  );
}
