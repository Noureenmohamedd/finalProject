 
 export default async function getAllProducts (){
   const response = await fetch("http://localhost:3000/api/product", { cache: "no-store" }); 
   const {data} = await response.json();

   return data

 }

 