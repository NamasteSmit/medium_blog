import React, { useState } from 'react'
import { BACKEND_URL } from '../../config';
import { useNavigate } from 'react-router-dom';
const Publish = () => {
  const navigate = useNavigate();
    const [publishPost , setPublishPost] = useState({
        title: '',
        content: ''
    });
    console.log("publishPost" , publishPost);
 
    const sendPost = async()=>{
      try{
        const response = await fetch(`${BACKEND_URL}/api/v1/blog`,{
          method : 'POST',
          headers : {
              'Content-Type': 'application/json',
              Authorization : `Bearer ${localStorage.getItem("Token")}`
          },
          body : JSON.stringify(publishPost)
        })
        const data = await response.json();
        console.log("data from server", data.post.id);
        navigate(`/dashboard/blog/${data.post.id}`)

      }catch(err){
        console.log("error publishing post", err);
        // display error message to user  //  showAlert('Error publishing post', 'error') 
      }
    }
    

  return (
    <div className='flex justify-center items-center w-full h-screen'>
          <div className='w-[60%] h-[70%] border-[1px] border-zinc-100 bg-zinc-900 flex flex-col p-4 gap-4 shadow-md shadow-zinc-600'>
                <input type='text' placeholder='title' value={publishPost.title} className='bg-transparent border-b-[1px] border-zinc-200 p-4 outline-none text-zinc-100 text-2xl' onChange={(e)=>{
                    setPublishPost({...publishPost , title: e.target.value})
                }}/>
                <textarea value={publishPost.content} onChange={(e)=>{
                   setPublishPost({...publishPost , content: e.target.value})
                }}  name="" id="" rows={10} cols={60} placeholder='What is happening ?' className='text-zinc-100 bg-transparent border-[1px] border-zinc-500 outline-none'></textarea>
                <button onClick={()=>{
                  sendPost()
                  setPublishPost({
                    title: '',
                    content: ''
                  })
                  }} className='border-[1px] border-zinc-200 text-zinc-50 w-fit p-2 px-10 text-xl'>Post</button>
          </div>
    </div>
  )
}

export default Publish
