import { useState, type ChangeEventHandler } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useNavigate, } from "react-router-dom";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [discription, setDescription] = useState("");
  const navigate = useNavigate()
  return (
    <>
      {/* <AppBar/> */}
      <div className="flex justify-center">
        <div className="max-w-screen-lg w-full">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
          <input
            type="text"
            className=" w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="title"
            onChange={(e)=>{
              setTitle(e.target.value);
            }}
          />
            <TextEditor onChange = {(e)=>{
              setDescription(e.target.value);
            }}/>
               <div className="flex items-center justify-between px-3 py-2  dark:border-gray-600 border-gray-200">
            <button
              onClick={async()=>{
                try{
                  const response = await axios.post(`${BACKEND_URL}/api/v1/blog/`,{
                  title,
                  content:discription,

                },{
                  headers:{
                    Authorization:localStorage.getItem("token")||"",
                  }
                })
                navigate("/blog/"+response.data.id);

                }catch(e){
                  console.log("Error in publishing blog:", e);
                }
                
              }}
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            >
              Post comment
            </button>
            
          </div>
        </div>
      
      </div>
    </>
  );
};

const TextEditor = ({onChange}:{onChange: ChangeEventHandler<HTMLTextAreaElement>}) => {
  return (
    <div>
      <form>
        <div className="w-full mb-4 mt-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
            <label className="sr-only">Your comment</label>
            <textarea
              onChange={onChange}
              rows={8}
              className="w-full focus:outline-none px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
              placeholder="Write a comment..."
              required
            ></textarea>
          </div>
       
        </div>
      </form>
       
    </div>
  );
};
