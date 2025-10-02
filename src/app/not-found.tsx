import React from 'react'
import Image from 'next/image'
import errorimg from "./../../public/screens/404.jpg"
const Errorpage = () => {
  return (
    <div className='w-full md:w-[80%] mx-auto  p-5 my-5 md:px-0 '>
        <Image alt='error msg' src={errorimg}/>
    </div>
  )
}

export default Errorpage