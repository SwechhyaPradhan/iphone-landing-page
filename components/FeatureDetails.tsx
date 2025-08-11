import Image from 'next/image'
import React from 'react'

import { FeatureList } from '@/lib/types'
import Link from 'next/link'

const FeatureDetails = ({id, image, title, description, date}: FeatureList) => {
  return (
    <section id='3' className=' rounded-3xl  mt-5  p-4 md:p-0 cursor-pointer transition duration-500 hover:-translate-y-2'>
      <div className='relative group w-full'>
        <Link href={`/post/${id}`}>
        <div className=" overflow-hidden rounded-lg ">
        <Image src={image} alt='image'  width={1000} height={1000}  className=" w-full h-full object-cover  duration-300 ease-in-out hover:scale-130 rounded-xl mb-10 "/>
        </div>
        <div className='space-y-2'>
        <h3 className="text-xl font-medium text-black">{title}</h3>
        <p className='text-sm text-black'>{description}</p>
        <p className='md:text-xl text-sm text-black'>{date}</p>
        </div>
        </Link>
      </div>
    </section>
  )
}

export default FeatureDetails
