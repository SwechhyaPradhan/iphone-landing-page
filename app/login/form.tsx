'use client'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase'
import { useRouter } from 'next/navigation'

const FormPage = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      console.log('Logged in user:', userCredential.user)
      router.push('/dashboard') // redirect after login
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <form onSubmit={onSubmit} className='space-y-12 w-full sm:w-[400px]'>
      <div className='grid w-full item-center gap-1.5'>
        <Label htmlFor="email">Email</Label>
        <Input
          className='w-full'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id='email'
          type='email'
        />
      </div>
      <div className='grid w-full item-center gap-1.5'>
        <Label htmlFor="password">Password</Label>
        <Input
          className='w-full'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id='password'
          type='password'
        />
      </div>
      {error && <Alert>{error}</Alert>}
      <div className='w-full'>
        <Button className='w-full' size="lg">
          Login
        </Button>
      </div>
    </form>
  )
}

export default FormPage
