import React from 'react'

interface Blog{
    id : string;
    title : string;
    content : string;
    author : {
        name : string;
    }
}
interface BlogCardProps {
    blog: Blog; // Define the expected type of the blog prop
  }
const BlogCard : React.FC<BlogCardProps> = ({blog}) => {
    console.log("blogcard",blog?.author?.name)
  return (
    <div className='flex flex-col border-b-[1px] border-zinc-900 bg-zinc-50 w-[70%] py-4  ml-14 mt-8 '> 
        <div className='flex gap-10  items-center'>
            <div className='p-2  flex items-center gap-2'>
                <img className='w-[30px] h-[30px] rounded-full border-[1px] border-black object-fill' src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
                <p>{blog?.author?.name}</p>
            </div>
            <div>
                Created at
            </div>
        </div>
        <div className='p-2'>
         <h1 className='text-3xl'>🚀{blog.title}🎁</h1>
        </div>
        <div className='p-2'>
            <p className='p-2'>{blog.content}</p>
        </div>
        <div className='p-2 flex justify-between items-center'>
            <button className='border-2 border-black p-2 px-4'>Read More</button>
            <div className='w-[30%] p-2 flex justify-evenly items-center'>
            <i className="ri-bookmark-line text-xl cursor-pointer"></i>
            <i className="ri-heart-line  text-xl cursor-pointer"></i>
            <i className="ri-share-2-line  text-xl cursor-pointer"></i>
            </div>
        </div>
    </div>
  )
}

export default BlogCard


//contet.slice(0,100)+ "..."
//Math.ceil(content.length/100) minutes read