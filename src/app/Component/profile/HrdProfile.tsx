/* eslint-disable prettier/prettier */
import { HRD, Company } from '@prisma/client';
import { User } from '@supabase/supabase-js';

type HrdProfileProps = {
  profile: HRD & {
    company: Company;
  };
  user: User;
};

export default function HrdProfile({ profile, user }: HrdProfileProps) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">HRD Profile</h1>
      <p>Welcome, {user.email}!</p>
      <p>You are an HRD for the company: {profile.company.name}.</p>
      <p>This is the HRD profile page. It is under construction.</p>
    </div>
  );
}
