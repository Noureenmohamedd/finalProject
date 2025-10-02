import getAllProducts from "@/apis/allProducts";

import React from "react";
import Homecard from "./_components/Homecard/Homecard";
import Mainslider from "./_components/Mainslider/Mainslider";
import Categoryslide from "./_components/Categoryslide/Categoryslide";
import { Product } from "@/types/product.t";


const Home = async () => {
 
  const data : Product[] = await getAllProducts()

  return (
   <section  className="px-5 md:px-0 my-10 w-full md:w-[80%] mx-auto" >
    <Mainslider/>
    <Categoryslide/> 
    
    <div className="flex flex-wrap">
      {
        data.map ( (product : Product , idx ) => <Homecard key={idx} product={product}/>
)
      }
    </div>

   </section>
  );
};

export default Home;
