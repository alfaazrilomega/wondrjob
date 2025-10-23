import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/lib/db";
import { getCurrentUser } from "@/lib/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 },
      );
    }

    const society = await prisma.society.findUnique({
      where: {
        user_id: user.id,
      },
    });

    if (!society) {
      return NextResponse.json(
        { message: "Society not found for user" },
        { status: 404 },
      );
    }

    const portfolio = await prisma.portofolio.findMany({
      where: {
        society_id: society.id,
      },
    });

    return NextResponse.json(portfolio);
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 },
      );
    }

    const society = await prisma.society.findUnique({
      where: {
        user_id: user.id,
      },
    });

    if (!society) {
      return NextResponse.json(
        { message: "Society not found for user" },
        { status: 404 },
      );
    }

    const { title, description, imageUrl, url } = await req.json();

    const newProject = await prisma.portofolio.create({
      data: {
        skill: title,
        description,
        file: url || imageUrl,
        society_id: society.id,
      },
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("Error creating portfolio project:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 },
      );
    }

    const { id, title, description, imageUrl, url } = await req.json();

    const updatedProject = await prisma.portofolio.update({
      where: {
        id: id,
      },
      data: {
        skill: title,
        description,
        file: url || imageUrl,
      },
    });

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error("Error updating portfolio project:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 },
      );
    }

    const { id } = await req.json();

    await prisma.portofolio.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json(
      { message: "Project deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting portfolio project:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
