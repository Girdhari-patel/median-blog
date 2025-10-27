import { createBlogInput, updateBlogInput } from "@grptl/median-common";
import { PrismaClient } from "../generated/prisma/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { decode, verify } from "hono/jwt";
 
export const blogRouter = new Hono<{
    Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
    },
     Variables: {
        userId: string;
    }
}>();

blogRouter.use("/*", async(c, next)=>{
    //extract the user id from the jwt token

    // pass it down the router handler

    const authHeader = c.req.header("Authorization")||"";
    try{
       const user = await verify(authHeader, c.env.JWT_SECRET);
    if(user){
        c.set("userId", String(user.id));
        await next();
    }else{
        c.status(403);
        return c.json({ message: "You are not logged in" }, 403);
    }}catch(e){
        c.status(403);
        return c.json({ message: "You are not logged in" }, 403);
    }
   
    }
    // if (!authHeader) {
    //     return c.json({ message: "Missing Authorization header" }, 401);
    // }
    // const token = authHeader.replace("Bearer ", "");
    // try {
    //     const payload = decode(token, c.env.JWT_SECRET);
    //     c.set("userId", payload.id);
    //     return next();
    // } catch (e) {
    //     return c.json({ message: "Invalid token", error: e }, 401);
    // }
);
blogRouter.post("/", async (c) => {
     const body = await c.req.json();
       const { success } = createBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }
     const autherId = c.get("userId");
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

    const blog = await prisma.blog.create({
        data: {
            title:body.title,
            content: body.content,
            authorId: autherId, // assuming authorId is 1 for simplicity
        }
    })

    return c.json({id : blog.id})
});

blogRouter.put("/", async (c) => {
  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }
 const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL	,
    }).$extends(withAccelerate());

    const blogs = await prisma.blog.update({
        where: { id: body.id },
        data: {
            title:body.title,
            content: body.content,
        }
    });
    return c.json({ id : blogs.id });
   
}); 



//// Todo:pagination
blogRouter.get("/bulk", async (c) => {
    console.log("Fetching all blogs");
   const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL	,
    }).$extends(withAccelerate());
    
    try{
        const blogs = await prisma.blog.findMany({
            select:{
                content: true,
                title: true,
                id: true,
                author:{
                    select:{
                        name:true
                    }
                }

            }
        });
        console.log(blogs);
    return c.json({ blogs  }); 
    }catch(e){
     c.status(411);
     return c.json({messege:"error whilefetching blogs"})
    }
   

});

blogRouter.get("/:id", async (c) => {
    const id = c.req.param("id");
   const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL	,
    }).$extends(withAccelerate());
    
    try{
        const blog = await prisma.blog.findFirst({
        where: { id: id },
        select:{
                content: true,
                title: true,
                id: true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
    });
    return c.json({ blog  }); 
    }catch(e){
     c.status(411);
     return c.json({messege:"error whilefetching blog"})
    }
   

})

// blogRouter.get("api/v1/blog/posts/:id", async (c) => {
//   const { id } = c.req.param();
//   return c.json({ message: `Details of blog post ${id}` });
// });

// blogRouter.put("api/v1/blog/posts/:id", async (c) => {
//   const { id } = c.req.param();
//   const body = await c.req.json();
//   return c.json({ message: `Blog post ${id} updated`, data: body });
// });

// blogRouter.delete("api/v1/blog/posts/:id", async (c) => {
//   const { id } = c.req.param();
//   return c.json({ message: `Blog post ${id} deleted` });
// });