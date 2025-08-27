'use client';

import { useState } from 'react';
import { db } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import MenuBar from './menu-bar';
import Heading from "@tiptap/extension-heading";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";

const AddFormPage = () => {
  const [title, setTitle] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [purpose, setPurpose] = useState("");
  const [image, setImage] = useState<File | null>(null);

  // ✅ Editor for short description
  const descriptionEditor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false }),
      Heading.configure({ levels: [1, 2, 3] }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight,
    ],
    content: "<p>Write product description...</p>",
    immediatelyRender: false,
  });

  // ✅ Editor for detailed description
  const detailEditor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false }),
      Heading.configure({ levels: [1, 2, 3] }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight,
    ],
    content: "<p>Write detailed description...</p>",
    immediatelyRender: false,
  });

  // ✅ Upload image to Cloudinary
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

  // ✅ Reset form after submit
  const resetForm = () => {
    setTitle("");
    setOriginalPrice("");
    setDiscountPrice("");
    setPurpose("");
    setImage(null);
    descriptionEditor?.commands.setContent('');
    detailEditor?.commands.setContent('');
  };

  // ✅ Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return alert("Please select an image");

    try {
      const imageUrl = await uploadImage(image);

      await addDoc(collection(db, "products"), {
        title,
        originalPrice: Number(originalPrice),
        discountPrice: Number(discountPrice),
        purpose,
        image: imageUrl,
        description: descriptionEditor?.getHTML() || "", // short description
        detailDescription: detailEditor?.getHTML() || "", // long description
        createdAt: new Date(),
      });

      resetForm();
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Something went wrong! Check console.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Product</Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input
            placeholder="Product Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Input
            type="number"
            placeholder="Original Price"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            required
          />
          <Input
            type="number"
            placeholder="Discounted Price"
            value={discountPrice}
            onChange={(e) => setDiscountPrice(e.target.value)}
            required
          />
          <Input
            placeholder="Purpose (e.g. home, decor, etc.)"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            required
          />
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            required
          />

          {/* ✅ Short Description */}
          {descriptionEditor && (
            <div>
              <label className="font-medium">Description</label>
              <MenuBar editor={descriptionEditor} />
              <EditorContent editor={descriptionEditor} className="border p-2 rounded" />
            </div>
          )}

          {/* ✅ Detailed Description */}
          {detailEditor && (
            <div>
              <label className="font-medium">Detailed Description</label>
              <MenuBar editor={detailEditor} />
              <EditorContent editor={detailEditor} className="border p-2 rounded" />
            </div>
          )}

          <Button type="submit">Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddFormPage;
