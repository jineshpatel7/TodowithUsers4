import {z} from "zod";

const signupSchema = z.object({

    email : z
    .string({required_error:"Email is required"}) 
    .trim()
    .email({message:"Invalid Email address"})
    .min(11,{message: "Email must be atleast 11 characters"})
    .max(100,{message: "Email must be less than 100 characters"}),

    password : z
    .string({required_error:"Password is required"}) 
    .trim()
    .min(8,{message: "Password  must be atleast 8 characters"})
    .max(50,{message: "Password  must be less than 50 characters"}),

    name : z
    .string({required_error:"Name is required"}) 
    .trim()
    .min(5,{message: "Name must be atleast 5 characters"})
    .max(50,{message: "Name must be less than 50 characters"}),

})
const loginSchema = z.object({
    

    email : z
    .string({required_error:"Email is required"}) 
    .trim()
    .email({message:"Invalid Email address"})
    .min(11,{message: "Email must be atleast 11 characters"})
    .max(100,{message: "Email must be less than 100 characters"}),

    password : z
    .string({required_error:"Password is required"}) 
    .trim()
    .min(8,{message: "Password  must be atleast 8 characters"})
    .max(50,{message: "Password  must be less than 50 characters"})


})

// export default signupSchema;
export {signupSchema,loginSchema};