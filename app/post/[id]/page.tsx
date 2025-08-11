'use client'
import React from 'react'
import { Facebook, Twitter, Linkedin } from 'lucide-react'
import Image from 'next/image'
import { featureDetails } from '@/lib/data'
import { useParams } from 'next/navigation'


const page = () => {
    const{id} = useParams()
    const data = featureDetails.filter(p => p.id.toString() === id);
    const filterData = data[0]
  return (
    <section className='mt-10 flex flex-col space-y-5 mx-6'>
        <p className='text-sm text-black'>{filterData.date}</p>
        <h2 className='text-4xl text-black font-bold w-[500px]'>{filterData.title}</h2>
        <p className='text-black w-[600px] font-sans'>{filterData.description}</p>
        <div className="flex space-x-4">
        <Facebook className="w-6 h-6 text-white rounded-md bg-black" />
        <Twitter className="w-6 h-6  text-white rounded-md bg-black" />
        <Linkedin className="w-6 h-6  text-white rounded-md bg-black" />
        </div>
        <Image src={filterData.image} alt='alexa' width={1000} height={1000} className='rounded-4xl h-[750px] object-cover'/>
    </section>
  )
}

export default page
