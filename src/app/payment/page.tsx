"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cartContext } from '@/context/CartContext';

import React, { useContext, useRef } from 'react';
import cashPaymentAction from '../paymentAction/cashPayment';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import onlinePaymentAction from '../paymentAction/onlinePayment';



const Payment: React.FC = () => {

    const router = useRouter()

  
     const {cartId , afterPayment } = useContext(cartContext)

    const details = useRef<HTMLInputElement>(null)
    const phone = useRef<HTMLInputElement>(null)
    const city = useRef<HTMLInputElement>(null)

   async  function cashPayment(){

        const values = {
            shippingAddress: {
                details: details.current?.value || "",
                phone: phone.current?.value || "",
                city: city.current?.value || "",
            }
        }


        try{
            const data = await cashPaymentAction (cartId, values )
 
            toast.success(data.status ,{
                position: "top-center",
                duration:1000,
            })

            afterPayment()

            router.push("/allorders")


        }
        catch(error: unknown){
            console.log(error)

        }

        
    }

    async  function onlinePayment(){

        const values = {
            shippingAddress: {
                details: details.current?.value || "",
                phone: phone.current?.value || "",
                city: city.current?.value || "",
            }
        }


        try{
            const data = await onlinePaymentAction (cartId, values )

            if(data.status==="success"){
                window.location.href= data.session.url 
            }
 
          //  toast.success(data.status ,{
            //    position: "top-center",
              //  duration:1000,
            //})

            //afterPayment()

            // router.push("/allorders")


        }
        catch(error: unknown){
            console.log(error)

        }

        
    }

  return (
    <div className='w-full md:w-1/2 my-10 mx-auto px-5 md:px-0'>
        <h1 className='mb-10 text-center text-3xl font-bold'>Payment</h1>
        
        <div>
            <label htmlFor="details">Details</label>
            <Input ref={details} type="text" id="details" className="mb-4" />

            <label htmlFor="phone">Phone</label>
            <Input ref={phone} type="tel" id="phone" className="mb-4" />

            <label htmlFor="city">City</label>
            <Input  ref={city} type="text" id="city" className="mb-4" />

            <Button onClick={cashPayment}>Cash Payment</Button>
            <Button  onClick={onlinePayment} className="ms-5" >Online Payment</Button>

        </div>
    </div>
  )
}

export default Payment