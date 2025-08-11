import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import {CardTypes} from '@/lib/types'

const Hero = ({image, title, desc}: CardTypes) => {
  return (
    <section  className='relative mx-4 md:mx-10'>
      <Image src={image} alt='hero' width={1000} height={1000} className='w-full rounded-2xl mt-6' />
      <div className='absolute text-black bottom-0 left-0 px-10 flex w-full justify-between items-center pb-26 '>
        <div>
          <h2 className=" text-4xl md:text-6xl lg:text-7xl font-bold pb-0 lg:pb-4  ">{title}</h2> 
          <p className="text-base md:text-lg max-w-full md:max-w-lg">{desc}</p>
          </div>
      
          
        
      </div>
    </section>
);
  
}

export default Hero
