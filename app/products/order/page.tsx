'use client'

import React, { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/firebase'

const Page = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    address: '',
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // ✅ Prevent page reload

    const { name, email, phone, city, address } = formData

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      toast.error('Please enter a valid email address')
      return
    }

    if (!name.trim() || !phone.trim() || !city.trim() || !address.trim()) {
      toast.error('All fields are required')
      return
    }

    setLoading(true)
    try {
      await addDoc(collection(db, 'booking'), formData)

      setFormData({ name: '', email: '', phone: '', city: '', address: '' })
      toast.success('Form successfully submitted 🥰🤩')
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('Something went wrong 🥺')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="flex flex-col gap-10 w-full max-w-2xl mx-auto mt-10 p-10 rounded-3xl shadow-2xl bg-[#f0f0f2] border border-gray-300">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="text-black flex flex-col space-y-6 items-center">
        <h2 className="text-3xl md:text-5xl font-medium">Shipping Address</h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 w-full items-center"
        >
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            className="text-black bg-white border border-[#e4e4e4] rounded-lg w-full h-[50px] px-4 shadow-md outline-none"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            className="text-black bg-white border border-[#e4e4e4] rounded-lg w-full h-[50px] px-4 shadow-md outline-none"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Your phone number"
            value={formData.phone}
            onChange={handleChange}
            className="text-black bg-white border border-[#e4e4e4] rounded-lg w-full h-[50px] px-4 shadow-md outline-none"
            required
          />
          <input
            type="text"
            name="city"
            placeholder="Your city"
            value={formData.city}
            onChange={handleChange}
            className="text-black bg-white border border-[#e4e4e4] rounded-lg w-full h-[50px] px-4 shadow-md outline-none"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Your address"
            value={formData.address}
            onChange={handleChange}
            className="text-black bg-white border border-[#e4e4e4] rounded-lg w-full h-[50px] px-4 shadow-md outline-none"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white rounded-3xl w-1/2 h-[50px] px-4"
          >
            {loading ? 'Submitting...' : 'Continue'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default Page
