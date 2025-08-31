'use client';

import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AddPostPage from "@/app/dashboard/postdetail/addpostdetail/page"; // your AddPostPage component
import { Button } from "@/components/ui/button";
import Image from "next/image";

type Post = {
  id: string;
  title: string;
  description?: string;
  detailDescription?: string;
  date?: string;
  image?: string;
};

const PostTable = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch posts from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "features"), (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Post)));
    });
    return () => unsubscribe();
  }, []);

  // Delete post
  const handleDeletePost = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "features", id));
      alert("Post deleted successfully!");
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post. Check console.");
    }
  };

  // Open edit dialog
  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setIsDialogOpen(true);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {posts.map((p) => (
            <TableRow key={p.id}>
              <TableCell>
                {p.image && <Image src={p.image} alt={p.title} width={1000} height={1000} className="rounded" />}
              </TableCell>
              <TableCell>{p.title}</TableCell>
              <TableCell>{p.date}</TableCell>
              <TableCell className="flex gap-2 mt-4">
                <Button
                  className="bg-blue-500 text-white"
                  onClick={() => handleEditPost(p)}
                >
                  Edit
                </Button>
                <Button
                  className="bg-red-500 text-white"
                  onClick={() => handleDeletePost(p.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit/Add Dialog */}
      {isDialogOpen && editingPost && (
        <AddPostPage
          postToEdit={editingPost}
          onClose={() => {
            setEditingPost(null);
            setIsDialogOpen(false);
          }}
        />
      )}
    </>
  );
};

export default PostTable;
