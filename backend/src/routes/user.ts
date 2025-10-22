import { PrismaClient } from "../generated/prisma/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signupInput, signinInput } from "@grptl/median-common";
export const userRouter = new Hono<{
    Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
    }
}>();

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
  try {
    const user = await prisma.user.create({
      data: {
        username: body.username,
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
      return c.text('Invalid');
  }
})
