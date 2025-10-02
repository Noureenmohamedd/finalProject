import * as z from 'zod';

export const registerSchema = z.object( {
      name: z.string().min(3, "min lenght is 3").max(20, "max lenght is 20 "),
      email: z.email("invalid email"),
       password: z.string()
    .regex(
      /^[A-Za-z][A-Za-z0-9]{5,8}$/,
      "Password must start with a letter, be 6-9 chars long, and contain only letters and numbers"
    ),

  rePassword: z.string()
    .regex(
      /^[A-Za-z][A-Za-z0-9]{5,8}$/,
      "Password must start with a letter, be 6-9 chars long, and contain only letters and numbers"
    ),
      phone: z.string().regex(/^01[0125][0-9]{8}$/ , "invalid phone number")
    }).refine(function(object) 
{ if (object.password==object.rePassword)
{
    return true
}
return false

}
   , 
   {
    path: ["repassword"],
    error: "password does not match"
   }



)

export type RegisterSchemaType = z.infer<typeof registerSchema>