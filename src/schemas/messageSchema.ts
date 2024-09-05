import {z} from "zod"

export const messageSchema= z.object({
    content: z
    .string()
    .max(400,"Message is required with Max 400 characters")
    .min(10, "Message is required with atleast 10 characters")
})