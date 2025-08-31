'use client'

import { db } from '@/firebase'
import { collection, getDocs } from 'firebase/firestore'

import React, { useEffect, useState } from 'react'
// import Sidebar from './sidebar/page'
import { auth } from '@/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/navigation'

type Contact = {
  id: string
  name?: string
  email?: string
  phone?: string
  message?: string
}

type Booking = {
  id: string
  name?: string
  email?: string
  phone?: string
  city?: string
  address?: string
}

const DashboardPage = () => {
  const router = useRouter()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/login') // redirect if not logged in
      } else {
        setUser(currentUser)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        const storeSnapshot = await getDocs(collection(db, 'store'))
        const contactsData = storeSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Contact[]
        setContacts(contactsData)

        const bookingSnapshot = await getDocs(collection(db, 'booking'))
        const bookingData = bookingSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Booking[]
        setBookings(bookingData)
      } catch (err) {
        setError('Failed to fetch data.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <div>Loading data...</div>
  if (error) return <div>{error}</div>

  return (
    <div className="flex min-h-screen bg-gray-100 text-black">
      {/* Sidebar */}
      {/* <Sidebar/> */}

      {/* Main content */}
      <main className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="font-semibold">Total Contacts</h2>
            <p className="text-2xl">{contacts.length}</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="font-semibold">Messages</h2>
            <p className="text-2xl">
              {contacts.filter(c => c.message?.trim() !== '').length}
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="font-semibold">Total Bookings</h2>
            <p className="text-2xl">{bookings.length}</p>
          </div>
        </div>

        {/* Contacts Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-md p-4 mb-6">
          <h2 className="font-semibold mb-2">Contacts</h2>
          <table className="min-w-full border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Name</th>
                <th className="border p-2 text-left">Email</th>
                <th className="border p-2 text-left">Phone</th>
                <th className="border p-2 text-left">Message</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map(({ id, name, email, phone, message }) => (
                <tr key={id} className="hover:bg-gray-50">
                  <td className="border p-2">{name || '—'}</td>
                  <td className="border p-2">{email || '—'}</td>
                  <td className="border p-2">{phone || '—'}</td>
                  <td className="border p-2">{message || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bookings Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-md p-4">
          <h2 className="font-semibold mb-2">Bookings</h2>
          <table className="min-w-full border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Name</th>
                <th className="border p-2 text-left">Email</th>
                <th className="border p-2 text-left">Phone</th>
                <th className="border p-2 text-left">City</th>
                <th className="border p-2 text-left">Address</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(({ id, name, email, phone, city, address }) => (
                <tr key={id} className="hover:bg-gray-50">
                  <td className="border p-2">{name || '—'}</td>
                  <td className="border p-2">{email || '—'}</td>
                  <td className="border p-2">{phone || '—'}</td>
                  <td className="border p-2">{city || '—'}</td>
                  <td className="border p-2">{address || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

export default DashboardPage
