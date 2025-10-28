import { Link } from "react-router-dom";
import { Avator } from "./BlogCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
// import Logo from './assets/medium-icon.svg';
export const AppBar = () => {
     
    // const [user , setUser]= useState();

    //  useEffect(() => {
    //     document.title = "Medium";
          
    //     axios.get(`${BACKEND_URL}/api/v1/user/`,{
    //         headers:{
    //                     Authorization:localStorage.getItem("token")
    //                 }
    //     }).then((response)=>{
    //         // setUser(response.data.user);
    //         // localStorage.setItem("user", JSON.stringify(response.data.user));
    //         console.log("Fetched user:", response.data.user);
    //     }).catch((error)=>{
    //         console.log("Error while fetching user", error);
    //     });
        
    //  }, []);
    
  return (
    <div className="border-b flex justify-between px-10 py-4">
   <Link to ="/" className="flex flex-col justify-center cursor-pointer">  
         {/* <img src={Logo} alt="Logo" width={100} height={100} /> */}
         Medium
 </Link>
    <div>
        <Link to={"/publish"}>
        <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">new</button>
        </Link>

        <Avator size ={6} name= {"G P"} />
    </div>
    </div>
  );
}