import { PrismaClient } from "../generated/prisma/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
import { signupInput, signinInput } from "@grptl/median-common";
export const userRouter = new Hono<{
    Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
    }
}>();

 

userRouter.get("/me", async (c) => {
   const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
    
    const authHeader = c.req.header("Authorization")||"";
       try{
          const payload = await verify(authHeader, c.env.JWT_SECRET);
          console.log("Payload in /me:", payload);
          const userId = (payload as { id: string }).id;
          const user = await prisma.user.findUnique({
            where:{
                id: userId
            },
            select:{
                id:true,
                name:true,
                username:true
            }
          });
       if(user){
              return c.json({ user: user  });
            
       }else{
           c.status(403);
           return c.json({ message: "You are not logged in" }, 403);
       }}catch(e){
           c.status(403);
           return c.json({ message: "You are not logged in" }, 403);
       }
  
});

userRouter.post("/signup", async (c) => {
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }
   const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
 
  //zod , hashed the password
  const trimUsername:string = body.username.toString().trim();
  console.log("Trimmed Username:", trimUsername);
  try {
    const user = await prisma.user.create({
      data: {
        username: trimUsername,
        name: body.name,
        password: body.password,
      },
    });

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    console.log("Generated JWT:", jwt);
    const users = await prisma.user.findMany();

    return c.json(
      { message: "User created!", created: user, allUsers: users, token: jwt },
      201
    );
  } catch (e) {
    return c.json({ message: "Error creating user", error: e }, 500);
  }
});

userRouter.post("/signin", async (c) => { 
  console.log("Signin request received");
  const body = await c.req.json();
  
  console.log("Request body:", body);
  const { success } = signinInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }
   const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  //zod , hashed the password
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: body.username,
        password: body.password,
      },
    });
     if (!user) {
        c.status(403);  // Set status to 403 Forbidden / unauthorized
        return c.json({
          message: "Incorrect creds"
        })
      }

       const jwt = await sign({
        id: user.id
      }, c.env.JWT_SECRET);
  
      return c.json({ jwt });
  } catch (e) {
   console.log(e);
      c.status(411);
      return c.json({ msg:'Invalid',erro:e});
  }
})
