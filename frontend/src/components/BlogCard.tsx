import { Link } from "react-router-dom";

 

interface BlogCardProps{
    id: string;
    authorName:string;
    title:string;
    content:string;
    publishedDate:string;
}
const BlogCard = ({id,authorName, title, content, publishedDate}:BlogCardProps) => {
  console.log(authorName, title, content, publishedDate);
  return (
      
     <Link to={`/blog/${id}`}>
      <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-sm cursor-pointer hover:bg-slate-100"> 
          <div className="flex">
            
    
                  <Avator name={authorName} size={"small"} />
               
                 <div className="font-extralight pl-2 text-sm flex justify-center flex-col" >
                  {authorName}

                 </div>
                 <div className="flex justify-center flex-col pl-2">
                    <Circle />
                 </div>
                 <div className="pl-2 font-thin text-slate-400 text-sm flex justify-center flex-col">
                  {publishedDate}
                  </div>
            
          </div>
          <div className="text-xl font-semibold pt-2">
              {title}

          </div>
          <div className="text-sm font-thin">
              {content.slice(0, 250) + "..."}
          </div>
          <div className="text-sm font-thn text-slate-500 pt-4">
              {` ${Math.ceil(content.length / 100)} min(s) read`}
          </div>

      </div>
      </Link>
  )
}

function Circle(){
    return <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
}
export function Avator({name, size="small"}:{name:string, size?:"small"|"medium"|"big"|number}) {

  function splitName({name}: {name: string}): string {
  const parts = name.trim().split(/\s+/);
  console.log(parts);
const fisrtLetter = parts[0][0];
const lastLetter = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return `
${fisrtLetter}${lastLetter}
  `
}
    return <div className={`relative inline-flex items-center justify-center  overflow-hidden bg-gray-100 rounded-full ${size=="small"?"w-6 h-6":"w-10 h-10"} dark:bg-gray-600`}>
    <span className={`font-extralight ${size=="small"?"text-xs":"text-md"} text-gray-600 dark:text-gray-300`}>{splitName({name})}</span>
</div>
}

export default BlogCard