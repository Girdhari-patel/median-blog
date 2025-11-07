import { Link } from "react-router-dom";
 
import { MediumLogo } from "./icons/MediumLogo";
import { useUser } from "../hooks";

import Spinner from "./Spinner";
import { useEffect } from "react";
import UserMenu from "./UserMenu";
 
export const AppBar = () => {
     
    const {loading, user} = useUser(); 

    useEffect(()=>{
      console.log("User in AppBar:", user);
    },[ ])

  return (
    <div className="border-b flex justify-between px-10 py-4">
   <Link to ="/blogs" className="flex flex-col justify-center cursor-pointer max-40">  
         {/* <img src={Logo} alt="Logo" width={100} height={100} /> */}
        <div className="flex justify-between ">
            <MediumLogo className="w-10 h-10"/>
            <span className="text-sm font-bold ml-2 flex justify-center flex-col">Medium</span>
        </div>
 
 </Link>
    <div className="flex">
        { user && <Link to={"/publish"}>
        <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">new</button>
        </Link>
}
      {loading ? (
      <Spinner message="Loading..." size="sm" />
    ) : user ? (
      <UserMenu user={String(user)} />
    ) : (
      <SigninButton />
    )}
    </div>
    </div>
  );
}

 function SigninButton(){

    return <Link to={"/signin"}>
    <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Sign In</button>
    </Link>
        
}