 
import BlogCard from "../components/BlogCard"
import { Skeleton } from "../components/Sketeton";
 
import { useBlogs } from "../hooks";

 

export const Blogs = () => {
    // you cant fetch the blogs from the backend because the backend is not implemented yet
    // so for now we will just render some dummy blogs
    // later we will fetch the blogs from the backend and render them here
    // store it in a state variable
    // store it in directly in here for now
    // const [blogs, setBlogs] = useState<BlogCardProps[]>([])
    // store it in a context varible
    // create our own custom hook called useBlogs to fetch the blogs from the backend
    const {loading, blogs} = useBlogs();
    if(loading){
        return <div className="flex justify-center flex-col">
         <div className="flex justify-center">
            <Skeleton/>
          <Skeleton/>
          <Skeleton/>
         </div>
        </div>
    }
  return (
    <div>
        {/* <AppBar/> */}
    <div className="flex justify-center">
    <div className=""> 
       {blogs.map(blog => <BlogCard
                    id={blog.id}
                    authorName={blog.author.name || " "}
                    title={blog.title}
                    content={blog.content}
                    publishedDate={"2nd Feb 2024"}
        />)}
        {/* <BlogCard
        authorName= {"Girdhari Patel"}
        title= {"How an ugly single page website make $500 a month wihout affiliate marketing"}
        content= {"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
        publishedDate= {"26 Oct 2025"}
        /> */}
          
        
    </div>
    </div>
    </div>
  )
}

 