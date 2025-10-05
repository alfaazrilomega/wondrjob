"use client";

import { addPortfolioItem } from "@/app/actions/portfolio";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";

export default function AddPortfolioPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    const result = await addPortfolioItem(formData);
    if (result?.error) {
      setError(result.error);
    }
  };

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            body { background-color: #0E0E10; color: #D9ECFF; }
            .form-input { @apply w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300; }
            .form-label { @apply block text-sm font-medium text-gray-400 mb-2; }
        `,
        }}
      />
      <main className="flex-grow pt-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl shadow-2xl p-8">
            <h1 className="text-2xl font-bold text-white mb-6">
              Add New Portfolio Item
            </h1>
            <form ref={formRef} action={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="skill" className="form-label">
                  Title / Skill
                </label>
                <input
                  type="text"
                  name="skill"
                  id="skill"
                  required
                  className="form-input"
                  placeholder="e.g., React Component Library"
                />
              </div>
              <div>
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  required
                  rows={4}
                  className="form-input"
                  placeholder="A short description of your project..."
                ></textarea>
              </div>
              <div>
                <label htmlFor="file" className="form-label">
                  Project File or Image
                </label>
                <input
                  type="file"
                  name="file"
                  id="file"
                  required
                  className="form-input file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div className="flex justify-end items-center gap-4 pt-4 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-6 py-2.5 rounded-lg text-sm font-semibold text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Add Item
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
