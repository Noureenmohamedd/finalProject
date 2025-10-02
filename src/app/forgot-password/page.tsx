"use client";

import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { emailVerificationSchema, EmailVerificationSchemaType } from '@/schema/forgotPassword.s'
import axios from 'axios'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const ForgotPasswordPage = () => {
  const router = useRouter()

  const form = useForm<EmailVerificationSchemaType>({
    defaultValues: {
      email: ""
    },
    resolver: zodResolver(emailVerificationSchema)
  })

  async function handleEmailVerification(values: EmailVerificationSchemaType) {
    try {
      const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values)
      console.log(data)

      toast.success("Verification code sent to your email", {
        position: 'top-center',
        duration: 2000
      })

      
      sessionStorage.setItem('resetEmail', values.email)
      
    
      router.push('/verify-code')

    } catch (error: unknown) {
      console.error("Email verification error:", error)
      const axiosError = error as { response?: { data?: { message?: string } } };
      toast.error(axiosError?.response?.data?.message || "Failed to send verification code", {
        position: 'top-center',
        duration: 2000
      })
    }
  }

  return (
    <div className='mx-auto px-5 md:px-0 w-full md:w-1/2 my-12'>
      <h1 className='text-3xl text-center font-bold'>
        Forgot Password
      </h1>
      <p className='text-center text-gray-600 mt-2 mb-6'>
        Enter your email address and we&apos;ll send you a verification code
      </p>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleEmailVerification)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type='email' placeholder='Enter your email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="mt-4 w-full bg-green-700 text-white py-2 rounded"
          >
            Send Verification Code
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

export default ForgotPasswordPage
