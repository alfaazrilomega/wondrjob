import EditDraftForm from "./EditDraftForm";
import { getCurrentUser } from "@/lib/lib/auth";

export default async function EditHrdJobDraftPage({
  params,
}: {
  params: Promise<{ draftId: string }>;
}) {
  const { draftId } = await params;
  const draftIdNum = parseInt(draftId, 10);
  const user = await getCurrentUser();

  // Basic validation in the server component
  if (isNaN(draftIdNum)) {
    // Or use notFound() from next/navigation
    return (
      <div className="p-8 text-center text-red-400">Invalid Draft ID.</div>
    );
  }

  return <EditDraftForm draftId={draftIdNum} user={user} />;
}
