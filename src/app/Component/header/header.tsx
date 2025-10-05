'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@supabase/supabase-js';
import { logout } from '@/app/actions/auth';

interface HeaderProps {
  user: User | null;
}

const Header = ({ user }: HeaderProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const isAdminPage = pathname === '/admin';

  const noHeaderPaths = ['/login', '/signup', '/forgot-password'];
  const isApplyPage = pathname.startsWith('/apply');
  const isCompanyDetailPage =
    pathname.startsWith('/company/') && pathname.split('/').length > 2;

  if (noHeaderPaths.includes(pathname) || isCompanyDetailPage || isApplyPage) {
    return null;
  }

  const handleLogout = async () => {
    await logout();
    router.refresh();
  };

  const getProfileLink = () => {
    if (!user) {
      return '/';
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const role = (user.user_metadata as any)?.role;
    switch (role) {
      case 'admin':
        return '/admin';
      case 'hrd':
        return '/dashboard/hrd';
      case 'company':
        return '/dashboard/company';
      default:
        return '/profile';
    }
  };

  const headerContent = (
    <header className={user ? 'user-logged-in' : ''}>
        <div className='left'>
          <h1>
            <span className='animated-gradient' style={{ color: 'blueviolet' }}>
              Wondr
            </span>
            Job
          </h1>
        </div>
        <ul>
          <li>
            <Link href='/company'>Company</Link>
          </li>
          <li>
            <a href='#'>Resource</a>
          </li>
          <li>
            <a href='#'>Job</a>
          </li>
          <li>
            <a href='#'>Society</a>
          </li>
        </ul>
        <div className={`btn-signin ${user ? 'user-logged-in' : ''}`}>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                {isAdminPage ? (
                  <div className="avatar-placeholder">A</div>
                ) : (
                  <Avatar>
                    <AvatarImage src={user.user_metadata.avatar_url || ''} />
                    <AvatarFallback>
                      {user.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent className='DropdownIndex'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <a href={getProfileLink()}>Profile</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button onClick={handleLogout}>Log Out</button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <a href='/login'>Sign In</a>
          )}
        </div>
      </header>
  );

  if (isAdminPage) {
    return (
      <div className="unified-header-container">
        <div className={`main-header-bar ${!isHeaderVisible ? 'hidden' : ''}`}>
          {headerContent}
        </div>
        <div className="control-tab" onClick={() => setIsHeaderVisible(!isHeaderVisible)}>
          <span className={isHeaderVisible ? 'chevron-up' : 'chevron-down'}></span>
        </div>
      </div>
    );
  }

  return <div>{headerContent}</div>;
};

export default Header;