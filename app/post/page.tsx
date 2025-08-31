'use client'

import React, { useEffect, useState } from "react";
import FeatureDetails from '@/components/FeatureDetails'; // Your component
import { db } from '@/firebase';
import { collection, getDocs } from "firebase/firestore";

type Post = {
  id: string;
  title: string;
  description?: string;           // Short description
  detailDescription?: string;    // Long description
  date?: string;
  image?: string;
};

const Page = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "features"));
        const items = snapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<Post, "id">)
        }));
        setPosts(items);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="md:mx-20">
      {/* Render posts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-30">
        {posts.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          posts.map((p) => (
            <FeatureDetails
              key={p.id}
              id={p.id}
              image={p.image || "/placeholder.png"}
              title={p.title || ""}
              description={p.description || ""}
              date={p.date || ""}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default Page;
