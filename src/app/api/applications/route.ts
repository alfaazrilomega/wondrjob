import { NextResponse } from "next/server";
import { prisma } from "@/lib/lib/db";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const formData = await request.formData();
    const jobId = formData.get("jobId") as string;
    const resumeFile = formData.get("resume") as File;
    const coverLetterText = formData.get("coverLetter") as string;
    const coverLetterFile = formData.get("coverLetterFile") as File;

    if (!jobId || !resumeFile) {
      return NextResponse.json(
        { success: false, error: "Job ID and resume are required." },
        { status: 400 },
      );
    }
    if (!coverLetterText && !coverLetterFile) {
      return NextResponse.json(
        {
          success: false,
          error: "A cover letter is required (either text or file).",
        },
        { status: 400 },
      );
    }

    const jobIdInt = parseInt(jobId, 10);
    if (isNaN(jobIdInt)) {
      return NextResponse.json(
        { success: false, error: "Invalid Job ID format." },
        { status: 400 },
      );
    }

    const society = await prisma.society.findUnique({
      where: { user_id: user.id },
    });
    if (!society) {
      return NextResponse.json(
        { success: false, error: "Applicant profile not found." },
        { status: 404 },
      );
    }

    const existingApplication = await prisma.positionApplied.findFirst({
      where: { available_position_id: jobIdInt, society_id: society.id },
    });
    if (existingApplication) {
      return NextResponse.json(
        {
          success: false,
          error: "You have already applied for this position.",
        },
        { status: 409 },
      );
    }

    // Upload Resume
    const resumePath = `resumes/${user.id}/${jobIdInt}-${resumeFile.name}`;
    const { error: resumeUploadError } = await supabase.storage
      .from("wondrjob")
      .upload(resumePath, resumeFile);
    if (resumeUploadError) {
      return NextResponse.json(
        { success: false, error: "Failed to upload resume." },
        { status: 500 },
      );
    }
    const {
      data: { publicUrl: resumeUrl },
    } = supabase.storage.from("wondrjob").getPublicUrl(resumePath);

    // Handle Cover Letter (File or Text)
    let coverLetterValue: string;
    if (coverLetterFile) {
      const coverLetterPath = `cover-letters/${user.id}/${jobIdInt}-${coverLetterFile.name}`;
      const { error: clUploadError } = await supabase.storage
        .from("wondrjob")
        .upload(coverLetterPath, coverLetterFile);
      if (clUploadError) {
        return NextResponse.json(
          { success: false, error: "Failed to upload cover letter." },
          { status: 500 },
        );
      }
      const {
        data: { publicUrl },
      } = supabase.storage.from("wondrjob").getPublicUrl(coverLetterPath);
      coverLetterValue = publicUrl;
    } else {
      coverLetterValue = coverLetterText;
    }

    // Get other form data
    const expectedSalary = formData.get("expectedSalary") as string;
    const earliestStartDate = formData.get("earliestStartDate") as string;
    const workPermit = formData.get("workPermit") as string;
    const referral = formData.get("referral") as string;

    const newApplication = await prisma.positionApplied.create({
      data: {
        available_position_id: jobIdInt,
        society_id: society.id,
        resume: resumeUrl,
        coverLetter: coverLetterValue,
        expectedSalary: expectedSalary ? parseInt(expectedSalary, 10) : null,
        earliestStartDate: earliestStartDate
          ? new Date(earliestStartDate)
          : null,
        workPermit: workPermit ? workPermit === "true" : null,
        referral: referral || null,
      },
    });

    return NextResponse.json({ success: true, data: newApplication });
  } catch (error) {
    console.error("Error creating application:", error);
    return NextResponse.json(
      { success: false, error: "An internal server error occurred." },
      { status: 500 },
    );
  }
}
