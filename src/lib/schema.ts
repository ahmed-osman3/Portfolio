import {z }from 'zod'

export const contactSchema = z.object({
    name : z.string().trim().min(1,"Please enter a name !"),
    email: z.string().trim().email('Please enter a valid email !'),
    message : z.string().trim().min(1,"Please enter a mesage!"),

})