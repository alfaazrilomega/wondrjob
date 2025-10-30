/* eslint-disable prettier/prettier */
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createJobDraft } from "@/actions/jobDrafts";
import { getSkills } from "@/actions/skills";

interface Skill {
  id: number;
  name: string;
  category: string;
}

export default function CreateJobDraftPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [skillInput, setSkillInput] = useState("");

  const [formData, setFormData] = useState({
    position_name: "",
    department: "",
    location: "",
    capacity: 1,
    salaryMin: "",
    salaryMax: "",
    description: "",
    submission_start_date: "",
    submission_end_date: "",
    jobType: "FULL_TIME",
    workStyle: "ON_SITE",
  });

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const skillsData = await getSkills();
        setSkills(skillsData);
      } catch (error) {
        console.error("Failed to fetch skills:", error);
      }
    };
    fetchSkills();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillAdd = (skill: Skill) => {
    if (!selectedSkills.find((s) => s.id === skill.id)) {
      setSelectedSkills((prev) => [...prev, skill]);
    }
    setSkillInput("");
  };

  const handleSkillRemove = (skillId: number) => {
    setSelectedSkills((prev) => prev.filter((s) => s.id !== skillId));
  };

  const handleSkillInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const skillName = skillInput.trim();
      if (skillName) {
        // Check if skill already exists
        const existingSkill = skills.find(
          (s) => s.name.toLowerCase() === skillName.toLowerCase(),
        );
        if (existingSkill) {
          handleSkillAdd(existingSkill);
        } else {
          // Create new skill
          const newSkill = {
            id: Date.now(),
            name: skillName,
            category: "Custom",
          };
          setSkills((prev) => [...prev, newSkill]);
          handleSkillAdd(newSkill);
        }
      }
    }
  };

  const filteredSkills = skills.filter(
    (skill) =>
      skill.name.toLowerCase().includes(skillInput.toLowerCase()) &&
      !selectedSkills.find((s) => s.id === skill.id),
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await createJobDraft({
        ...formData,
        capacity: Number(formData.capacity),
        salaryMin: formData.salaryMin ? Number(formData.salaryMin) : undefined,
        salaryMax: formData.salaryMax ? Number(formData.salaryMax) : undefined,
        submission_start_date: new Date(formData.submission_start_date),
        submission_end_date: new Date(formData.submission_end_date),
        skillIds: selectedSkills.map((s) => s.id),
      });

      if (result.success) {
        alert("Job draft created successfully!");
        router.push("/dashboard/hrd");
      } else {
        alert(`Failed to create job draft: ${result.error}`);
      }
    } catch (error) {
      console.error("Error creating job draft:", error);
      alert("An error occurred while creating the job draft.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 md:p-12 text-gray-200">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Create Job Draft</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-[#1e1e24] rounded-lg shadow-lg p-8 border border-gray-700"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Position Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Position Name *
              </label>
              <input
                type="text"
                name="position_name"
                value={formData.position_name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., Senior React Developer"
              />
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Department
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., Technology"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., Malang, Remote"
              />
            </div>

            {/* Job Type */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Job Type *
              </label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="FULL_TIME">Full-Time</option>
                <option value="PART_TIME">Part-Time</option>
                <option value="CONTRACT">Contract</option>
                <option value="INTERNSHIP">Internship</option>
              </select>
            </div>

            {/* Work Style */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Work Style *
              </label>
              <select
                name="workStyle"
                value={formData.workStyle}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="ON_SITE">On-Site</option>
                <option value="HYBRID">Hybrid</option>
                <option value="REMOTE">Remote</option>
              </select>
            </div>

            {/* Capacity */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Capacity *
              </label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleInputChange}
                min="1"
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Salary Range */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Salary Range (Optional)
              </label>
              <div className="flex gap-4">
                <input
                  type="number"
                  name="salaryMin"
                  value={formData.salaryMin}
                  onChange={handleInputChange}
                  placeholder="Min"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="number"
                  name="salaryMax"
                  value={formData.salaryMax}
                  onChange={handleInputChange}
                  placeholder="Max"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Skills */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Skills
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleSkillInputKeyDown}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Type skill name and press Enter..."
                />
                {skillInput && filteredSkills.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-600 rounded-md shadow-lg max-h-40 overflow-y-auto">
                    {filteredSkills.map((skill) => (
                      <div
                        key={skill.id}
                        onClick={() => handleSkillAdd(skill)}
                        className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-white"
                      >
                        {skill.name}{" "}
                        <span className="text-gray-400">
                          ({skill.category})
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {selectedSkills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedSkills.map((skill) => (
                    <span
                      key={skill.id}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-600 text-white"
                    >
                      {skill.name}
                      <button
                        type="button"
                        onClick={() => handleSkillRemove(skill.id)}
                        className="ml-2 text-purple-200 hover:text-white"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={6}
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Job description and requirements..."
              />
            </div>

            {/* Submission Dates */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Submission Start Date *
              </label>
              <input
                type="date"
                name="submission_start_date"
                value={formData.submission_start_date}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Submission End Date *
              </label>
              <input
                type="date"
                name="submission_end_date"
                value={formData.submission_end_date}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-700">
            <button
              type="button"
              onClick={() => router.push("/dashboard/hrd")}
              className="px-6 py-2 rounded-md text-purple-400 border border-purple-600 hover:bg-purple-600/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-md text-white bg-purple-600 hover:bg-purple-500 font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating..." : "Submit for Approval"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
