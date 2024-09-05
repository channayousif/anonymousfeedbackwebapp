import {z} from "zod"

export const userNameValidation = z
    .string()
    .min(3, {message: "Username must be at least 3 characters."})
    .max(20, {message: "Username must be at most 30 characters."})
    .regex(/^[a-zA-Z0-9_]+$/, {message: "Username must contain only letters, numbers, and underscores."})
    .refine((value) => !value.includes(" "), {message: "Username cannot contain spaces."});


export const signupSchema = z.object({
    name: userNameValidation,
    email: z.string().email({message: "Invalid email address."}),
    password: z.string().min(6, {message: "Password must be at least 6 characters."})
        .max(20, {message: "Password must be at most 20 characters."})
        .regex(/[a-zA-Z0-9]/, {message: "Password must contain at least one letter or number."})
});