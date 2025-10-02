import getUserOrder from '@/apis/getUserOrders'
import { Orders } from '@/types/order.t'
import React from 'react'

const allOrders = async () => {

    const data: Orders = await getUserOrder()



    console.log(data)
  return (
    <div className=' w-full my-10  md:px-0 px-0 md:w-[80%] mx-auto  '>
        <div className='p-5 allorders '>
            

        </div>
    </div>
  )
}

export default allOrders