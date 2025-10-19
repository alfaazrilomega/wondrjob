"use client";

import React, { useState, useEffect, useTransition, useCallback } from "react";
import Image from "next/image";
import {
  getPortfolioItems,
  createPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
} from "@/app/actions/portfolio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Edit, PlusCircle, UploadCloud, X } from "lucide-react";

// --- Types ---
interface PortfolioItem {
  id: number;
  skill: string; // Used as title
  description: string;
  file: string; // Image URL
  url?: string; // Optional project URL
  society_id: number;
}

// --- Reusable Components ---
const GlassCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-2xl shadow-lg h-full ${className}`}
  >
    {children}
  </div>
);

// --- Main Page Component ---
export default function PortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [formMode, setFormMode] = useState<"idle" | "add" | "edit">("idle");
  const [currentItem, setCurrentItem] = useState<PortfolioItem | null>(null);
  const [isPending, startTransition] = useTransition();

  const fetchItems = useCallback(() => {
    startTransition(async () => {
      const result = await getPortfolioItems();
      if (result.items) {
        setItems(result.items);
      } else {
        // You might want a better error handling mechanism like a toast notification
        alert(result.error);
      }
    });
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleAddNew = () => {
    setCurrentItem(null);
    setFormMode("add");
  };

  const handleEdit = (item: PortfolioItem) => {
    setCurrentItem(item);
    setFormMode("edit");
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this project?")) {
      startTransition(async () => {
        await deletePortfolioItem(id);
        fetchItems();
        if (currentItem && currentItem.id === id) {
          setFormMode("idle");
          setCurrentItem(null);
        }
      });
    }
  };

  const handleCancel = () => {
    setFormMode("idle");
    setCurrentItem(null);
  };

  const handleFormSubmit = async (formData: FormData) => {
    startTransition(async () => {
      if (formMode === "edit" && currentItem) {
        formData.append("id", currentItem.id.toString());
        await updatePortfolioItem(formData);
      } else if (formMode === "add") {
        await createPortfolioItem(formData);
      }
      fetchItems();
      setFormMode("idle");
      setCurrentItem(null);
    });
  };

  return (
    <div className="text-white p-4 md:p-8">
      <h1 className="text-4xl font-bold mb-8">Manage Your Portfolio</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column */}
        <div className="lg:flex-[2] xl:flex-[3]">
          <PortfolioGrid
            items={items}
            onAddNew={handleAddNew}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        {/* Right Column */}
        <div className="lg:flex-[1] xl:flex-[2]">
          <FormPanel
            mode={formMode}
            currentItem={currentItem}
            onSubmit={handleFormSubmit}
            onCancel={handleCancel}
            isPending={isPending}
          />
        </div>
      </div>
    </div>
  );
}

// --- Left Column Components ---
function PortfolioGrid({
  items,
  onAddNew,
  onEdit,
  onDelete,
}: {
  items: PortfolioItem[];
  onAddNew: () => void;
  onEdit: (item: PortfolioItem) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <GlassCard className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">All Projects</h2>
        <Button
          onClick={onAddNew}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
        >
          <PlusCircle size={20} />
          Add New Project
        </Button>
      </div>
      {items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {items.map((item) => (
            <ProjectCard
              key={item.id}
              item={item}
              onEdit={() => onEdit(item)}
              onDelete={() => onDelete(item.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-400">
            No portfolio items yet. Add your first project!
          </p>
        </div>
      )}
    </GlassCard>
  );
}

function ProjectCard({
  item,
  onEdit,
  onDelete,
}: {
  item: PortfolioItem;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="relative group bg-gray-800/50 rounded-lg overflow-hidden border border-transparent hover:border-purple-500 transition-all duration-300">
      <Image
        src={item.file}
        alt={item.skill}
        width={400}
        height={300}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg truncate">{item.skill}</h3>
        <p className="text-sm text-gray-400 truncate">{item.description}</p>
      </div>
      <div className="absolute inset-0 bg-black/70 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Button
          variant="outline"
          size="icon"
          onClick={onEdit}
          className="bg-transparent border-gray-500 hover:bg-gray-700 hover:text-white"
        >
          <Edit size={20} />
        </Button>
        <Button
          variant="destructive"
          size="icon"
          onClick={onDelete}
          className="bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white"
        >
          <Trash2 size={20} />
        </Button>
      </div>
    </div>
  );
}

// --- Right Column Components ---
function FormPanel({
  mode,
  currentItem,
  onSubmit,
  onCancel,
  isPending,
}: {
  mode: "idle" | "add" | "edit";
  currentItem: PortfolioItem | null;
  onSubmit: (formData: FormData) => void;
  onCancel: () => void;
  isPending: boolean;
}) {
  if (mode === "idle") {
    return (
      <GlassCard className="flex items-center justify-center p-6">
        <div className="text-center text-gray-400">
          <PlusCircle className="mx-auto mb-4 h-12 w-12" />
          <p>Select a project to edit or</p>
          <p>click &apos;Add New Project&apos; to get started.</p>
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-6">
      <PortfolioForm
        currentItem={currentItem}
        onSubmit={onSubmit}
        onCancel={onCancel}
        isPending={isPending}
      />
    </GlassCard>
  );
}

function PortfolioForm({
  currentItem,
  onSubmit,
  onCancel,
  isPending,
}: {
  currentItem: PortfolioItem | null;
  onSubmit: (formData: FormData) => void;
  onCancel: () => void;
  isPending: boolean;
}) {
  const [preview, setPreview] = useState<string | null>(
    currentItem?.file || null,
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 flex flex-col h-full">
      <h2 className="text-2xl font-semibold">
        {currentItem ? `Edit: ${currentItem.skill}` : "Add New Project"}
      </h2>

      <div className="flex-grow space-y-4 overflow-y-auto pr-2">
        <div>
          <Label htmlFor="skill">Project Title</Label>
          <Input
            id="skill"
            name="skill"
            defaultValue={currentItem?.skill || ""}
            required
            className="bg-gray-800 border-gray-600"
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            defaultValue={currentItem?.description || ""}
            required
            className="bg-gray-800 border-gray-600"
          />
        </div>
        <div>
          <Label htmlFor="url">Project URL (Optional)</Label>
          <Input
            id="url"
            name="url"
            defaultValue={currentItem?.url || ""}
            className="bg-gray-800 border-gray-600"
          />
        </div>
        <div>
          <Label htmlFor="file">Project Image</Label>
          <div className="mt-2 aspect-video w-full bg-gray-800 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center relative">
            {preview ? (
              <>
                <Image
                  src={preview}
                  alt="Preview"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => setPreview(null)}
                  className="absolute top-2 right-2 z-10 h-6 w-6"
                >
                  <X size={16} />
                </Button>
              </>
            ) : (
              <div className="text-center">
                <UploadCloud className="mx-auto h-10 w-10 text-gray-500" />
                <p className="mt-2 text-sm text-gray-400">
                  Click to upload or drag and drop
                </p>
              </div>
            )}
            <Input
              id="file"
              name="file"
              type="file"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept="image/*"
            />
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 flex justify-end gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="border-gray-600 hover:bg-gray-700"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          className="bg-purple-600 hover:bg-purple-700"
        >
          {isPending ? "Saving..." : "Save Project"}
        </Button>
      </div>
    </form>
  );
}
