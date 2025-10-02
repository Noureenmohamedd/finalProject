import * as z from 'zod';

export const loginSchema = z.object( {
    
      email: z.email("invalid email"),
       password: z.string()
    .regex(
      /^[A-Za-z][A-Za-z0-9]{5,8}$/,
      "Password must start with a letter, be 6-9 chars long, and contain only letters and numbers"
    ),

  
    }
)

export type LoginSchemaType = z.infer<typeof loginSchema>