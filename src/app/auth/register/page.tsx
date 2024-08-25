'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import Link from 'next/link'

export default function Component() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted', { name, email, password, confirmPassword, agreeTerms })
  }

  return (
    <div className='min-h-screen bg-gray-900 flex items-center justify-center p-4'>
      <div className='max-w-md w-full bg-gray-800 rounded-lg shadow-md overflow-hidden'>
        <div className='p-6 sm:p-8'>
          <h2 className='text-2xl font-semibold text-gray-100 mb-6 text-center'>
            Create an Account
          </h2>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='name' className='text-sm font-medium text-gray-300'>
                Full Name
              </Label>
              <Input
                id='name'
                placeholder='Enter your full name'
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='w-full px-3 py-2 bg-gray-700 border border-gray-600 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500'
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='email' className='text-sm font-medium text-gray-300'>
                Email
              </Label>
              <Input
                id='email'
                placeholder='Enter your email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full px-3 py-2 bg-gray-700 border border-gray-600 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500'
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='password' className='text-sm font-medium text-gray-300'>
                Password
              </Label>
              <Input
                id='password'
                placeholder='Create a password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full px-3 py-2 bg-gray-700 border border-gray-600 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500'
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='confirm-password' className='text-sm font-medium text-gray-300'>
                Confirm Password
              </Label>
              <Input
                id='confirm-password'
                placeholder='Confirm your password'
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className='w-full px-3 py-2 bg-gray-700 border border-gray-600 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500'
                required
              />
            </div>
            <div className='flex items-center'>
              <Checkbox
                id='terms'
                checked={agreeTerms}
                onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                className='h-4 w-4 text-gray-300 focus:ring-gray-500 border-gray-600 rounded'
              />
              <label htmlFor='terms' className='ml-2 block text-sm text-gray-300'>
                I agree to the{' '}
                <a href='#' className='text-gray-100 hover:underline'>
                  Terms and Conditions
                </a>
              </label>
            </div>
            <Button
              type='submit'
              className='w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out'
              disabled={!agreeTerms}
            >
              Sign Up
            </Button>
          </form>
        </div>
        <div className='px-6 py-4 bg-gray-700 border-t border-gray-600 text-center'>
          <p className='text-sm text-gray-300'>
            Already have an account?{' '}
            <Link href='/auth/login' className='font-medium text-gray-100 hover:underline'>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
