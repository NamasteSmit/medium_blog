import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BACKEND_URL } from '../../config';

interface Blog{
authorId: String 
content: String
created_at: String
id : String
published : Boolean
title : String
author:{name: String}
}
const BlogPage = () => {
    const {blogId} = useParams();
    console.log(blogId); // 

    const [blog , setBlog] = useState<Blog>();
    console.log("blogge" , blog);

    useEffect(()=>{
       getBlogs()
    },[])

    const getBlogs = async ()=>{
       const response = await fetch(`${BACKEND_URL}/api/v1/blog/${blogId}`,{
         method : 'GET',
         headers : {
             "Content-Type": "application/json",
             Authorization : `Bearer ${localStorage.getItem("Token")}`
         }
       })
       const data = await response.json()
       setBlog(data.post)  // set blog details in state
       console.log("blog details" , data)
    }
  return (
    <div className='flex p-10 justify-center items-center'>
          <div className='w-[70%] h-fit flex flex-col p-10 bg-zinc-100 gap-1'>
               <div className='text-5xl  p-10 font-bold flex flex-col gap-1'>
                  {blog?.title}
                  <p className='text-[14px] font-light'>posted on {blog?.created_at}</p>
               </div>
               <div className='px-10 gap-4 flex flex-col'>
                 <p className='text-xl'>{blog?.content} </p>
               </div>
          </div>

          <div className='w-[30%] p-4 flex flex-col gap-1'>
               <span className='text-[20px]'>Author</span>
                <p className='ml-8 font-bold'>~{blog?.author?.name}</p> 
                <p className='font-light'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, cupiditate. Expedita beatae ipsam quis accusantium fuga quisquam odio, repellat soluta.</p>
                <button className='w-fit p-2 border-[1px] border-zinc-900 mt-3 rounded-md'>Connect with me</button>
          </div>
    </div>
  )
}

export default BlogPage
