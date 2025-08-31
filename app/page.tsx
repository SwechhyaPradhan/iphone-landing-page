'use client'
import Card from '@/components/Card'
import Hero from '@/components/Hero'
import Offer from '@/components/Offer'
import ProductCard from '@/components/ProductCard'
import React from 'react'
import {data, product} from "@/lib/data"
import { features } from '@/lib/featuresData'
import Features from '@/components/Features'
import FeatureDetails from '@/components/FeatureDetails'
import { HeadingDetails } from '@/lib/data'
import { featureDetails } from '@/lib/data'
import EmailDetails from '@/components/EmailDetails'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Tagline from '@/components/Tagline'
import { useEffect, useState } from "react";
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

type Post = {
  id: string;
  title: string;
  description: string;
  date?: string;
  image?: string;
};
const page = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);


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

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "features")); // or "posts" collection
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
    <>

      <Hero image='/iphone.jpg' title='Welcome to Tech Haven' desc='Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna.'/>
     
    <section className='md:mx-20'>

    <div className="flex flex-col md:flex-row md:gap-10 md:mb-30 mb-10">
        {data.map((d,id) => (
          <Card key={id} image={d.image}  title= {d.title} desc={d.desc} />
        ))}
      </div >
     
        
        {/* <Tagline title="Our Products" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magn."/>
    
     
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
      </div> */}

<section id="products"
className="pt-[120px] -mt-[120px]" >
  <Tagline 
    title="Our Products" 
    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magn." 
  />

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
</section>



      
      <Offer/>
      
      <section id="features" className="pt-[120px] -mt-[120px]">
      <Tagline title="Our Products" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magn."/>
      <div className="grid grid-cols-1 md:grid-cols-3 md:mb-30 mb-10 ">
        {features.map((f, id) => (
          <Features key={id} id={f.id} icon={f.icon} title={f.title} description={f.description}/>
        ))}
      </div>
      </section>

      <section id="blog" className="pt-[120px] -mt-[120px]">
      <Tagline title="Read With US" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magn."/>
      <div className="grid grid-cols-1 md:grid-cols-3 mb-30 gap-6">
          {posts.length === 0 ? (
            <p>No posts found.</p>
          ) : (
            posts.map((post) => (
              <FeatureDetails
                key={post.id}
                id={post.id}
                image={post.image || "/placeholder.png"}
                title={post.title}
                description={post.description}
                date={post.date || ""}
              />
            ))
          )}
        </div>
      </section>

      <EmailDetails/>
    
    </section>

    </>
    
     
  )
}

export default page
