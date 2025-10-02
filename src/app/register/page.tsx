"use client"
import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, RegisterSchemaType } from '@/schema/register.s'
import axios from 'axios'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Link from 'next/link'


const Page = () => {

  const router = useRouter()
  const form = useForm <RegisterSchemaType> ({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },

    resolver:zodResolver(registerSchema)
  })

   async function handleRegister(values:RegisterSchemaType) {

    try{
      const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup" , values) 
      console.log(data)

      toast.success(data.message, {position : 'top-center' , duration: 2000 } )

      router.push("/login")

    }
    catch(error) {
      console.log(error)
      toast.error(error.response.data.message, {position : 'top-center' , duration: 2000 } )


    }
   console.log(values)
  }

  return (
    <div className='mx-auto px-5 md:px-0 w-full md:w-1/2 my-12'>
      <h1 className='text-3xl text-center font-bold'>
        Register Form 
      </h1>

      
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleRegister)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type='text' {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type='email' {...field} />
                </FormControl>
                <FormDescription />
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
                  <Input type='password' {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Repassword</FormLabel>
                <FormControl>
                  <Input type='password' {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input type='text' {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="mt-4 w-full bg-green-700 text-white py-2 rounded"
          >
           Register Now!
          </Button>

          <Link  href="/login"> Already have an accound ? log in </Link>

        </form>
      </FormProvider>
    </div>
  )
}

export default Page
