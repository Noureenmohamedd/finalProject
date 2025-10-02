
"use server"
import getMyToken from "@/utilities/token";
import axios from "axios";

 
 
 
 export default async function cashPaymentAction (id :string, values :object ){

    const token = await getMyToken()
    if(!token){

        throw new Error ("Login first")

    }

    const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${id}` , values , {
        headers: {
            token: token as string 
        }
    }

  

    ) 
    
    return data 


}