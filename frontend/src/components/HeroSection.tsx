import React from 'react'
import BlogCard from './BlogCard'
import useBlog from '../Hooks/useBlogs'
import { Link } from 'react-router-dom';


const HeroSection = () => {

    const {loading , blogs} =  useBlog() as any;
    console.log("hero blog" , loading ,blogs)
  return (
    <div className='px-4 flex'>
        <div className=' w-[20%] h-screen flex flex-col p-2 gap-10  px-4 '>
            <div className=' w-fit p-2 flex flex-col justify-center items-center'> 
             <h1 className='text-xl font-bold'>Sunday</h1>
             <p>17 April , 2024</p>
            </div>
           
             <div className='rounded-lg p-2 h-60 flex flex-col justify-evenly items-center bg-zinc-300'>
                 <h1 className='text-2xl font-bold'>DEV Community is a community of 2,125,839 amazing developers</h1>
                 <p className=''>We're a place where coders share, stay up-to-date and grow their careers.</p>
             </div>
        </div>

        <div className='w-[80%] h-screen  p-2 flex flex-col'>

            <div className='w-[80%] flex border-b-[1px] border-gray-600 p-2 items-center gap-8 ml-14'>
                <div className='flex w-[80%] items-center gap-8 '>
                <Link  to={'blog/publish'}><i className="ri-add-fill text-xl cursor-pointer p-2 border-b-2 hover:border-black transition duration-100 ease-linear h-full w-fit"></i></Link> 
                 <p className='cursor-pointer p-2 border-b-2 hover:border-black transition duration-100 ease-linear h-full w-fit '>For you</p>

                 <p className='cursor-pointer p-2 border-b-2 hover:border-black transition duration-100 ease-linear h-full w-fit'>Following</p>
                </div>
            
            <div className='flex items-center justify-center'>
               <Link to={'blog/publish'}><button className='p-2 border-[1px] border-zinc-800 px-4 hover:bg-zinc-900 hover:text-zinc-200 transition duration-200 ease-in'>Publish</button></Link>
            </div>
            </div>
    
               {
                 loading ? <h1 className='text-xl text-center mt-10'>Loading....</h1> : blogs.map((item)=>{
                     return <Link to={`blog/${item.id}`}><BlogCard key={item.id} blog = {item} /></Link>
                 })
               }
            
        </div>
    </div>
  )
}

export default HeroSection
