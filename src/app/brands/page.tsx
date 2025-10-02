import React from "react";
import getAllbrands from "./../../apis/allBrands"
import Brandcard from './../_components/Brandcard/Brandcard';


const Brands = async () => {
 
  const data = await getAllbrands ()

  return (
   <section  className="px-5 md:px-0 my-10 w-full md:w-[80%] mx-auto" >
          <div className="text-center my-8">
        <h1 className="text-4xl font-bold text-green-600">All Brands</h1>
      </div>

   
    <div className="flex flex-wrap">
      {
        data.map ( (product , idx ) => <Brandcard key={idx} product={product}/>
)
      }
    </div>

   </section>
  );
};

export default Brands;
