import React from 'react'
import Link from 'next/link'
import FormPage from './form'

const LoginPage = () => {
  return (
    <div className='h-screen w-screen flex justify-center items-center bg-slate-100'>
        <div className='sm:shadow-xl px-8 pt-12 sm:bg-white rounded-xl space-y-12'>
            <h1 className='font-semibold text-2xl'>Login</h1>
            <FormPage/>
            <p className='text-centers'>
                
                Needs to create an account? {' '}
                <Link className="text-indigo-500 hover:underline" href={'/'}>Create account</Link>{' '}
            </p>
        </div>
      
    </div>
  )
}

export default LoginPage
