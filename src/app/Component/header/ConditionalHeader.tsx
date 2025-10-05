/* eslint-disable prettier/prettier */
'use client';

import { usePathname } from 'next/navigation';
import Header from './header';
import { User } from '@supabase/supabase-js';

export default function ConditionalHeader({ user }: { user: User | null }) {
  const pathname = usePathname();
  const noHeaderPaths = ['/profile', '/login', '/signup', '/forgot-password', '/reset-password'];

  // Hide header if the path starts with any of the noHeaderPaths
  if (noHeaderPaths.some(path => pathname.startsWith(path))) {
    return null;
  }

  return <Header user={user} />;
}
