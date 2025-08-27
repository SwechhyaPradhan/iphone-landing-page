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
  description: string;           // Short description (TipTap HTML)
  detailDescription?: string;    // Long description (TipTap HTML)
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
    <section className="mt-10 px-6 md:px-16 lg:px-24">
      {/* Breadcrumb */}
      <p className="text-gray-500 text-sm mb-4">
        Shop / Outdoor / <span className="font-semibold">{filterData.title}</span>
      </p>

      <div className="flex flex-col md:flex-row gap-10">
        {/* LEFT: Image + Detail Description (scrolls normally) */}
        <div className="md:w-1/2">
          <div className="w-full h-full">
          <div className="relative w-full h-[600px] rounded-2xl overflow-hidden bg-white mb-20">
          <Image
            src={filterData.image}
            alt={filterData.title}
            fill
            className="object-contain"
          />
        </div>


            {/* Detail Description BELOW the image */}
            {filterData.detailDescription && (
              <div className="mt-10">
                <h2 className="text-xl md:text-4xl font-semibold text-gray-900 mb-4">Description</h2>
                <div
                  className="text-gray-700 leading-relaxed prose prose-sm md:prose md:prose-lg text-justify"
                  dangerouslySetInnerHTML={{ __html: filterData.detailDescription }}
                />
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Sticky panel (title, price, short description, CTA) */}
        <div className="md:w-1/2 md:sticky md:top-20 h-fit self-start">
        <p className="uppercase text-gray-500 tracking-wide text-sm">
          Advanced
        </p>

        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-1">
          {filterData.title}
        </h3>

        <div className="flex gap-10 my-4 items-baseline">
          <p className="text-2xl md:text-3xl font-semibold text-black">
            ${filterData.discountPrice} USD
          </p>
          <p className="line-through text-2xl md:text-3xl text-gray-400">
            ${filterData.originalPrice} USD
          </p>
        </div>


          {/* Short Description (sticky side) */}
          <div
            className="text-gray-600 mt-4 leading-relaxed prose prose-sm md:prose md:prose-lg"
            dangerouslySetInnerHTML={{ __html: filterData.description }}
          />

          <div className="flex gap-4 items-center mt-6">
            <Link
              href={`/products/order`}
              className="bg-black text-white text-lg font-medium px-8 py-3 rounded-full hover:scale-105 transition duration-300 flex items-center gap-2"
            >
              Order Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
