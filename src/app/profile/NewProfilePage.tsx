
import React from 'react';
import { prisma } from '@/lib/lib/db';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';

// --- Reusable Components ---

const GlassCard = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div
    className={`bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-2xl shadow-lg p-8 ${className}`}
  >
    {children}
  </div>
);

const SkillPill = ({ skill }: { skill: string }) => (
  <div className="bg-purple-500/20 text-purple-300 text-sm font-medium px-4 py-1.5 rounded-full shadow-[0_0_10px_rgba(159,84,255,0.3)]">
    {skill}
  </div>
);

const InfoItem = ({ icon, text, label }: { icon: React.ReactNode; text: string | null; label: string }) => (
  <div>
    <div className="flex items-center gap-4">
        <div className="text-purple-400">{icon}</div>
        <div>
            <p className="text-sm text-gray-400">{label}</p>
            <p className="text-white font-medium">{text || "Not provided"}</p>
        </div>
    </div>
  </div>
);

// --- Main Page Component ---

export default async function NewProfilePage({ userId }: { userId: string }) {

  const societyData = await prisma.society.findUnique({
    where: { user_id: userId },
    include: {
      user: {
        include: {
          skills: true,
        },
      },
      portofolio: true,
    },
  });

  if (!societyData) {
    return (
      <div className="text-center text-white">
        Profile not found. Please complete your profile.
      </div>
    );
  }

  const { name, headline, location, address, phone, about, profile_picture, portofolio } = societyData;
  const email = societyData.user?.email;
  const skills = societyData.user?.skills || [];

  return (
    <div className="min-h-screen bg-[#101018] text-white p-4 md:p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- Left Column (Main Content) --- */}
        <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Profile Header */}
            <GlassCard className="flex flex-col md:flex-row items-center gap-8">
            <Avatar className="w-32 h-32 border-4 border-purple-500 shadow-[0_0_20px_rgba(159,84,255,0.5)]">
                <AvatarImage src={profile_picture || ''} />
                <AvatarFallback className="bg-gray-700 text-5xl">
                {name.charAt(0).toUpperCase()}
                </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl font-bold text-white">{name}</h1>
                <p className="text-purple-300 text-xl mt-1">
                {headline || "No headline provided."}
                </p>
                <p className="text-gray-400 mt-2">
                {location || "Location not set."}
                </p>
                <Link href="/profile/edit">
                <Button className="mt-6 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-[0_0_20px_rgba(159,84,255,0.5)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(159,84,255,0.8)]">
                    Edit Profile
                </Button>
                </Link>
            </div>
            </GlassCard>

            {/* About Card */}
            <GlassCard>
            <h2 className="text-3xl font-bold text-white mb-4">About</h2>
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">{about || 'No about section provided.'}</p>
            </GlassCard>

            {/* Skills Card */}
            <GlassCard>
            <h2 className="text-3xl font-bold text-white mb-6">Skills</h2>
            <div className="flex flex-wrap gap-4">
                {skills.length > 0 ? (
                skills.map((skill) => (
                    <SkillPill key={skill.id} skill={skill.name} />
                ))
                ) : (
                <p className="text-gray-400">No skills added yet.</p>
                )}
            </div>
            </GlassCard>

            {/* Portfolio Card */}
            <GlassCard>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-white">Portfolio</h2>
                <Link href="/profile/portfolio">
                <Button
                    variant="outline"
                    className="border-purple-500 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300"
                >
                    Manage Portfolio
                </Button>
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {portofolio.length > 0 ? (
                portofolio.slice(0, 3).map((p) => (
                    <div
                    key={p.id}
                    className="relative aspect-video bg-gray-800 rounded-lg border border-gray-700 overflow-hidden group"
                    >
                    <Image
                        src={p.file || '/images/default-logo.svg'}
                        alt={p.skill}
                        fill
                        className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                     <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white font-bold">{p.skill}</p>
                    </div>
                    </div>
                ))
                ) : (
                <p className="text-gray-400 col-span-full text-center py-8">No portfolio items yet.</p>
                )}
            </div>
            </GlassCard>
        </div>

        {/* --- Right Column (Summary Info) --- */}
        <div className="lg:col-span-1 flex flex-col gap-8">
            <GlassCard className="sticky top-8">
            <h2 className="text-3xl font-bold text-white mb-6">Contact & Info</h2>
            <div className="space-y-6">
                <InfoItem icon={<Mail size={24} />} label="Email" text={email ?? null} />
                <InfoItem icon={<Phone size={24} />} label="Phone" text={phone ?? null} />
                <InfoItem icon={<MapPin size={24} />} label="Address" text={address ?? null} />
            </div>
            </GlassCard>
        </div>
        </div>
    </div>
  );
}
