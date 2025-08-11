import Image from 'next/image'

import React from 'react'
import {CardTypes} from '@/lib/types'

const Card = ({image, title, desc,}: CardTypes) => {
  return (
    <section  className='relative w-full md:w-1/2 '>
        <Image src={image} alt='card' width={1000} height={1000} className='w-full rounded-4xl mt-10 lg:h-[80vh]  h-[50vh] hover:scale-110 transition duration-300'/>
        <div className='absolute left-0 right text-black flex flex-col items-center bottom-6 gap-3 w-full'>
            <div className='text-center'>
                <h6 className="lg:text-3xl text-xl font-bold pb-4">{title}</h6>
                <p className='lg:text-xl  text-sm  '>{desc}</p>
            </div>
           
        </div>
    </section>
  )
}

export default Card
