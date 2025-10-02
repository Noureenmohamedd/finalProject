import React from "react";
import getAllCategories from "./../../apis/allCategories"
import Categorycard from './../_components/Categorycard/Categorycard';


const Category = async () => {
 
  const data = await getAllCategories ()

  return (
   <section  className="px-5 md:px-0 my-10 w-full md:w-[80%] mx-auto" >
    <div className="flex flex-wrap">
      {
        data.map ( (product , idx ) => <Categorycard key={idx} product={product}/>
)
      }
    </div>

   </section>
  );
};

export default Category;
