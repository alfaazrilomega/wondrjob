import React from 'react';

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#101018] min-h-screen text-white">
      <main className="container mx-auto py-12 px-4">
        {children}
      </main>
    </div>
  );
}