"use server";

import { createClient } from "@/lib/supabase/server";

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
}

export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function updateEmail(formData: FormData) {
  const newEmail = formData.get("email") as string;
  if (!newEmail) return { error: "New email is required." };

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ email: newEmail });

  if (error) {
    return { error: `Failed to update email: ${error.message}` };
  }
  return {
    success: "Please check your new email address to confirm the change.",
  };
}

export async function updatePassword(formData: FormData) {
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }
  if (password.length < 6) {
    return { error: "Password must be at least 6 characters long." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return { error: `Failed to update password: ${error.message}` };
  }
  return { success: "Password updated successfully." };
}

export async function deleteAccount() {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Could not authenticate user." };
  }

  // This requires admin privileges and is a complex operation.
  // We need to use a service role key to delete a user from auth.
  // This is a placeholder for the actual implementation which should be handled with extreme care.
  console.log(
    `Request to delete user ${user.id}. This needs a secure admin implementation.`,
  );

  // In a real scenario, you would:
  // 1. Create a Supabase admin client with the service role key.
  // 2. Call `supabaseAdmin.auth.admin.deleteUser(user.id)`
  // 3. In a database transaction, delete all related data from Prisma (Society, Portofolio, etc.)
  // 4. Sign the user out and redirect.

  // For now, we will just return a message.
  return { error: "Account deletion is not yet implemented." };

  /*
  // Example of a real implementation (DO NOT RUN WITHOUT SETUP):
  try {
    // Delete from Prisma DB first in a transaction
    await prisma.$transaction(async (tx) => {
      const society = await tx.society.findUnique({ where: { user_id: user.id } });
      if (society) {
        await tx.portofolio.deleteMany({ where: { society_id: society.id } });
        await tx.positionApplied.deleteMany({ where: { society_id: society.id } });
        await tx.society.delete({ where: { id: society.id } });
      }
      await tx.user.delete({ where: { id: user.id } });
    });

    // Then delete from Supabase auth (requires admin client)
    // const supabaseAdmin = createClient(process.env.SUPABASE_SERVICE_ROLE_KEY);
    // const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(user.id);
    // if (deleteError) throw deleteError;

    await supabase.auth.signOut();
    revalidatePath('/');
    redirect('/');

  } catch (error) {
    return { error: 'Failed to delete account.' };
  }
  */
}
