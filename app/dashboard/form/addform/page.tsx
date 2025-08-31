'use client';

import { useState } from 'react';
import { db } from "@/firebase";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import MenuBar from './menu-bar';
import Heading from "@tiptap/extension-heading";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import toast from 'react-hot-toast';
import Image from 'next/image';


type Product = {
  id?: string;
  title: string;
  originalPrice: number;
  discountPrice: number;
  purpose: string;
  image: string;
  description?: string;
  detailDescription?: string;
};

type AddFormPageProps = {
  productToEdit?: Product | null;
  onClose?: () => void;
};

const Page = ({ productToEdit, onClose }: AddFormPageProps) => {
  const [title, setTitle] = useState(productToEdit?.title || "");
  const [originalPrice, setOriginalPrice] = useState(productToEdit?.originalPrice.toString() || "");
  const [discountPrice, setDiscountPrice] = useState(productToEdit?.discountPrice.toString() || "");
  const [purpose, setPurpose] = useState(productToEdit?.purpose || "");
  const [image, setImage] = useState<File | null>(null);

  // Tiptap editors
  const descriptionEditor = useEditor({
    content: productToEdit?.description || "<p>Write product description...</p>",
    extensions: [
      StarterKit.configure({ heading: false }),
      Heading.configure({ levels: [1, 2, 3] }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight,
    ],
    immediatelyRender: false,
  });

  const detailEditor = useEditor({
    content: productToEdit?.detailDescription || "<p>Write detailed description...</p>",
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
    setOriginalPrice("");
    setDiscountPrice("");
    setPurpose("");
    setImage(null);
    descriptionEditor?.commands.setContent('');
    detailEditor?.commands.setContent('');
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let imageUrl = productToEdit?.image || "";

      if (image) {
        imageUrl = await uploadImage(image);
      }
      if (productToEdit?.id) {
        // Update existing product
        await updateDoc(doc(db, "products", productToEdit.id), {
          title,
          originalPrice: Number(originalPrice),
          discountPrice: Number(discountPrice),
          purpose,
          image: imageUrl,
          description: descriptionEditor?.getHTML() || "",
          detailDescription: detailEditor?.getHTML() || "",
        });
        toast.success("Product updated successfully!");
      } else {
        // Add new product
        await addDoc(collection(db, "products"), {
          title,
          originalPrice: Number(originalPrice),
          discountPrice: Number(discountPrice),
          purpose,
          image: imageUrl,
          description: descriptionEditor?.getHTML() || "",
          detailDescription: detailEditor?.getHTML() || "",
          createdAt: new Date(),
        });
        toast.success("Product added successfully!");
      }
      

      resetForm();
      onClose?.();
    } catch (error) {
      console.error("Error submitting product:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <Dialog open={!!productToEdit || undefined} onOpenChange={onClose}>
      <DialogTrigger asChild>
        {!productToEdit && <Button>Add Product</Button>}
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{productToEdit ? "Edit Product" : "Add New Product"}</DialogTitle>
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

          {/* Old Image Preview */}
          {productToEdit?.image && !image && (
            <div className="mb-2">
              <p className="font-medium">Current Image:</p>
              <Image src={productToEdit.image} alt="Current Product" width={1000} height={1000} className="w-40 h-40 object-cover rounded" />
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
              <label className="font-medium">Description</label>
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

          <Button type="submit">{productToEdit ? "Update Product" : "Add Product"}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Page;
