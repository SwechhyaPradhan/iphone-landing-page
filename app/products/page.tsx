'use client'

import React, { useEffect, useState } from "react";
import ProductCard from '@/components/ProductCard';
import { db } from '@/firebase';
import { collection, getDocs } from "firebase/firestore";

type Product = {
  id: string;
  title: string;
  purpose: string;
  originalPrice: number;
  discountPrice: number;
  image?: string;
};

const Page = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const items = snapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<Product, "id">)
        }));
        setProducts(items);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="md:mx-20">
      {/* Other sections like Hero, Tagline, etc. */}

      <div className="grid grid-cols-1 md:grid-cols-3 mb-30">
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              image={p.image || "/placeholder.png"}
              purpose={p.purpose}
              title={p.title}
              discount_price={p.discountPrice.toString()}
              original_price={p.originalPrice.toString()}
            />
          ))
        )}
      </div>

      {/* Other sections like Offer, Features, etc. */}
    </section>
  );
};

export default Page;
