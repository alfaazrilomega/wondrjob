import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/lib/db';
import { UserRole } from '@prisma/client';

export async function POST(request: Request) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // 1. Check if the current user is an ADMIN
  const { data: { user: adminUser } } = await supabase.auth.getUser();
  if (!adminUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const adminProfile = await prisma.user.findUnique({
    where: { id: adminUser.id },
    select: { role: true },
  });

  if (adminProfile?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden: Not an admin' }, { status: 403 });
  }

  // 2. Get the new user's data from the request body
  const { email, password, name, role, ...roleSpecificData } = await request.json();

  if (!email || !password || !name || !role) {
    return NextResponse.json({ error: 'Missing required fields: email, password, name, role' }, { status: 400 });
  }

  try {
    // 3. Create the user in Supabase Auth using the admin client
    const { data: newUser, error: supabaseError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Automatically confirm the email
    });

    if (supabaseError) {
      return NextResponse.json({ error: `Supabase error: ${supabaseError.message}` }, { status: 500 });
    }

    if (!newUser || !newUser.user) {
        return NextResponse.json({ error: 'Failed to create user in Supabase' }, { status: 500 });
    }

    // 4. Create the user and role-specific profile in your local database
    await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          id: newUser.user.id,
          email: newUser.user.email!,
          name,
          role: role as UserRole,
        },
      });

      switch (role) {
        case 'SOCIETY':
          await tx.society.create({
            data: {
              user_id: user.id,
              name,
              phone: roleSpecificData.phone || '-',
              address: roleSpecificData.address || '-',
              date_of_birth: new Date(), // Placeholder
            },
          });
          break;
        case 'COMPANY':
          await tx.company.create({
            data: {
              user_id: user.id,
              name: roleSpecificData.companyName,
              address: roleSpecificData.companyAddress,
              phone: roleSpecificData.companyPhone,
              description: roleSpecificData.companyDescription,
            },
          });
          break;
        case 'HRD':
          if (!roleSpecificData.companyId) {
            throw new Error('companyId is required to create an HRD user');
          }
          await tx.hrd.create({
            data: {
              user_id: user.id,
              company_id: parseInt(roleSpecificData.companyId, 10),
            },
          });
          break;
        default:
          throw new Error(`Invalid role specified: ${role}`);
      }
    });

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });

  } catch (error) {
    console.error('Error creating user:', error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
