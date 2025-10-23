"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { updateUserProfile } from "@/app/actions/user";
import SkillInput from "@/app/Component/SkillInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { Skill } from "@prisma/client";

interface UserProfile {
  id: number;
  user_id: string;
  name: string;
  headline: string | null;
  location: string | null;
  phone: string;
  address: string;
  gender: string | null;
  about: string | null;
  profile_picture: string | null;
  social_media_url: string | null;
  working_papers_url: string | null;
  occupation: string | null;
  user: {
    skills: Skill[];
  } | null;
}

// --- GlassCard Component ---
const GlassCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-2xl shadow-lg ${className}`}
  >
    {children}
  </div>
);

// --- Main Client Component ---
export default function NewEditProfilePage({
  userProfile,
}: {
  userProfile: UserProfile;
}) {
  const router = useRouter();

  // --- State Management for Form Fields & Live Preview ---
  const [name, setName] = useState(userProfile.name);
  const [headline, setHeadline] = useState(userProfile.headline || "");
  const [about, setAbout] = useState(userProfile.about || "");
  const [location, setLocation] = useState(userProfile.location || "");
  const [phone, setPhone] = useState(userProfile.phone || "");
  const [address, setAddress] = useState(userProfile.address || "");
  const [social_media_url, setSocialMediaUrl] = useState(
    userProfile.social_media_url || "",
  );
  const [working_papers_url, setWorkingPapersUrl] = useState(
    userProfile.working_papers_url || "",
  );
  const [occupation, setOccupation] = useState(userProfile.occupation || "");
  const [skills, setSkills] = useState<Skill[]>(userProfile.user?.skills || []);
  const [profilePicture, setProfilePicture] = useState(
    userProfile.profile_picture,
  );
  const [newProfilePictureFile, setNewProfilePictureFile] =
    useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setNewProfilePictureFile(file);
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  const profileCompleteness = useMemo(() => {
    let score = 0;
    if (name) score++;
    if (headline) score++;
    if (about) score++;
    if (location) score++;
    if (phone) score++;
    if (address) score++;
    if (skills.length > 0) score++;
    if (profilePicture) score++;
    return Math.round((score / 8) * 100);
  }, [name, headline, about, location, phone, address, skills, profilePicture]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    let finalProfilePictureUrl = profilePicture;

    try {
      // Step 1: If there's a new file, upload it first
      if (newProfilePictureFile) {
        // 1a: Get the signed URL
        const signedUrlResult = await createSignedUploadUrl(
          newProfilePictureFile.name,
          newProfilePictureFile.type,
        );

        if ("error" in signedUrlResult) {
          throw new Error(signedUrlResult.error);
        }

        const { signedUrl, path } = signedUrlResult.success;

        // 1b: Upload the file to the signed URL
        const uploadResponse = await fetch(signedUrl, {
          method: "PUT",
          body: newProfilePictureFile,
          headers: {
            "Content-Type": newProfilePictureFile.type,
          },
        });

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload file.");
        }

        // 1c: Construct the public URL
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
        finalProfilePictureUrl = `${supabaseUrl}/storage/v1/object/public/profile-pictures/${path}`;
      }

      // Step 2: Submit the rest of the form with the final image URL
      const formData = new FormData();
      formData.append("name", name);
      formData.append("headline", headline);
      formData.append("about", about);
      formData.append("location", location);
      formData.append("phone", phone);
      formData.append("address", address);
      formData.append("occupation", occupation);
      formData.append("social_media_url", social_media_url);
      formData.append("working_papers_url", working_papers_url);
      formData.append("skills", JSON.stringify(skills.map((s) => s.id)));
      if (finalProfilePictureUrl) {
        formData.append("profile_picture_url", finalProfilePictureUrl);
      }

      const result = await updateUserProfile(formData);

      if (result?.error) {
        throw new Error(result.error);
      }

      router.push("/profile");
      router.refresh();
    } catch (error) {
      console.error("Submission Error:", error);
      alert((error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#101018] text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">
          Edit Your Profile
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* --- LEFT COLUMN (Primary Form Area) --- */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Identity Card */}
            <GlassCard className="p-8">
              <h2 className="text-2xl font-bold mb-6">Identity</h2>
              <div className="flex items-center gap-8">
                <div className="relative w-32 h-32 flex-shrink-0">
                  <Image
                    src={profilePicture || "/images/default-logo.svg"}
                    alt="Profile Picture"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="photo-upload"
                    className="cursor-pointer bg-transparent border-2 border-purple-500 text-purple-500 font-bold py-2 px-4 rounded-full hover:bg-purple-500 hover:text-white transition-all"
                  >
                    Upload New Photo
                  </Label>
                  <Input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <div>
                  <Label htmlFor="name" className="text-gray-300">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-gray-800/50 border-gray-600 text-white mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="headline" className="text-gray-300">
                    Headline
                  </Label>
                  <Input
                    id="headline"
                    name="headline"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    className="bg-gray-800/50 border-gray-600 text-white mt-1"
                    placeholder="e.g., Senior Frontend Developer"
                  />
                </div>
              </div>
            </GlassCard>

            {/* About Card */}
            <GlassCard className="p-8">
              <h2 className="text-2xl font-bold mb-6">About</h2>
              <Textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="bg-gray-800/50 border-gray-600 text-white min-h-[150px]"
                placeholder="Tell us about yourself..."
              />
            </GlassCard>

            {/* Contact & Location Card */}
            <GlassCard className="p-8">
              <h2 className="text-2xl font-bold mb-6">Contact & Location</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="bg-gray-800/50 border-gray-600 text-white mt-1"
                    placeholder="e.g., Malang, East Java"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-gray-800/50 border-gray-600 text-white mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input
                    id="occupation"
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    className="bg-gray-800/50 border-gray-600 text-white mt-1"
                    placeholder="e.g., Software Engineer, Student"
                  />
                </div>
                <div>
                  <Label htmlFor="social_media_url">Social Media URL</Label>
                  <Input
                    id="social_media_url"
                    value={social_media_url}
                    onChange={(e) => setSocialMediaUrl(e.target.value)}
                    className="bg-gray-800/50 border-gray-600 text-white mt-1"
                    placeholder="https://linkedin.com/in/your-profile"
                  />
                </div>
                <div>
                  <Label htmlFor="working_papers_url">Working Papers URL</Label>
                  <Input
                    id="working_papers_url"
                    value={working_papers_url}
                    onChange={(e) => setWorkingPapersUrl(e.target.value)}
                    className="bg-gray-800/50 border-gray-600 text-white mt-1"
                    placeholder="https://example.com/your-cv.pdf"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="bg-gray-800/50 border-gray-600 text-white mt-1"
                  />
                </div>
              </div>
            </GlassCard>

            {/* Skills Card */}
            <GlassCard className="p-8">
              <h2 className="text-2xl font-bold mb-6">Skills</h2>
              <SkillInput skills={skills} setSkills={setSkills} />
            </GlassCard>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-4">
              <Button
                variant="outline"
                onClick={() => router.back()}
                className="border-purple-500 text-purple-500 hover:bg-purple-500/10 hover:text-purple-400"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-[0_0_15px_rgba(159,84,255,0.5)] w-36 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </div>

          {/* --- RIGHT COLUMN (Contextual Sidebar) --- */}
          <div className="lg:col-span-1 flex flex-col gap-8">
            {/* Live Preview Card */}
            <GlassCard className="p-6 sticky top-8">
              <h2 className="text-xl font-bold mb-4">Profile Preview</h2>
              <div className="flex flex-col items-center text-center">
                <Image
                  src={profilePicture || "/images/default-logo.svg"}
                  alt="Preview"
                  width={80}
                  height={80}
                  className="rounded-full object-cover mb-4"
                />
                <h3 className="font-bold text-lg">{name}</h3>
                <p className="text-sm text-purple-400">{headline}</p>
                <p className="text-xs text-gray-400 mt-4 max-w-xs truncate">
                  {about}
                </p>
                <div className="flex flex-wrap gap-2 mt-4 justify-center">
                  {skills.slice(0, 5).map((skill) => (
                    <span
                      key={skill.id}
                      className="bg-purple-500/20 text-purple-300 text-xs font-medium px-2.5 py-0.5 rounded-full"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>

            {/* Profile Completeness Card */}
            <GlassCard className="p-6 sticky top-[calc(24rem+2rem)]">
              <h2 className="text-xl font-bold mb-4">Profile Strength</h2>
              <div className="flex items-center gap-4">
                <div className="relative w-24 h-24">
                  <svg className="w-full h-full" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="54"
                      fill="none"
                      stroke="#333"
                      strokeWidth="12"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="54"
                      fill="none"
                      stroke="#9F54FF"
                      strokeWidth="12"
                      strokeDasharray={2 * Math.PI * 54}
                      strokeDashoffset={
                        2 * Math.PI * 54 * (1 - profileCompleteness / 100)
                      }
                      transform="rotate(-90 60 60)"
                      style={{ transition: "stroke-dashoffset 0.5s ease" }}
                    />
                  </svg>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-white">
                    {profileCompleteness}%
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-lg">
                    {profileCompleteness < 100 ? "Keep going!" : "Excellent!"}
                  </p>
                  <p className="text-sm text-gray-400">
                    Complete your profile to stand out.
                  </p>
                </div>
              </div>
              <ul className="text-sm text-gray-400 mt-4 space-y-1">
                <li
                  className={`${name ? "text-green-400" : ""} flex items-center`}
                >
                  <span className={`mr-2 ${name ? "line-through" : ""}`}>
                    Add your name
                  </span>{" "}
                  {name && "✓"}
                </li>
                <li
                  className={`${headline ? "text-green-400" : ""} flex items-center`}
                >
                  <span className={`mr-2 ${headline ? "line-through" : ""}`}>
                    Add a headline
                  </span>{" "}
                  {headline && "✓"}
                </li>
                <li
                  className={`${about ? "text-green-400" : ""} flex items-center`}
                >
                  <span className={`mr-2 ${about ? "line-through" : ""}`}>
                    Write an about section
                  </span>{" "}
                  {about && "✓"}
                </li>
                <li
                  className={`${skills.length > 0 ? "text-green-400" : ""} flex items-center`}
                >
                  <span
                    className={`mr-2 ${skills.length > 0 ? "line-through" : ""}`}
                  >
                    Add your skills
                  </span>{" "}
                  {skills.length > 0 && "✓"}
                </li>
              </ul>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
async function createSignedUploadUrl(
  name: string,
  type: string,
): Promise<
  { error: string } | { success: { signedUrl: string; path: string } }
> {
  const res = await fetch("/api/upload/profile-picture-signed-url", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, type }),
  });

  if (!res.ok) {
    return { error: "Failed to get signed upload URL." };
  }

  const data = await res.json();
  // Expecting: { success: { signedUrl: string, path: string } }
  if (data.success) {
    return { success: data.success };
  }
  return { error: data.error || "Unknown error getting signed URL." };
}
