import React from "react";

const AuthErrorElement = ()=>{
    return (
        <div className="w-screen h-screen  flex justify-center items-center bg-zinc-800 text-zinc-300">
            <div className=" w-fit h-fit p-12 border-[1px] border-zinc-600 flex flex-col justify-center items-center gap-5">
            <h1>status : 404</h1>
            <p>Error : Wrong Route </p>
            </div>
        </div>
    )
}

export default AuthErrorElement;