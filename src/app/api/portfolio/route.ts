
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/lib/db';
import { getCurrentUser } from '@/lib/lib/session';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    const portfolio = await prisma.portofolio.findMany({
      where: {
        userId: user.id,
      },
    });

    return NextResponse.json(portfolio);
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    const { title, description, imageUrl, url } = await req.json();

    const newProject = await prisma.portofolio.create({
      data: {
        title,
        description,
        imageUrl,
        url,
        userId: user.id,
      },
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error('Error creating portfolio project:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    const { id, title, description, imageUrl, url } = await req.json();

    const updatedProject = await prisma.portofolio.update({
      where: {
        id: id,
      },
      data: {
        title,
        description,
        imageUrl,
        url,
      },
    });

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error('Error updating portfolio project:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    const { id } = await req.json();

    await prisma.portofolio.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ message: 'Project deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting portfolio project:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
