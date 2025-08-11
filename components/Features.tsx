import React from 'react'
import { Feature } from '@/lib/types'

const Features = ({id, icon, title, description}: Feature) => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10 ">

      {/* Heading */}
      

      {/*Grid layout */}
      <section id = "2" className="bg-white rounded-2xl shadow-sm shadow-gray-500 p-8 text-left hover:shadow-xl transition ">
        <div className="mb-4">{icon}</div>
        <h2 className="text-xl font-bold mb-2 text-black">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </section>

    </section>
  )
}

export default Features
