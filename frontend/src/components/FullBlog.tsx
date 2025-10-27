import type { Blog } from "../hooks";
import { AppBar } from "./AppBar";
import { Avator } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <AppBar />
      <div className="flex justify-center  ">
        <div className="grid grid-cols-12 px-10 w-full pt-12 max-w-screen-xl">
          <div className="col-span-8  ">
            <div className="text-5xl font-extrabold">{blog.title}</div>
            <div className="text-slate-500 pt-2">
              Post on 26 october, 2024 by {blog.author.name}
            </div>

            <div className="   ">{blog.content}</div>
          </div>
          <div className="col-span-4 ">
          <div className="text-slate-600 text-lg">  Author</div>
            <div className="flex  ">
                <div className="flex justify-center flex-col pr-4">
                      <Avator size={"big"}  name={blog.author.name || "Anonymous"} />
                </div>
               <div>
                <div className="text-xl font-bold">
 
                {blog.author.name || "Anonymous"}
               </div>
              <div className="pt=2 text-slate-500">
          
                Random catch phrase about author the author' ability to grab the
                user attention.
              </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullBlog;
