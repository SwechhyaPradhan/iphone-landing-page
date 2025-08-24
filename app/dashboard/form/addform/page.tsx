'use client';

import { useState, useRef } from 'react';
import { db } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Editor } from "@tinymce/tinymce-react";

const AddFormPage = () => {
  const editorRef = useRef<any>(null);

  const [title, setTitle] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [purpose, setPurpose] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState("");

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

  const resetForm = () => {
    setTitle("");
    setOriginalPrice("");
    setDiscountPrice("");
    setPurpose("");
    setImage(null);
    setDescription("");
  };

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
        description,
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

      <DialogContent>
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

          <Editor
            apiKey="oulh0jfjiyaz52kkcwb789y4rmqd5a16cy3ues1mo2bd07wr"
            onInit={(_evt, editor) => (editorRef.current = editor)}
            initialValue="<p>Start writing here...</p>"
            init={{
              height: 400,
              menubar: true,
              plugins: [
                "advlist", "autolink", "lists", "link", "image", "charmap",
                "preview", "anchor", "searchreplace", "visualblocks", "code",
                "fullscreen", "insertdatetime", "media", "table", "help", "wordcount"
              ],
              toolbar:
                "undo redo | blocks | bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | removeformat | help",
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            value={description}
            onEditorChange={(content) => setDescription(content)}
          />

          <Button type="submit">Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddFormPage;
