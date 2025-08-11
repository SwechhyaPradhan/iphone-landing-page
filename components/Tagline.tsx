import { HeadingList } from '@/lib/types'
import React from 'react'

const Tagline = ({ title, description}: HeadingList) => {
  return (
    <div  className="text-center">

        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">{title}</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
      
    </div>
  )
}

export default Tagline
