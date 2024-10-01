import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import AuthErrorElement from "./authErrorElement";
import { SignupInput, SigninInput } from "@krishna2231/medium-zod";
import { BACKEND_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import { setUser } from "../Redux/userSlice";

const AuthPage = () => {
  const { param } = useParams();
  const navigate = useNavigate();
   const dispatch = useDispatch()

  const [postInputs, setPostInputs] = useState<SignupInput | SigninInput>({
    email: "",
    password: "",
    name: "",
  });


  const createNewUser = async()=>{
    try {
      const data = await fetch(`${BACKEND_URL}/api/v1/user/signup`,{
        method : 'POST',
        headers : {
          'Content-Type': 'application/json'
        },
        body : JSON.stringify(postInputs)
      });

      const result = await data.json();
      
      if(result.user.id && result.token){
        const jwt = result.token;
        localStorage.setItem('Token',jwt);

        // dispatch(setUser(result.user.name))
        navigate('/dashboard');
      }else{
        console.log(result.errors);
      }
      
    }catch(e){
      console.log("error creating new user", e);
    }
  
  }

  const signinRoute = async()=>{
    try{
      const data = await fetch(`${BACKEND_URL}/api/v1/user/signin`,{
        method : 'POST',
        headers : {
          'Content-Type': 'application/json'
        },
        body : JSON.stringify(postInputs)
      });
      const result = await data.json();
      console.log("result" , result);
      if(result.token){
        const jwt = result.token;
        localStorage.setItem('Token',jwt);
        if(result.user.name){
          dispatch(setUser(result.user.name))
        }
        navigate('/dashboard');
      }
    } catch(err){
      console.log("error signing in", err);
    }

  }
   
  return param !== "login" && param !== "signup" ? (
    <AuthErrorElement />
  ) : (
    <div className="w-[100%] h-screen flex p-2">
      <div className=" w-[100%] md:w-1/2  h-full p-2 md:p-10 flex flex-col gap-20 items-center">
        <div className="border-b-2  lg:p-6 flex flex-col items-center gap-5">
          <h1 className="lg:text-4xl text-2xl">Join the DEV Community</h1>
          <p className="text-[12px] lg:text-[18px] ">
            DEV Community is a community of 2,121,058 amazing people
          </p>
        </div>
        <div className="md:h-full  lg:h-full w-full lg:w-[80%] border-[1px] border-zinc-700 shadow-lg p-6 px-10 flex flex-col lg:justify-evenly items-center gap-4">
          {param === "signup" && (
            <div className="flex flex-col w-full">
              <label htmlFor="">Username</label>
              <input
                className="border-2 border-black p-2"
                type="text"
                placeholder="Email"
                required
                onChange={(e) => {
                  setPostInputs({ ...postInputs, name: e.target.value });
                }}
              />
            </div>
          )}
          <div className="flex flex-col w-full">
            <label htmlFor="">Email</label>
            <input
              className="border-2 border-black p-2"
              type="email"
              placeholder="Email"
              required
              onChange={(e) => {
                setPostInputs({ ...postInputs, email: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="">Password</label>
            <input
              className="border-2 border-black p-2"
              type="password"
              placeholder="password"
              required
              onChange={(e) => {
                setPostInputs({ ...postInputs, password: e.target.value });
              }}
            />
          </div>
          {param === "signup" ? (
            <button
              onClick={() => {
                createNewUser()
              }}
              className="border-2 w-[80%] bg-zinc-800 text-zinc-200 p-2 mt-3"
            >
              Signup
            </button>
          ) : (
            <button
              onClick={() => {
                signinRoute()
              }}
              className="border-2 w-[80%] bg-zinc-800 text-zinc-200 p-2 mt-3"
            >
              {" "}
              Login
            </button>
          )}

          <div className="border-t-[0.8px] border-black mt-5 lg:p-2 w-full text-center">
            {param === "login" ? (
              <p className="mt-3 md:text-sm">
                New to DEV community ?{" "}
                <Link
                  className="border-2 border-zinc-800 p-1"
                  to={"/auth/signup"}
                >
                  Signup
                </Link>{" "}
              </p>
            ) : (
              <p className="mt-3">
                Already a member?{" "}
                <Link
                  className="border-2 border-zinc-800 p-1"
                  to={"/auth/login"}
                >
                  Login
                </Link>{" "}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="hidden  md:flex md:w-1/2  md:h-full  justify-center items-center p-10 border-l-[1px] border-zinc-800 ">
        <div className="text-center">
          <p className="text-xl">
            "It's great to see how quickly developers go from zero to having
            their own blog on Dev Community 🚀. It reminds me of how Substack
            helped writers share their stories."
          </p>
          <div className="flex justify-start items-center mt-5 gap-3">
            <img
              className="w-[70px] h-[70px] rounded-full object-fill"
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <p className="text-[18px]"> - Smit Patel , </p>
            <p> CEO DEV community</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
