import {z} from "zod";

export const signinInputValidation = z.object({
    email : z
    .string({required_error : "Email is required"})
    .trim()
    .email({message : "Please enter a valid email address"}),

    password : z
    .string({required_error : "Password is required"})
    .min(5, {message : "Password should be at least 5 characters long"})
    .trim()
})

export const signupInputValidation = z.object({
    name : z
    .string({required_error : "Name is required"})
    .trim()
    .min(3, {message : "Name should be at least 3 characters long"}),

    email : z
    .string({required_error : "Email is required"})
    .trim()
    .email({message : "Please enter a valid email address"}),

    password : z
    .string({required_error : "Password is required"})
    .min(5, {message : "Password should be at least 5 characters long"})
    .trim()
})

export const createBlogInputValidation = z.object({
    title : z
    .string({required_error : "Title is required"})
    .trim()
   .min(3, {message : "Title should be at least 3 characters long"}),

   content : z
   .string({required_error : "Title is required"})
   .trim(),

})

export const updateBlogInputValidation = z.object({
    title : z
    .string({required_error : "Title is required"})
    .trim()
   .min(3, {message : "Title should be at least 3 characters long"}),

   content : z
   .string({required_error : "Title is required"})
   .trim(),
 
    authorId : z.string()
})

export type SigninInput = z.infer<typeof signinInputValidation>
export type SignupInput = z.infer<typeof signupInputValidation>
export type createBlogInput = z.infer<typeof createBlogInputValidation>
export type updateBlogInput = z.infer<typeof updateBlogInputValidation>