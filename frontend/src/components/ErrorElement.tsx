import React, { ReactNode } from "react";
import { useRouteError } from "react-router-dom";


interface Error {
    data : string;
    status : number;
}


const ErrorElement = ()=>{
    const error = useRouteError() as Error;
    return (
        <div className="w-screen h-screen  flex justify-center items-center bg-zinc-800 text-zinc-300">
            <div className=" w-fit h-fit p-12 border-[1px] border-zinc-600 flex flex-col justify-center items-center gap-5">
            <h1>status : {error.status}</h1>
            <p>Error : {error.data} </p>
            </div>
        </div>
    )
}

export default ErrorElement;