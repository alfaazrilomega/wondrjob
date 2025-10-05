import { NextResponse } from 'next/server';
import { prisma } from '@/lib/lib/db';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function GET(request: Request, { params }: { params: { jobId: string } }) {
  const { jobId } = params;
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const numericJobId = parseInt(jobId, 10);
    if (isNaN(numericJobId)) {
      return NextResponse.json({ error: 'Invalid Job ID' }, { status: 400 });
    }

    // Security check: Ensure the user making the request is the owner of the job
    const job = await prisma.availablePosition.findUnique({
      where: { id: numericJobId },
      select: { company: { select: { user_id: true } } },
    });

    if (job?.company.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const applicants = await prisma.positionApplied.findMany({
      where: {
        available_position_id: numericJobId,
      },
      include: {
        society: true, // Include the applicant's society details
      },
      orderBy: {
        apply_date: 'desc',
      },
    });

    return NextResponse.json({ applicants });

  } catch (error) {
    console.error(`Error fetching applicants for job ${jobId}:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
