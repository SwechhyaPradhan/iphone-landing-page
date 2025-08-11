import Image from 'next/image'
import React from 'react'
import { ProductList } from '@/lib/types'
import Link from 'next/link'

const ProductCard = ({id, image, purpose, title, discount_price, original_price}: ProductList) => {
  return (
    <section id="1" className='rounded-3xl mt-5 p-4 cursor-pointer transition duration-500 hover:-translate-y-2 '>
        <div className="relative group w-full">
        <Image src={image} alt='iphone' width={1000} height={1000} className=" w-full object-fit rounded-2xl "/>

        <div className="absolute bottom-0 left-0 w-full h-1/3 
                  bg-gradient-to-t from-black to-transparent 
                  opacity-0 group-hover:opacity-60 
                  transition duration-300 rounded-b-2xl">
        </div>

        <Link href={`/products/${id}`} className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 
               transition duration-500 transform bg-white text-black px-10 py-2 rounded-full text-sm  hover:scale-110">Shop Now</Link>
        </div>
      
      
        <p className="text-sm text-gray-500">{purpose}</p>
        <h3 className="text-xl font-semibold text-black">{title}</h3>

        <div className="flex gap-4 ">
        <p className="text-black text-lg font-sans">{discount_price}</p>
        <p className="text-[#4E4B51] text-lg line-through font-sans">{original_price}</p>
        </div> 
    </section>
  )
}

export default ProductCard
