import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { prisma } from "../../../../lib/db";
import { cookies } from "next/headers";
import { EditProfileForm } from "./form";

// This is the main page, a server component that fetches data
// and passes it to the client component form.
export default async function EditProfilePage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const society = await prisma.society.findUnique({
    where: { user_id: user.id },
  });

  if (!society) {
    return (
      <div className="pt-20 text-white text-center">Profile not found.</div>
    );
  }

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            body { background-color: #0E0E10; color: #D9ECFF; }
            .form-input, .form-select { @apply w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300; }
            .form-label { @apply block text-sm font-medium text-gray-400 mb-2; }
            select option { background-color: #0E0E10; color: #D9ECFF; }
        `,
        }}
      />
      <main className="flex-grow pt-12">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl shadow-2xl p-8">
            <h1 className="text-2xl font-bold text-white mb-6">Edit Profile</h1>
            <EditProfileForm society={society} />
          </div>
        </div>
      </main>
    </>
  );
}
