import React from "react";

// This layout is required by Next.js.
// The page itself at /profile/page.tsx handles its own layout and styling.
export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
