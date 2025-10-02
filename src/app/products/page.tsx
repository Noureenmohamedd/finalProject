import getAllProducts from "@/apis/allProducts";

import React from "react";

import Productcard from '../_components/Productcard/Productcard';


const Product = async () => {
 
  const data = await getAllProducts()

  return (
   <section  className="px-5 md:px-0 my-10 w-full md:w-[80%] mx-auto" >
    <div className="flex flex-wrap">
      {
        data.map ( (product , idx ) => <Productcard key={idx} product={product}/>
)
      }
    </div>

   </section>
  );
};

export default Product;
