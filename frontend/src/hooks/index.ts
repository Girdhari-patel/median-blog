import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../config";

export interface Blog{
   "content": string,
            "title": string,
            "id": string,
            "author": {
                "name": string
            }
        
}
export const useBlog = (id:string)=>{
    const [loading, setLoading] = useState(false);
    const [blog, setBlog] = useState<Blog>();
    useEffect(()=>{
        const fetchBlog = async()=>{
            setLoading(true);
            try{
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
                    headers:{
                        Authorization:localStorage.getItem("token")
                    }
                });
            
                console.log("Fetched blog:", response.data);
            
                setBlog(response.data.blog || null);
            }catch(e){
                console.log("Error while fetching blog", e);
            }finally{
                setLoading(false);
            }
        }
        fetchBlog();
    }, [id]);
    return {loading, blog};
}

export const useBlogs = ()=>{
    const [loading, setLoading] = useState(false);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    useEffect(()=>{
        const fetchBlogs = async()=>{
            setLoading(true);
            try{
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
                    headers:{
                        Authorization:localStorage.getItem("token")
                    }
                });
            
                console.log("Fetched blogs:", response.data);
            
                setBlogs(response.data.blogs ||[]);
            }catch(e){
                console.log("Error while fetching blogs", e);
            }finally{
                setLoading(false);
            }
        }
        fetchBlogs();
    }, []);
    return {loading, blogs};
}