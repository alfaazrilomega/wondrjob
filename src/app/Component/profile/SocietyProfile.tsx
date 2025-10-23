/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Image from "next/image";
import { Bell, ChevronDown, MapPin } from "lucide-react";

// --- Reusable Components ---

const GlassCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg ${className}`}
  >
    {children}
  </div>
);

const GlowButton = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <button
    className={`bg-wondr-purple text-white font-bold rounded-lg px-6 py-3 transition-all duration-300 hover:shadow-[0_0_20px_rgba(159,84,255,0.8)] hover:bg-opacity-90 ${className}`}
  >
    {children}
  </button>
);

const SkillTag = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-wondr-purple/10 text-wondr-purple border border-wondr-purple/30 rounded-full px-4 py-1.5 text-sm font-medium">
    {children}
  </div>
);

// --- Main Profile Components ---

const ProfileHeader = () => (
  <GlassCard className="p-4 flex justify-between items-center">
    <h1 className="text-2xl font-bold text-wondr-purple">WondrJob</h1>
    <nav className="hidden md:flex items-center gap-8 text-wondr-text/80">
      <a href="#" className="hover:text-wondr-purple transition-colors">
        Browse Jobs
      </a>
      <a href="#" className="hover:text-wondr-purple transition-colors">
        Find Talent
      </a>
    </nav>
    <div className="flex items-center gap-4">
      <Bell className="text-wondr-text/80 hover:text-wondr-purple cursor-pointer" />
      <Image
        src="https://i.imgur.com/8b23vQp.png"
        alt="User Avatar"
        width={40}
        height={40}
        className="rounded-full"
      />
      <ChevronDown className="text-wondr-text/80" />
    </div>
  </GlassCard>
);

const HeroSection = () => (
  <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-lg">
    <Image
      src="https://images.unsplash.com/photo-1550745165-9bc0b252726a?q=80&w=2070&auto=format&fit=crop"
      alt="Profile background"
      width={1200}
      height={300}
      className="w-full h-48 object-cover"
    />
    <div className="absolute top-4 right-4">
      <GlowButton>Share Profile</GlowButton>
    </div>
  </div>
);

const MainProfileCard = () => (
  <GlassCard className="-mt-20 z-10 p-6 flex flex-col md:flex-row items-center gap-6 relative">
    <div className="relative -mt-16 md:-mt-24 flex-shrink-0">
      <Image
        src="https://i.imgur.com/8b23vQp.png"
        alt="Asif Nasim"
        width={160}
        height={160}
        className="rounded-full border-4 border-wondr-purple shadow-[0_0_25px_rgba(159,84,255,0.6)]"
      />
    </div>
    <div className="flex-grow text-center md:text-left">
      <h2 className="text-4xl font-bold text-wondr-text">Asif Nasim</h2>
      <p className="text-xl text-wondr-text/70 mt-1">
        Senior Product Manager at Google
      </p>
      <div className="flex items-center justify-center md:justify-start gap-2 text-wondr-text/60 mt-2">
        <MapPin size={16} />
        <span>San Francisco, CA</span>
      </div>
    </div>
    <div className="flex-shrink-0">
      <GlowButton>Connect</GlowButton>
    </div>
  </GlassCard>
);

const ProfileTabs = () => (
  <div className="border-b border-white/10 mt-8">
    <nav className="-mb-px flex space-x-8 text-wondr-text/70">
      <a
        href="#"
        className="whitespace-nowrap py-4 px-1 border-b-2 font-semibold text-wondr-purple border-wondr-purple"
      >
        Overview
      </a>
      <a
        href="#"
        className="whitespace-nowrap py-4 px-1 border-b-2 border-transparent hover:border-wondr-purple/50 hover:text-wondr-text transition-colors"
      >
        Nasim&apos;s Availability
      </a>
      <a
        href="#"
        className="whitespace-nowrap py-4 px-1 border-b-2 border-transparent hover:border-wondr-purple/50 hover:text-wondr-text transition-colors"
      >
        Experiences
      </a>
      <a
        href="#"
        className="whitespace-nowrap py-4 px-1 border-b-2 border-transparent hover:border-wondr-purple/50 hover:text-wondr-text transition-colors"
      >
        Reviews (15)
      </a>
    </nav>
  </div>
);

const AboutSection = () => (
  <GlassCard className="p-8">
    <h3 className="text-2xl font-bold text-wondr-text">
      How I'd Describe Myself
    </h3>
    <p className="text-wondr-text/80 mt-4 leading-relaxed">
      I'm a product leader with a passion for building innovative products that
      solve real-world problems. I have over 10 years of experience in product
      management, and I'm currently a Senior Product Manager at Google.
    </p>
  </GlassCard>
);

const AvailabilitySection = () => (
  <GlassCard className="p-8">
    <h3 className="text-2xl font-bold text-wondr-text">
      Availability On February
    </h3>
    {/* Placeholder for calendar component */}
    <div className="mt-4 text-center text-wondr-text/60">
      Calendar component would be here.
    </div>
  </GlassCard>
);

const Sidebar = () => (
  <aside className="flex flex-col gap-8">
    <GlassCard className="p-6">
      <h3 className="text-xl font-bold text-wondr-text">Expert in:</h3>
      <div className="flex flex-wrap gap-2 mt-4">
        <SkillTag>Capital Raising</SkillTag>
        <SkillTag>Marketing & Sales</SkillTag>
        <SkillTag>Consulting</SkillTag>
        <SkillTag>Business Development</SkillTag>
      </div>
    </GlassCard>
    <GlassCard className="p-6">
      <h3 className="text-xl font-bold text-wondr-text">Nasim's Best Skills</h3>
      <div className="flex flex-wrap gap-2 mt-4">
        <SkillTag>Product Strategy</SkillTag>
        <SkillTag>Team Leadership</SkillTag>
      </div>
    </GlassCard>
  </aside>
);

const ProfileFooter = () => (
  <footer className="mt-16 border-t border-white/10 py-8 text-wondr-text/60">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h2 className="text-2xl font-bold text-wondr-purple">WondrJob</h2>
        <p className="mt-2">The future of work is here.</p>
      </div>
      <div>
        <h3 className="font-semibold text-wondr-text">Quick Links</h3>
        <ul className="mt-2 space-y-1">
          <li>
            <a href="#" className="hover:text-wondr-purple">
              About Us
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-wondr-purple">
              Contact
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold text-wondr-text">Social</h3>
        {/* Social links */}
      </div>
    </div>
  </footer>
);

// --- The Main Exported Component ---

export default function SocietyProfile() {
  return (
    <div className="bg-wondr-background min-h-screen text-wondr-text p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <ProfileHeader />

        <main className="mt-8">
          <HeroSection />
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-8">
              <MainProfileCard />
              <ProfileTabs />
              <div className="mt-8 flex flex-col gap-8">
                <AboutSection />
                <AvailabilitySection />
              </div>
            </div>
            <div className="lg:col-span-4 mt-8 lg:mt-0">
              <Sidebar />
            </div>
          </div>
        </main>

        <ProfileFooter />
      </div>
    </div>
  );
}
