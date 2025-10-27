import type{ SignupInput } from "@grptl/median-common";
import axios from "axios";
import { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {BACKEND_URL} from "../../config"

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  async function sendRequest(){
    try{
       const response =  await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"?"signup":"signin "}`, postInputs);
       console.log(response);
       let jwt = null;
       if(type === "signup"){
            jwt = response.data.token;
       }else{
            jwt = response.data.jwt;
            console.log(jwt);
       }
       localStorage.setItem("token",jwt);
       navigate('/blogs')
    }catch(e){
       /// alret the user that the request failed
       console.log(e);
       alert("Error while signing up")
    }

  }
  return (
    <div className="h-screen flex justify-center flex-col">
        
      <div className="flex justify-center">
        <div >
          <div className="px-10">
            <div className="text-3xl font-extrabold">Create an account</div>
            <div className="text-slate-400">
              {type === "signin"? "Don't have an account":"Already have an account?"}
              <Link className="pl-2 underline" to={type==="signin"?"/signup":"/signin"}>
                {type==="signup"?"Sign In":"Sign up"}
              </Link>
            </div>
          </div>
         <div className="pt-8">
          {type === "signup"?  <LabelledInput
            label="Name"
            placeholder="Girdhair patel....."
            onchange={(e) => {
              setPostInputs((prev) => ({
                ...prev,
                name: e.target.value,
              }));
            }}
            type="name"
          />:null}
          <LabelledInput
            label="username"
            placeholder="girdharip45@gmail.com"
            onchange={(e) => {
              setPostInputs((prev) => ({
                ...prev,
                username: e.target.value,
              }));
            }}
            type="name"
          />
          <LabelledInput
            label="password"
            placeholder="1234567"
            onchange={(e) => {
              setPostInputs((prev) => ({
                ...prev,
                password: e.target.value,
              }));
            }}
            type="password"
          />
          <button onClick={sendRequest} type="button" className=" w-full mt-8 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type=== "signup"?"Sign in":"Sign up"}</button>

         </div>
          
        </div>
      </div>
    </div>
  );
};

interface labeledInputProps {
  label: string;
  placeholder: string;
  onchange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({
  label,
  placeholder,
  onchange,
  type,
}: labeledInputProps) {
  return (
    <div>
      <label className="block mb-2 text-sm  font-semibold text-gray-900 dark:text-white pt-4">
        {label}
      </label>
      <input
        onChange={onchange}
        type={type || "text"}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder-gray-400"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
