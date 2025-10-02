"use client";

import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/schema/login.s'
import axios from 'axios'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LoginSchemaType } from '@/schema/login.s'
import { signIn } from "next-auth/react"

const LoginPage = () => {
  const router = useRouter()

  const form = useForm<LoginSchemaType>({
    defaultValues: {
      email: "",
      password: ""
    },
    resolver: zodResolver(loginSchema)
  })

  async function handleLogin(values: LoginSchemaType) {
    try {
     
      const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      console.log(data)

      

      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
        callbackUrl: "/"
      })

      if (res?.ok) {
        toast.success("Login success", {
          position: 'top-center',
          duration: 1000
        })
        window.location.href = res.url || "/"
      } else {
        toast.error(res?.error || "Login failed", {
          position: 'top-center',
          duration: 1000
        })
      }

    } catch (error: unknown) {
      console.error("Login error:", error)
      const axiosError = error as { response?: { data?: { message?: string } } };
      toast.error(axiosError?.response?.data?.message || "Login failed", {
        position: 'top-center',
        duration: 1000
      })
    }
  }

  return (
    <div className='mx-auto px-5 md:px-0 w-full md:w-1/2 my-12'>
      <h1 className='text-3xl text-center font-bold'>
        Login Form
      </h1>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)}>
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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' placeholder='Enter your password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="mt-4 w-full bg-green-700 text-white py-2 rounded"
          >
            Login Now!
          </Button>

          <div className="mt-4 text-center">
            <Link className="text-green-700 underline block mb-2" href="/forgot-password">
              Forgot Password?
            </Link>
            <p>
              Don&apos;t have an account?{" "}
              <Link className="text-green-700 underline" href="/register">Register</Link>
            </p>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export default LoginPage
