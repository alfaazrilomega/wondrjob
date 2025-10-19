import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function POST(request: Request) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => (request.headers.get('cookie') ?? '').includes(name) ? request.headers.get('cookie').split('; ').find(row => row.startsWith(name + '=')).split('=')[1] : undefined,
      },
    }
  );

  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const { currentPassword, newPassword, confirmNewPassword } = await request.json();

  if (newPassword !== confirmNewPassword) {
    return new NextResponse('New passwords do not match', { status: 400 });
  }

  // 1. Verify current password by trying to sign in with it.
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: currentPassword,
  });

  if (signInError) {
    return new NextResponse('Incorrect current password', { status: 400 });
  }

  // 2. If verification is successful, update the password.
  const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });

  if (updateError) {
    return new NextResponse('Failed to update password', { status: 500 });
  }

  return NextResponse.json({ success: true, message: 'Password updated successfully.' });
}
