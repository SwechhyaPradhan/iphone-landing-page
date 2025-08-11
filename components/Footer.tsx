import Image from 'next/image'
import React from 'react'


const Footer = () => {
  return (
    <footer className="bg-white text-black py-10  md:px-20">
        <div className='max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between  md:items-start '>
            {/*Left side logo + paragraph */}
            <div className='space-y-5 '>
                
                   <h2>E-product</h2>
                
                <h2 className='md:text-3xl font-bold w-80 sm:text-lg'>Even more reason to shop with us </h2>
            </div>

          

            {/*Right side logo + paragraph */}
            <div className="flex flex-col items-center sm:flex-row md:space-x-16 space-y-8 ">
                <div >
                    <h4 className='font-semibold text-lg mb-4'>COMPANY</h4>
                    <ul className='text-gray-700 space-y-1'>
                        <li>Products</li>
                        <li>Contact</li>
                        <li>Why us</li>
                        <li>Twitter</li>
                    </ul>
                </div>
                <div>
                    <h4 className='font-semibold text-lg mb-4'>COMPANY</h4>
                    <ul className='text-gray-700 space-y-1'>
                        <li>Products</li>
                        <li>Contact</li>
                        <li>Why us</li>
                        <li>Twitter</li>
                    </ul>
                </div>
                <div>
                    <h4 className='font-semibold text-lg mb-4'>COMPANY</h4>
                    <ul className='text-gray-700 space-y-1'>
                        <li>Products</li>
                        <li>Contact</li>
                        <li>Why us</li>
                        <li>Twitter</li>
                    </ul>
                </div>
                <div>
                    <h4 className='font-semibold text-lg mb-4'>COMPANY</h4>
                    <ul className='text-gray-700 space-y-1'>
                        <li>Products</li>
                        <li>Contact</li>
                        <li>Why us</li>
                        <li>Twitter</li>
                    </ul>
                </div>
            </div>
        </div>

        {/*Bottom Bar */}
        <div className="border-t border-gray-300 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-700 space-y-4 sm:space-y-0 ">
           
           
        </div>

        
        
    </footer>
  )
}

export default Footer
