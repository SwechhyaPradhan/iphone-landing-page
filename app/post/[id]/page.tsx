'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, onSnapshot } from "firebase/firestore";

type Post = {
  id: string;
  title: string;
  description?: string;           // Short description (TipTap HTML)
  detailDescription?: string;    // Long description (TipTap HTML)
  date?: string;
  image?: string;
};

const PostDetail = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { id } = useParams();
  const filterData = posts.find((p) => p.id === id);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "features"), (snapshot) => {
      setPosts(
        snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as Post)
        )
      );
    });
    return () => unsubscribe();
  }, []);

  if (!filterData) return <p className="mt-10 text-center">Loading post...</p>;

  return (
    <section className="mt-10 px-6 md:px-16 lg:px-24">
      {/* Breadcrumb */}
      {/* <p className="text-gray-500 text-sm mb-4">
        Blog / Features / <span className="font-semibold">{filterData.title}</span>
      </p> */}

      <div className="flex flex-col md:flex-row gap-10">
        {/* LEFT: Title + Short Description + Detail Description */}
        <div className="md:w-1/2 overflow-y-auto max-h-[80vh]">
          <p className="uppercase text-gray-500 tracking-wide text-xl">{filterData.date}</p>
          <h1 className="text-4xl md:text-4xl font-bold mt-1">{filterData.title}</h1>

          {filterData.description && (
            <div
              className="text-gray-600 mt-4 leading-relaxed prose prose-sm md:prose md:prose-lg"
              dangerouslySetInnerHTML={{ __html: filterData.description }}
            />
          )}

          {filterData.detailDescription && (
            <div className="mt-6">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">Details</h2>
              <div
                className="text-gray-700 leading-relaxed prose prose-sm md:prose md:prose-lg text-justify"
                dangerouslySetInnerHTML={{ __html: filterData.detailDescription }}
              />
            </div>
          )}
        </div>

        {/* RIGHT: Sticky Image */}
        <div className="md:w-1/2 md:sticky md:top-20 h-[80vh]">
          <div className="relative w-full h-full rounded-4xl overflow-hidden bg-white">
            {filterData.image && (
              <Image
                src={filterData.image}
                alt={filterData.title}
                fill
                className="object-contain rounded-2xl"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostDetail;
