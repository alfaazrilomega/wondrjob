/* eslint-disable prettier/prettier */
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import { prisma } from '@/lib/lib/db';
import SocietyProfile from '@/app/Component/profile/SocietyProfile';
import CompanyProfile from '@/app/Component/profile/CompanyProfile';
import HrdProfile from '@/app/Component/profile/HrdProfile';

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect('/login');
  }

  // Fetch the user's full profile from our database
  const userProfile = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      society: {
        include: {
          portofolio: true,
        },
      },
      company: true,
      hrd: {
        include: {
          company: true,
        },
      },
    },
  });

  if (!userProfile) {
    return <div className="pt-20 text-white text-center">User profile not found in database.</div>;
  }

  switch (userProfile.role) {
    case 'SOCIETY':
      if (!userProfile.society) {
        return <div className="pt-20 text-white text-center">Society profile data missing.</div>;
      }
      return <SocietyProfile profile={userProfile.society} user={user} />;
    case 'COMPANY':
      if (!userProfile.company) {
        return <div className="pt-20 text-white text-center">Company profile data missing.</div>;
      }
      return <CompanyProfile profile={userProfile.company} user={user} />;
    case 'HRD':
      if (!userProfile.hrd) {
        return <div className="pt-20 text-white text-center">HRD profile data missing.</div>;
      }
      return <HrdProfile profile={userProfile.hrd} user={user} />;
    case 'ADMIN':
      return <div className="pt-20 text-white text-center">Admin profile page is not implemented yet.</div>;
    default:
      return <div className="pt-20 text-white text-center">Unknown user role.</div>;
  }
}
