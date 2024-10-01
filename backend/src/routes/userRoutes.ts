import { Hono } from "hono";
import {  PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { signinInputValidation , signupInputValidation } from "@krishna2231/medium-zod";
import bcrypt from 'bcryptjs'
import { decode , verify , sign } from "hono/jwt";

const router = new Hono<{
    Bindings : {
        DATABASE_URL : string;
        JWT_SECRET : string;
    },
    Variables : {
        userId : string;
    }
}>();





//c is the context -> which gives you Request , response object , next as well
router.post('/signup',async(c)=>{
     
    try {

        const prisma = new PrismaClient({
            datasourceUrl : c.env.DATABASE_URL,
        }).$extends(withAccelerate())
     
         const body = await c.req.json();
         const {success} = signupInputValidation.safeParse(body);
         console.log("success",success)
         if(!success){
            return c.json({
                errors: "input must be valid"
            })
         }
        
           const existingUser = await prisma.user.findUnique({
            where : {
                email : body.email
            }
           })
    
           if(existingUser){
            return c.json({
                message: "Email already exists"
            })
           }
    
           const hashedPassword = await bcrypt.hash(body.password ,10);
    
           const user = await prisma.user.create({
            data : {
                name : body.name,
                email : body.email,
                password : hashedPassword
            },
            select:{
                id : true,
                name : true,
                email : true
            }
           })
            
           const token = await sign({id : user.id} ,  c.env.JWT_SECRET)
            
        return c.json({
            message: "User signed up successfully!",
            user : user,
            token : token
            
        })

    }catch(e){
        console.log(e)
        c.status(500)
        return c.json({
            message : "Internal Server Error 500",
            error : e
        })
    }

    
})

router.post('/signin',async(c)=>{

    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate());
     
    const body = await c.req.json();
    const {email , password} = body;
    const {success} = signinInputValidation.safeParse({email, password})
    if(!success){
        return c.json({
            errors: "input must be valid"
        })
 
    }

    const user = await prisma.user.findUnique({
        where : {
            email : body.email
        }
    })

    if(!user){
        c.status(403)
        return c.json({
            message : 'User not found'
        })
    }

    const validaPassword = await bcrypt.compare(body.password , user.password)
    if(!validaPassword){
        c.status(403)
        return c.json({
            message : "Invalid password"
        })
    }

    const token = await sign({id : user.id} , c.env.JWT_SECRET);
    

    return c.json({
        message: "User signed in successfully!",
        token : token,
        user : user
    })
})

router.get('/',(c)=>{
    return c.text('Hello Hono!')
})



export default router;