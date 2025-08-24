'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, onSnapshot } from "firebase/firestore";

type Product = {
  id: string;
  title: string;
  originalPrice: number;
  discountPrice: number;
  purpose: string;
  image: string;
  description: string;
};

const ProductDetail = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { id } = useParams();
  const filterData = products.find((p) => p.id === id);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      setProducts(
        snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as Product)
        )
      );
    });
    return () => unsubscribe();
  }, []);

  if (!filterData) return <p className="mt-10 text-center">Loading product...</p>;

  return (
    <section className="flex flex-col md:flex-row mt-10 mx-4 gap-8">
      {/* ✅ Bigger Image */}
      <div className="md:w-1/2 flex justify-center items-center">
        <div className="w-full h-[60vh] md:h-[40vh]">
          <Image
            src={filterData.image}
            alt={filterData.title}
            width={800}
            height={800}
            className="rounded-2xl w-full h-full object-cover"
          />
        </div>
      </div>

      {/* ✅ Product details */}
      <div className="md:w-1/2 text-black flex flex-col justify-center">
        <p className="text-gray-500">{filterData.purpose}</p>
        <h3 className="text-4xl font-bold">{filterData.title}</h3>

        <div className="flex gap-10 my-4">
          <p className="text-3xl text-red-600 font-semibold">₹{filterData.discountPrice}</p>
          <p className="line-through text-3xl text-[#9CA3AF]">₹{filterData.originalPrice}</p>
        </div>

        {/* ✅ Render TinyMCE description */}
        <div
          className="prose max-w-none mt-4"
          dangerouslySetInnerHTML={{ __html: filterData.description }}
        />

        <div className="flex gap-4 mt-6">
          <Link
            href={`/products/order`}
            className="bg-black text-white text-lg font-medium px-6 py-3 rounded-full hover:scale-110 transition duration-300"
          >
            Order Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
