"use client";

import React, { useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { resetPasswordSchema, ResetPasswordSchemaType } from '@/schema/forgotPassword.s'
import axios from 'axios'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const ResetPasswordPage = () => {
  const router = useRouter()
  const [email, setEmail] = useState<string>('')

  const form = useForm<ResetPasswordSchemaType>({
    defaultValues: {
      email: "",
      newPassword: ""
    },
    resolver: zodResolver(resetPasswordSchema)
  })

  useEffect(() => {
    // Get email from sessionStorage
    const storedEmail = sessionStorage.getItem('resetEmail')
    if (!storedEmail) {
      toast.error("Please start the password reset process again", {
        position: 'top-center',
        duration: 2000
      })
      router.push('/forgot-password')
      return
    }
    setEmail(storedEmail)
    form.setValue('email', storedEmail)
  }, [router, form])

  async function handleResetPassword(values: ResetPasswordSchemaType) {
    try {
      const { data } = await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values)
      console.log(data)

      toast.success("Password reset successfully! Please login with your new password", {
        position: 'top-center',
        duration: 3000
      })

      // Clear stored email
      sessionStorage.removeItem('resetEmail')
      
      // Redirect to login page
      setTimeout(() => {
        router.push('/login')
      }, 1500)

    } catch (error: unknown) {
      console.error("Reset password error:", error)
      const axiosError = error as { response?: { data?: { message?: string } } };
      toast.error(axiosError?.response?.data?.message || "Failed to reset password", {
        position: 'top-center',
        duration: 2000
      })
    }
  }

  return (
    <div className='mx-auto px-5 md:px-0 w-full md:w-1/2 my-12'>
      <h1 className='text-3xl text-center font-bold'>
        Reset Password
      </h1>
      <p className='text-center text-gray-600 mt-2 mb-6'>
        Enter your new password for {email}
      </p>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleResetPassword)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input 
                    type='email' 
                    placeholder='Your email' 
                    {...field} 
                    disabled
                    className="bg-gray-100"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input 
                    type='password' 
                    placeholder='Enter your new password' 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="mt-4 w-full bg-green-700 text-white py-2 rounded"
          >
            Reset Password
          </Button>

          <div className="mt-4 text-center">
            <Link className="text-green-700 underline" href="/login">
              Back to Login
            </Link>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export default ResetPasswordPage
