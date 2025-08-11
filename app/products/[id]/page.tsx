'use client'

import { product } from '@/lib/data'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'

const ProductDetail = () => {
    const  {id}  = useParams()
    const data = product.filter(p => p.id.toString() === id);
    const filterData = data[0]
  return (
    <section className='flex mt-10 mx-4 gap-6'>
        <Image src={filterData.image} alt="phone" width={1000} height={1000} className='rounded-4xl'/>

        <div className='text-black '>
            <div >
                <p>{filterData.purpose}</p>
                <h3 className='text-4xl font-bold'>{filterData.title}</h3>
                <div className='flex gap-10 my-4'>
                <p className='text-3xl '>{filterData.original_price}</p>
            <p className='line-through text-3xl text-[#D1D5DB]'>{filterData.original_price}</p>
                </div>
                <p>{filterData.desc}

                </p>

                <div className='flex  gap-4 mt-4 '>
                    
                    <Link href={`/products/order`} className=' bg-black text-white text-lg font-medium px-6 py-3 rounded-full hover:scale-110 transition duration-300'>Order Now</Link>
                </div>
                
            </div>
        </div>


    </section>
  )
}

export default ProductDetail
