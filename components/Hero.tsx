import Image from 'next/image'
import React from 'react'
import {CardTypes} from '@/lib/types'

const Hero = ({image, title, desc}: CardTypes) => {
  return (
    <section className='relative md:mx-10 '>
      <Image src={image} alt='hero' width={1000} height={1000}   className="w-full min-h-[600px] object-cover md:h-auto rounded-2xl mt-0"
 />
      <div className='absolute  text-black bottom-0 left-0 px-8 flex w-full justify-between items-center pb-10 '>
        <div className="w-full  sm:max-w-xl sm:text-left ">
          <h2 className=" text-5xl font-bold w-full">{title}</h2> 
          <p className="text-sm  md:text-lg">{desc}</p>
          </div>
      
          
        
      </div>
    </section>
);
  
}

export default Hero
