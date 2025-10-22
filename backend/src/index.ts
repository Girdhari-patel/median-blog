import { Hono } from "hono";

import { PrismaClient } from "./generated/prisma/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.route("/api/v1/user/", userRouter);
app.route("/api/v1/blog/", blogRouter);


app.get("/", async (c) => {
  try {
    console.log("Received POST request with data:");
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
  return c.json({ message: "Received POST request" });
});

export default app;
