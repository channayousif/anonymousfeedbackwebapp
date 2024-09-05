import {z} from "zod"

export const signInSchema= z.object({
    username: z.string().min(6,"Username is required"),
    password: z.string().min(6,"Password is required")
})