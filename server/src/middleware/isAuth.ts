import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import * as Express from "express";

interface MyContext {
  req: Express.Request;
  payload?: { userId: number };
}

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const authorization = context.req.headers["authorization"];

  if (!authorization) {
    throw new Error("Not authenticated");
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, "yourSecretKey");
    context.payload = payload as any;
  } catch (err) {
    throw new Error("Not authenticated");
  }

  return next();
};
