'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { collection, addDoc } from 'firebase/firestore' // ✅ Correct import
import { db } from '@/firebase' // ✅ Your Firestore instance
import { Toaster, toast } from 'react-hot-toast'

const EmailDetails = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    message: '',
  })

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
    const { email, name, phone, message } = formData

    // ✅ Simple email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      toast.error('Please enter a valid email address')
      return
    }

    // ✅ Check if any field is empty after trimming
    if (!name.trim() || !phone.trim() || !message.trim()) {
      toast.error('All fields are required')
      return
    }

    setLoading(true)

    try {
      await addDoc(collection(db, 'store'), formData)

      setFormData({
        email: '',
        name: '',
        phone: '',
        message: '',
      })

      setSuccess(true)
      toast.success('Form is successfully submitted 🥰🤩')

      // ✅ Optional: clear success after 3s
      setTimeout(() => {
        setSuccess(false)
      }, 3000)
    } catch (error) {
      console.error('Error submitting form 🥺:', error)
      toast.error('Something went wrong 🥺')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id= '4' className="flex flex-col md:flex-row gap-10 mb-20 md:mb-0 md:mt-0 mt-5 bg-[#f0f0f2]  p-8 md:p-0 pb-0 rounded-3xl shadow-2xl border-gray-300 border">
      <Toaster position="top-center" reverseOrder={false} /> {/* ✅ Toast renderer */}

      <div className="text-black flex-1 space-y-6 md:mb-0 p-16">
        <h2 className="md:text-5xl font-medium sm:text-3xl">Contact with Us</h2>
        

        <div className="flex flex-col gap-6">
          {success ? (
            <p className="text-green-600 text-lg font-semibold">
              🎉 Email submitted successfully!
            </p>
          ) : (
            <>
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
                name="message"
                placeholder="Your message"
                value={formData.message}
                onChange={handleChange}
                className="text-black bg-white border-[#e4e4e4] rounded-lg w-full max-w-md h-[50px] px-4 shadow-md outline-none"
                required
              />
            </>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-black text-white rounded-3xl w-full max-w-md h-[50px] px-4"
          >
            {loading ? 'Please wait...' : 'Submit'}
          </button>
        </div>
      </div>

      <div className="flex-1 flex ">
        <Image
          src={'/contact.jpg'}
          alt="hero"
          width={1000}
          height={1000}
          className="w-full max-w-md md:max-w-full"
        />
      </div>
    </section>
  )
}

export default EmailDetails
