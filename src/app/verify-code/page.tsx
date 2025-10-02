"use client";

import React, { useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { codeVerificationSchema, CodeVerificationSchemaType } from '@/schema/forgotPassword.s'
import axios from 'axios'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const VerifyCodePage = () => {
  const router = useRouter()
  const [email, setEmail] = useState<string>('')

  const form = useForm<CodeVerificationSchemaType>({
    defaultValues: {
      resetCode: ""
    },
    resolver: zodResolver(codeVerificationSchema)
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
  }, [router])

  async function handleCodeVerification(values: CodeVerificationSchemaType) {
    try {
      const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", values)
      console.log(data)

      toast.success("Code verified successfully", {
        position: 'top-center',
        duration: 2000
      })

      // Redirect to reset password page
      router.push('/reset-password')

    } catch (error: any) {
      console.error("Code verification error:", error)
      toast.error(error?.response?.data?.message || "Invalid verification code", {
        position: 'top-center',
        duration: 2000
      })
    }
  }

  async function handleResendCode() {
    try {
      const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", {
        email: email
      })
      console.log(data)

      toast.success("New verification code sent to your email", {
        position: 'top-center',
        duration: 2000
      })

    } catch (error: any) {
      console.error("Resend code error:", error)
      toast.error(error?.response?.data?.message || "Failed to resend verification code", {
        position: 'top-center',
        duration: 2000
      })
    }
  }

  return (
    <div className='mx-auto px-5 md:px-0 w-full md:w-1/2 my-12'>
      <h1 className='text-3xl text-center font-bold'>
        Verify Code
      </h1>
      <p className='text-center text-gray-600 mt-2 mb-6'>
        Enter the verification code sent to {email}
      </p>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleCodeVerification)}>
          <FormField
            control={form.control}
            name="resetCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verification Code</FormLabel>
                <FormControl>
                  <Input 
                    type='text' 
                    placeholder='Enter verification code' 
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
            Verify Code
          </Button>

          <div className="mt-4 text-center space-y-2">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleResendCode}
            >
              Resend Code
            </Button>
            
            <Link className="text-green-700 underline block" href="/forgot-password">
              Back to Email Verification
            </Link>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export default VerifyCodePage
