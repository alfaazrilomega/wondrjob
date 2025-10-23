"use client";

import { updateUserProfile } from "@/app/actions/user";
import { useState, useTransition } from "react";
import { Society, Skill } from "@prisma/client";
import SkillInput from "@/app/Component/SkillInput";

export function EditProfileForm({
  profile,
}: {
  profile: { society: Society; skills: Skill[] };
}) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [skills, setSkills] = useState<Skill[]>(profile.skills || []);

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const skillIds = skills.map((skill) => skill.id);
      formData.append("skills", JSON.stringify(skillIds));
      const result = await updateUserProfile(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  };

  return (
    <form action={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="form-label">
          Full Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="form-input"
          defaultValue={profile.society.name}
          required
        />
      </div>
      <div>
        <label htmlFor="headline" className="form-label">
          Headline
        </label>
        <input
          type="text"
          name="headline"
          id="headline"
          className="form-input"
          defaultValue={profile.society.headline || ""}
          placeholder="e.g., Full Stack Developer"
        />
      </div>
      <div>
        <label htmlFor="phone" className="form-label">
          Phone
        </label>
        <input
          type="tel"
          name="phone"
          id="phone"
          className="form-input"
          defaultValue={profile.society.phone}
        />
      </div>
      <div>
        <label htmlFor="address" className="form-label">
          Address
        </label>
        <textarea
          name="address"
          id="address"
          rows={3}
          className="form-input"
          defaultValue={profile.society.address}
        ></textarea>
      </div>
      <div>
        <label htmlFor="location" className="form-label">
          Location
        </label>
        <input
          type="text"
          name="location"
          id="location"
          className="form-input"
          defaultValue={profile.society.location || ""}
          placeholder="e.g., Neo-City, Cyberspace"
        />
      </div>
      <div>
        <label htmlFor="gender" className="form-label">
          Gender
        </label>
        <select
          name="gender"
          id="gender"
          className="form-select"
          defaultValue={profile.society.gender || ""}
        >
          <option value="">Prefer not to say</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="skills" className="form-label">
          Skills
        </label>
        <SkillInput skills={skills} setSkills={setSkills} />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex justify-end items-center gap-4 pt-4 border-t border-gray-800">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-6 py-2.5 rounded-lg text-sm font-semibold text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
        >
          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
