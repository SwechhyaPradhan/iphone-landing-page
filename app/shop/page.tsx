'use client'

import Image from 'next/image'
import React from 'react'
import { desc } from '@/lib/data'

const Shop = () => {
    const data = desc[0];
   
   console.log(data);
    return (
    <section className='p-10 relative'>
        <Image src={data.image} alt='shop' width={1000} height={1000} className='w-full rounded-2xl mt-6'/>
        <div className='absolute text-black bottom-0 left-0 flex w-full justify-between items-center pb-10 px-140'>
            <div className='text-9xl font-bold text-white'>
                {data.title}
            </div>
        </div>
        <form/>
    </section>
  )
}

export default Shop
