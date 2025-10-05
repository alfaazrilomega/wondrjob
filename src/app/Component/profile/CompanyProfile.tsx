/* eslint-disable prettier/prettier */
import { Company } from '@prisma/client';
import { User } from '@supabase/supabase-js';

type CompanyProfileProps = {
  profile: Company;
  user: User;
};

export default function CompanyProfile({ profile, user }: CompanyProfileProps) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Company Profile</h1>
      <p>Welcome, {profile.name}!</p>
      <p>Email: {user.email}</p>
      <p>This is the company profile page. It is under construction.</p>
    </div>
  );
}
