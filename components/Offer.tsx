import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Offer = () => {
  return (
    <section className='flex flex-col md:flex-row gap-10 mb-30 bg-[#f0f0f2] mt-10 p-8 pb-0 rounded-3xl shadow-2xl border border-gray-300'>
  
  {/* Text Side */}
  <div className='text-black flex-1 space-y-6 md:mb-0'>
    <h2 className="text-4xl sm:text-5xl font-medium">Get the deal</h2>
    <p className="text-gray-600 w-full">Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.</p>

    {/* Countdown Box */}
    <div className='flex flex-col  md:flex-row  gap-3 mb-10'>
      <div className='bg-[#e6e7e6] rounded-xl text-center  p-2 sm:p-7 sm:w-28 w-80'>
        <p className='text-2xl sm:text-3xl'>18</p>
        <p className='text-sm'>Hour</p>
      </div>
      <div className='bg-[#e6e7e6] rounded-xl text-center p-2 sm:p-7  sm:w-28 w-80'>
        <p className='text-2xl sm:text-3xl'>15</p>
        <p className='text-sm'>Mins</p>
      </div>
      <div className='bg-[#e6e7e6] rounded-xl text-center p-2 sm:p-7 sm:w-28 w-80'>
        <p className='text-2xl sm:text-3xl'>10</p>
        <p className='text-sm'>Secs</p>
      </div>
    </div>

    {/* CTA Button */}
    <Link href={'/shop'} className='bg-black text-white py-3 px-6 rounded-3xl inline-block w-full max-w-xs text-center'>
      View Sales Product
    </Link>
  </div>

  {/* Image Side */}
  <div className='flex-1 flex items-center justify-center'>
    <Image
      src={'/offer.png'}
      alt='hero'
      width={1000}
      height={1000}
      className='w-full h-auto max-w-md md:max-w-full'
    />
  </div>

</section>

  
  )
}

export default Offer
