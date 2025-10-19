'use server';

import { prisma } from '@/lib/lib/db';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

// --- Helper to get current user and society ID ---
async function getUserAndSociety() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const society = await prisma.society.findUnique({
    where: { user_id: user.id },
    select: { id: true },
  });
  if (!society) throw new Error('Society profile not found');

  return { user, society, supabase };
}

// --- CRUD Actions ---

export async function getPortfolioItems() {
  try {
    const { society } = await getUserAndSociety();
    const portfolioItems = await prisma.portofolio.findMany({
      where: { society_id: society.id },
      orderBy: { id: 'desc' },
    });
    return { items: portfolioItems };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'An unknown error occurred' };
  }
}

export async function createPortfolioItem(formData: FormData) {
  try {
    const { society, supabase } = await getUserAndSociety();
    
    const skill = formData.get('skill') as string;
    const description = formData.get('description') as string;
    const file = formData.get('file') as File;

    if (!skill || !description) {
        throw new Error('Title and description are required.');
    }

    if (!file || file.size === 0) {
        throw new Error('A project image is required.');
    }

    // 1. Upload file to Supabase Storage
    const filePath = `${society.id}/${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from('portfolios') // ASSUMPTION: Bucket is named 'portfolios'
      .upload(filePath, file);

    if (uploadError) {
      console.error("Supabase Upload Error:", uploadError);
      throw new Error('Failed to upload image.');
    }

    // 2. Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('portfolios')
      .getPublicUrl(filePath);

    if (!publicUrl) {
        throw new Error('Could not get public URL for the image.');
    }

    // 3. Create record in database
    await prisma.portofolio.create({
      data: {
        skill,
        description,
        file: publicUrl,
        society_id: society.id,
        // The 'url' field is not in the schema yet, so it's omitted
      },
    });

    revalidatePath('/profile/portfolio');
    return { success: true };
  } catch (error) {
    console.error("Create Portfolio Error:", error);
    return { error: error instanceof Error ? error.message : 'An unknown error occurred' };
  }
}

export async function updatePortfolioItem(formData: FormData) {
  try {
    const { society, supabase } = await getUserAndSociety();
    
    const id = Number(formData.get('id'));
    const skill = formData.get('skill') as string;
    const description = formData.get('description') as string;
    const file = formData.get('file') as File | null;

    if (!id) throw new Error('Portfolio item ID is required');

    const updateData: { skill: string; description: string; file?: string } = {
        skill,
        description,
    };

    // If a new file is uploaded, handle the upload and update the file URL
    if (file && file.size > 0) {
        const filePath = `${society.id}/${Date.now()}-${file.name}`;
        const { error: uploadError } = await supabase.storage
            .from('portfolios')
            .upload(filePath, file);

        if (uploadError) throw new Error('Failed to upload new image.');

        const { data: { publicUrl } } = supabase.storage
            .from('portfolios')
            .getPublicUrl(filePath);
        
        if (!publicUrl) throw new Error('Could not get public URL for the new image.');
        
        updateData.file = publicUrl;

        // Optional: Delete old file. For simplicity, we'll skip this for now.
    }

    await prisma.portofolio.update({
      where: { id, society_id: society.id }, // Ensure user can only update their own items
      data: updateData,
    });

    revalidatePath('/profile/portfolio');
    return { success: true };
  } catch (error) {
    console.error("Update Portfolio Error:", error);
    return { error: error instanceof Error ? error.message : 'An unknown error occurred' };
  }
}

export async function deletePortfolioItem(id: number) {
  try {
    const { society, supabase } = await getUserAndSociety();

    if (!id) throw new Error('Portfolio item ID is required');

    // 1. Find the item to get the file path
    const item = await prisma.portofolio.findUnique({
        where: { id, society_id: society.id },
    });

    if (!item) {
        throw new Error('Portfolio item not found or you do not have permission to delete it.');
    }

    // 2. Delete the file from storage
    if (item.file) {
        const urlParts = item.file.split('/');
        const filePath = urlParts.slice(urlParts.indexOf('portfolios') + 1).join('/');
        
        if (filePath) {
            const { error: deleteError } = await supabase.storage.from('portfolios').remove([filePath]);
            if (deleteError) {
                console.error("Supabase Delete Error:", deleteError.message);
                // Don't block DB deletion if file deletion fails, just log it
            }
        }
    }

    // 3. Delete the record from the database
    await prisma.portofolio.delete({ where: { id } });

    revalidatePath('/profile/portfolio');
    return { success: true };
  } catch (error) {
    console.error("Delete Portfolio Error:", error);
    return { error: error instanceof Error ? error.message : 'An unknown error occurred' };
  }
}
