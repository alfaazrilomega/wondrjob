import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { prisma } from '@/lib/lib/db';

export async function GET(request: Request) {
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

  try {
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        name: true,
        email: true,
        twoFactorEnabled: true,
      },
    });

    if (!dbUser) {
      return new NextResponse('User not found in database', { status: 404 });
    }

    return NextResponse.json(dbUser);
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
