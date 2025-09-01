'use client';

import { useState } from 'react';
import { db } from "@/firebase";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from "@tiptap/extension-heading";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import toast from 'react-hot-toast';
import MenuBar from '@/app/dashboard/form/addform/menu-bar'; // default export assumed
import Image from 'next/image';

type Post = {
  id?: string;
  title?: string;
  description?: string;
  detailDescription?: string;
  date?: string;
  image?: string;
};

type AddPostPageProps = {
  postToEdit?: Post | null;
  onClose?: () => void;
};

const AddPostPage = ({ postToEdit, onClose }: AddPostPageProps) => {
  const [title, setTitle] = useState(postToEdit?.title || "");
  const [date, setDate] = useState(postToEdit?.date || "");
  const [image, setImage] = useState<File | null>(null);

  // TipTap editors
  const descriptionEditor = useEditor({
    content: postToEdit?.description || "<p>Write short description...</p>",
    extensions: [
      StarterKit.configure({ heading: false }),
      Heading.configure({ levels: [1, 2, 3] }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight,
    ],
    immediatelyRender: false,
  });

  const detailEditor = useEditor({
    content: postToEdit?.detailDescription || "<p>Write detailed description...</p>",
    extensions: [
      StarterKit.configure({ heading: false }),
      Heading.configure({ levels: [1, 2, 3] }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight,
    ],
    immediatelyRender: false,
  });

  // Upload image to Cloudinary
  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "nextjs_uploads");

    const res = await fetch(`https://api.cloudinary.com/v1_1/dngrdj5bm/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (!data.secure_url) throw new Error("Image upload failed!");
    return data.secure_url;
  };

  // Reset form
  const resetForm = () => {
    setTitle("");
    setDate("");
    setImage(null);
    descriptionEditor?.commands.setContent("<p></p>");
    detailEditor?.commands.setContent("<p></p>");
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let imageUrl = postToEdit?.image || "";
      if (image) {
        imageUrl = await uploadImage(image);
      }

      if (postToEdit?.id) {
        // Update existing post
        await updateDoc(doc(db, "features", postToEdit.id), {
          title,
          date,
          image: imageUrl,
          description: descriptionEditor?.getHTML() || "",
          detailDescription: detailEditor?.getHTML() || "",
        });
        toast.success("Post updated successfully!");
      } else {
        // Add new post
        await addDoc(collection(db, "features"), {
          title,
          date,
          image: imageUrl,
          description: descriptionEditor?.getHTML() || "",
          detailDescription: detailEditor?.getHTML() || "",
          createdAt: new Date(),
        });
        toast.success("Post added successfully!");
      }

      resetForm();
      onClose?.();
    } catch (error) {
      console.error("Error submitting post:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Dialog open={!!postToEdit || undefined} onOpenChange={onClose}>
      <DialogTrigger asChild>
        {!postToEdit && <Button>Add Post</Button>}
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{postToEdit ? "Edit Post" : "Add New Post"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          {/* Old Image Preview */}
          {postToEdit?.image && !image && (
            <div className="mb-2">
              <p className="font-medium">Current Image:</p>
              <Image src={postToEdit.image} alt="Current Post"  width={1000} height={1000} className="w-40 h-40 object-cover rounded" />
            </div>
          )}

          {/* New Image Preview */}
          {image && (
            <div className="mb-2">
              <p className="font-medium">Selected Image Preview:</p>
              <Image src={URL.createObjectURL(image)} alt="New Preview" width={1000} height={1000} className="w-40 h-40 object-cover rounded" />
            </div>
          )}

          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />

          {/* Short Description */}
          {descriptionEditor && (
            <div>
              <label className="font-medium">Short Description</label>
              <MenuBar editor={descriptionEditor} />
              <EditorContent editor={descriptionEditor} className="border p-2 rounded" />
            </div>
          )}

          {/* Detailed Description */}
          {detailEditor && (
            <div>
              <label className="font-medium">Detailed Description</label>
              <MenuBar editor={detailEditor} />
              <EditorContent editor={detailEditor} className="border p-2 rounded" />
            </div>
          )}

          <Button type="submit">{postToEdit ? "Update Post" : "Add Post"}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPostPage;
