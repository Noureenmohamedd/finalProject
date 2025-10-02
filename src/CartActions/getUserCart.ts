
import getMyToken from "@/utilities/token"

export default async function getUserCartAction(){
    const token = await getMyToken()

    if(!token){
        throw Error ("Login first.")
    }

    const response= await fetch("https://ecommerce.routemisr.com/api/v1/cart" , {
        headers: {
            token: token as string ,
        }
    })

    const data = await response.json()

    return data 

}