import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/lib/db";

export async function getCompanyId() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const company = await prisma.company.findUnique({
    where: { user_id: user.id },
    select: { id: true },
  });

  return company?.id;
}
