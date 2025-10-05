/* eslint-disable prettier/prettier */
import Link from 'next/link';
import { Society, Portofolio } from '@prisma/client';
import { User } from '@supabase/supabase-js';

// Helper to format date
const formatDate = (date: Date | null) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

type SocietyProfileProps = {
  profile: Society & {
    portofolio: Portofolio[];
  };
  user: User;
};

export default function SocietyProfile({ profile, user }: SocietyProfileProps) {
  const { name, phone, date_of_birth, address, gender, skills = [], headline, portofolio } = profile;

  return (
    <>
        <style dangerouslySetInnerHTML={{ __html: `
            body { font-family: 'Mona Sans', sans-serif; background-color: #0E0E10; color: #D9ECFF; }
            .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
            .futuristic-border { border-image-slice: 1; border-image-source: linear-gradient(to bottom right, #374151, #4f46e5, #374151); border-width: 1px; border-style: solid; }
            .futuristic-border-hover:hover { border-image-source: linear-gradient(to bottom right, #4f46e5, #a855f7, #4f46e5); }
            .skill-tag { @apply inline-block bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-sm font-medium px-3 py-1 rounded-full transition-colors hover:bg-indigo-500/30; }
        `}} />
        <main className="flex-grow pt-12">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl shadow-2xl p-6 text-center sticky top-12">
                            <div className="relative inline-block mb-4">
                                <img alt={name} className="h-32 w-32 rounded-full mx-auto border-4 border-indigo-500/50" src={user.user_metadata.avatar_url || `https://ui-avatars.com/api/?name=${name}&background=0E0E10&color=D9ECFF`} />
                                <div className="absolute bottom-1 right-1 bg-green-500 rounded-full h-5 w-5 border-2 border-gray-900"></div>
                            </div>
                            <h1 className="text-2xl font-bold text-white">{name}</h1>
                            <p className="text-indigo-400 mb-4">{headline || 'Aspiring Developer'}</p>
                            <div className="flex flex-wrap justify-center gap-2 mb-6">
                                {skills.length > 0 ? (
                                    skills.slice(0, 4).map(skill => <span key={skill} className="skill-tag">{skill}</span>)
                                ) : (
                                    <p className="text-sm text-gray-500">No skills added.</p>
                                )}
                            </div>
                            <Link href="/profile/edit" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700">
                                Edit Profile
                                <span className="material-symbols-outlined ml-2 text-base">edit</span>
                            </Link>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Personal Info */}
                        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-white mb-6">Personal Information</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-gray-300">
                                    <div className="flex items-center gap-3"><span className="material-symbols-outlined text-indigo-400">email</span><span>{user.email}</span></div>
                                    <div className="flex items-center gap-3"><span className="material-symbols-outlined text-indigo-400">phone</span><span>{phone || 'N/A'}</span></div>
                                    <div className="flex items-center gap-3"><span className="material-symbols-outlined text-indigo-400">cake</span><span>{formatDate(date_of_birth)}</span></div>
                                    <div className="flex items-center gap-3"><span className="material-symbols-outlined text-indigo-400">person</span><span>{gender || 'N/A'}</span></div>
                                    <div className="flex items-start gap-3 sm:col-span-2"><span className="material-symbols-outlined text-indigo-400 mt-0.5">home</span><span>{address || 'N/A'}</span></div>
                                </div>
                            </div>
                        </div>

                        {/* Skills */}
                        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-white mb-6">Skills</h2>
                                <div className="flex flex-wrap gap-3">
                                    {skills.length > 0 ? (
                                        skills.map(skill => <span key={skill} className="skill-tag">{skill}</span>)
                                    ) : (
                                        <p className="text-sm text-gray-500">No skills added yet. Click &apos;Edit Profile&apos; to add your skills.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Portfolio */}
                        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold text-white">Portfolio / Projects</h2>
                                    <Link href="/profile/portfolio/add" className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
                                        <span className="material-symbols-outlined">add</span>
                                    </Link>
                                </div>
                                <div className="space-y-6">
                                    {portofolio.length > 0 ? (
                                        portofolio.map(item => (
                                            <div key={item.id} className="futuristic-border futuristic-border-hover bg-gray-900/60 rounded-xl p-4 transition-all duration-300">
                                                <div className="flex items-start gap-4">
                                                    <div className="flex-shrink-0"><div className="w-12 h-12 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center"><span className="material-symbols-outlined text-indigo-400 text-2xl">code</span></div></div>
                                                    <div className="flex-grow">
                                                        <div className="flex justify-between items-center">
                                                            <h3 className="font-semibold text-white">{item.skill}</h3>
                                                            <div className="flex items-center gap-2">
                                                                <Link href={`/profile/portfolio/edit/${item.id}`} className="text-gray-400 hover:text-white transition-colors"><span className="material-symbols-outlined text-base">edit</span></Link>
                                                                <a href={item.file} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 transition-colors"><span className="material-symbols-outlined">open_in_new</span></a>
                                                            </div>
                                                        </div>
                                                        <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 text-center">No portfolio items added yet.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </>
  );
}
