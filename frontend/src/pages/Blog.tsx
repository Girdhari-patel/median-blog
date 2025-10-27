import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import FullBlog from "../components/FullBlog";

 
//atomFamiles/selector families
export const Blog = () => {
    const {id} = useParams();
    const {loading, blog} = useBlog(id ||"" );
    if(loading){
        return <div>Loading...</div>
    }
  return (
    <div>
        {blog && <FullBlog blog={blog}/>}
    </div>
  )
}

export default Blog