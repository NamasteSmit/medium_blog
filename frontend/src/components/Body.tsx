import React from "react";
import { Link } from "react-router-dom";
const Body = () => {
  return (
    <div className="bg-[#f8f7f4] w-full h-screen border-2">
      <section className="w-full h-screen  px-10 flex flex-col items-center  text-[#0d0c22]">
        <nav className="flex w-[100%] h-[6vh] lg:h-[10vh] justify-center md:justify-between items-center lg:p-6 border-b-[1px] border-zinc-800 ">
            <div className="flex gap-2 justify-center items-center">
            <h1 className="text-[20px] lg:text-xl">Dev Community</h1>
            <img className="w-9" src="https://dev-to-uploads.s3.amazonaws.com/uploads/logos/original_logo_0DliJcfsTcciZen38gX9.png" alt="" />
            </div>
         
          <ul className="hidden md:block">
           <Link to={'/auth/login'}><li className="text-lg px-6  border-1 border-zinc-900 bg-zinc-800 text-white rounded-full p-2 cursor-pointer">
              Login
            </li></Link> 
          </ul>
        </nav>

        <div className="border-2 md:w-full lg:w-[70%] h-[70%] flex flex-col items-center justify-center mt-16">
          <div className="font-serif text-2xl md:text-5xl lg:text-7xl flex flex-col items-center justify-center p-2 gap-6">
            <h2 className="font-roboto">Welcome to </h2>
            <h2 className="mx-10">Dev Community.</h2>
          </div>
          <div className="w-full flex flex-col items-center justify-evenly p-8">
            <p className="p-2 text-[16px] md:text-2xl lg:text-3xl">Unite. Create.Innovate.</p>
            <p className="p-2 text-[16px] md:text-2xl text-3xl">Build Tomorrow Together</p>
            <p className="md:w-[100%] lg:w-[80%] text-[12px] lg:text-[16px] text-center mt-5">
              <span className=" md:text-[16px] lg:text-[20px]">Welcome to Dev Community!</span> A
              vibrant space where developers of all levels come together to
              share insights, tackle challenges, and celebrate innovation.
            </p>
            <Link to={"/auth/signup"}><button className="border-2 mt-8 border-black  p-2 lg:p-4 px-6 lg:px-8 rounded-full hover:bg-zinc-800 hover:text-zinc-200 transition duration-200 ease-linear">
              Get Started <i className="ri-arrow-right-line text-xl"></i>
            </button></Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Body;
