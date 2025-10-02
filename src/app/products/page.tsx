import React from "react";
import getAllProducts from "@/apis/allProducts";
import Productcard from "../_components/Productcard/Productcard";
import type { Product } from "../../types/product.t";


const Product: React.FC = async () => {
 
  const data: Product[] = await getAllProducts()

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
