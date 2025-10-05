/* eslint-disable prettier/prettier */
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { targetRole, companyId } = await req.json();

  if (!targetRole) {
    return NextResponse.json({ error: 'Target role is required' }, { status: 400 });
  }

  try {
    // Start a transaction to ensure data consistency
    const updatedUser = await prisma.$transaction(async (tx) => {
      // Update user role
      const userUpdate = await tx.user.update({
        where: { id: user.id },
        data: { role: targetRole },
      });

      if (targetRole === 'HRD') {
        if (!companyId) {
          throw new Error('Company ID is required for HRD role');
        }
        // check if company exists
        const company = await tx.company.findUnique({
            where: { id: companyId },
        });
        if (!company) {
            throw new Error('Company not found');
        }

        // Create HRD entry
        await tx.hrd.create({
          data: {
            user_id: user.id,
            company_id: companyId,
          },
        });
      }
      // Add logic for other roles if needed in the future

      return userUpdate;
    });

    return NextResponse.json(updatedUser);
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'An unknown error occurred.' }, { status: 500 });
  }
}
