import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
interface RootState {
  user: {
    name: string;
    items : string
  };
}
const Header = () => {

  const name = useSelector((store:RootState)=> store.user)
  const { items } = name; 
  return (
    <div className='p-4 w-[100%] h-[12vh]'>cls
        <nav className='flex w-full h-[100%] justify-between p-2 border-b-[1px] border-zinc-900'>
        <div className='flex  w-[25%] justify-between items-center'>
        <i className="ri-menu-line text-2xl cursor-pointer"></i>
        <div className='flex justify-evenly items-center gap-3'>
        <input className='border-[1px] border-zinc-900 p-2' type='text' placeholder='Search'/>
        <i className="ri-search-line text-xl cursor-pointer"></i>
        </div>
        </div>
        <div className='flex justify-center items-center px-6'>
        <Link to={"/dashboard"}><img className="w-16 h-[100%]" src="https://dev-to-uploads.s3.amazonaws.com/uploads/logos/original_logo_0DliJcfsTcciZen38gX9.png" alt="" /></Link>
        </div>
        <div className='flex justify-evenly items-center w-[25%]'>
          <button className='border-[1px] bg-zinc-900 text-zinc-200 p-2 px-4'>Logout</button>
          <button className='border-[1px] border-zinc-900 p-2 px-4'>Subscribe</button>
          <i className="ri-notification-line text-xl cursor-pointer"></i>
          <p className='w-[30px] h-[30px] rounded-full bg-zinc-800 text-zinc-300 flex justify-center items-center text-xl p-5'>{items[0]}</p>
        </div>
        </nav> 
    </div>
  )
}

export default Header
