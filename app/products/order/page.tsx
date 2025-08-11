'use client'
import React, {useState} from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { collection, addDoc } from 'firebase/firestore' // ✅ Correct import
import { db } from '@/firebase' // ✅ Your Firestore ins


const page = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        city: '',
        address: '',
    });

    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSubmit = async () => {
        const {name, email, phone, city, address} = formData
        // ✅ Simple email regex validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email.trim())) {
        toast.error('Please enter a valid email address')
        return
        }

         // ✅ Check if any field is empty after trimming
        if (!name.trim() || !phone.trim() || !city.trim() || !address.trim()) {
            toast.error('All fields are required')
            return
        }
        setLoading(true)

        try {
            await addDoc(collection(db, 'booking'), formData)

            setFormData({
              email: '',
              name: '',
              phone: '',
              city: '',
              address: ''
            })
            

            
            setSuccess(true)
            toast.success('Form is successfully submitted 🥰🤩')

              // ✅ Optional: clear success after 3s
            setTimeout(() => {
                setSuccess(false)
            }, 3000)

        }catch (error) {
            console.error('Error submitting form 🥺:', error)
            toast.error('Something went wrong 🥺')
          } finally {
            setLoading(false)
          }
    }


  return (
    <section className="flex flex-col  gap-10 w-1/2 ml-90 mb-30 bg-[#f0f0f2] mt-10 p-10 pb-10 rounded-3xl shadow-2xl border-gray-300 border">
        <Toaster position="top-center" reverseOrder={false} /> 
       <div className="text-black  flex flex-col space-y-6 md:mb-0 justify-center items-center">
        <h2 className="md:text-5xl font-medium  sm:text-3xl">Shipping Address</h2>
    

        <>

        <form onSubmit={handleSubmit} className='flex flex-col gap-6 w-full justify-center items-center'>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                className="text-black bg-white border-[#e4e4e4] rounded-lg w-full max-w-md h-[50px] px-4 shadow-md outline-none"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                className="text-black bg-white border-[#e4e4e4] rounded-lg w-full max-w-md h-[50px] px-4 shadow-md outline-none"
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Your phone number"
                value={formData.phone}
                onChange={handleChange}
                className="text-black bg-white border-[#e4e4e4] rounded-lg w-full max-w-md h-[50px] px-4 shadow-md outline-none"
                required
              />
              <input
                type="text"
                name="city"
                placeholder="Your city"
                value={formData.city}
                onChange={handleChange}
                className="text-black bg-white border-[#e4e4e4] rounded-lg w-full max-w-md h-[50px] px-4 shadow-md outline-none"
                required
              />
                 <input
                type="text"
                name="address"
                placeholder="Your address"
                value={formData.address}
                onChange={handleChange}
                className="text-black bg-white border-[#e4e4e4] rounded-lg w-full max-w-md h-[50px] px-4 shadow-md outline-none"
                required
              />
            </form>

            <button type='submit' disabled={loading} className="bg-black text-white rounded-3xl w-1/2 max-w-md h-[50px] px-4">Continue</button>

        </>
        </div>
      
    </section>
  )
}

export default page;
