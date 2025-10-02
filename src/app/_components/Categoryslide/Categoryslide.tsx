
import React from 'react'
import Swipercategory from '../Swipercategory/Swipercategory'
import getAllCategories from '@/apis/allCategories'

const Categoryslide = async () => {
    const data = await getAllCategories()
  return (
    <div className='mb-3'>
      <Swipercategory  categories={data}/>
    </div>
  )
}

export default Categoryslide
