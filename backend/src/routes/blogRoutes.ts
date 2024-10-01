import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode , verify , sign } from "hono/jwt";
import { createBlogInputValidation, updateBlogInputValidation } from "@krishna2231/medium-zod";
const router = new Hono<{
    Bindings : {
        DATABASE_URL : string,
        JWT_SECRET : string
    },
    Variables : {
        userId : string,
    }
}>();

//middlewares 

router.use("/*",async(c,next)=>{
    try {
        const header = c.req.header("Authorization");
    const token = header?.split(" ")[1];
    if(token){
        
        const response = await verify(token , c.env.JWT_SECRET) 

        if(!response){
            c.status(401) 
           return c.json({
                message : "Unauthorized"
            })
            
        }

        c.set("userId",response.id as string);

        await next();

    }
    }catch(err){
        c.status(401) 
    return c.json({
            message : err,
            error : "kuch gadbad hai"
        })
    }


})

//route to create a new blog
router.post('/',async(c)=>{
      
   const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const {success} = createBlogInputValidation.safeParse(body)
    if(!success){
        return c.json({
            errors: "input must be valid"
        })
 
    }
 
    const user = await prisma.user.findFirst({
        where : {
            id : c.get('userId')
        }
    })

    const post = await prisma.post.create({
        data : {
                 title : body.title,
                 content : body.content,
                 authorId : c.get('userId'),
        },
        select : {
            id : true,
            title : true,
            content : true,
            authorId : true,
            created_at : true,
        }
    })
     
    c.status(200)
    return c.json({
         message: 'Blog posted successfully',
         post : post,
         user : user
    }
    )
})



//this route will update the blog
router.put('/',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate())
 
    const body = await c.req.json();

    const {success} = updateBlogInputValidation.safeParse(body)
    if(!success){
        return c.json({
            errors: "input must be valid"
        })
 
    }

    console.log('userId' , c.get('userId'));

    const updatedBlog = await prisma.post.update({
        where : {
            id : body.authorId
        },
        data : {
            title : body.title,
            content : body.content,
        }
    })

    c.status(200)
    return c.json({
        message: 'Blog updated successfully',
        post : updatedBlog
    }
    )
})

router.get('/',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    
    const posts = await prisma.post.findMany({
        where : {
            authorId : c.get('userId')
        }
    });

    c.status(200);
    return c.json({
        message: 'Blogs fetched successfully',
        posts : posts
    })
})

router.get('/bulk',async(c)=>{
    

     const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    // const postCount = await prisma.post.count();
    // const skipValue = Math.max(0, Math.floor(Math.random() * (postCount - 5)));

    const posts = await prisma.post.findMany({  
        select:{
            id : true,
            authorId : true,
            title : true,
            content : true,
              author : {
                select :{
                    name : true
                }
              }
        }
    })

    c.status(200)
    return c.json({
        message: 'Blogs fetched successfully',
        posts : posts
    })
})

router.get('/:id',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const id  = c.req.param("id");
    console.log(id);

    const post = await prisma.post.findFirst({
        where : {
            id : id
        },
        select:{
            id : true,
            authorId : true,
            title : true,
            content : true,
            author : {
                select :{
                    name : true
                }
            }
        }
    })

    if(!post){
        c.status(404)
        return c.json({
            message : "Blog not found , Invalid id"
        })
    }

    c.status(200)
    return c.json({
        message: 'Blog fetched successfully',
        post : post
    })
})

export default router;