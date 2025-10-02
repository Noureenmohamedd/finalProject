import * as z from 'zod';

export const emailVerificationSchema = z.object({
  email: z.string().email("Invalid email address")
});

export const codeVerificationSchema = z.object({
  resetCode: z.string().min(6, "Reset code must be at least 6 characters")
});

export const resetPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
  newPassword: z.string()
    .regex(
      /^[A-Za-z][A-Za-z0-9]{5,8}$/,
      "Password must start with a letter, be 6-9 chars long, and contain only letters and numbers"
    )
});

export type EmailVerificationSchemaType = z.infer<typeof emailVerificationSchema>;
export type CodeVerificationSchemaType = z.infer<typeof codeVerificationSchema>;
export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;
