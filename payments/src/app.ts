import { currentUser, errorHandler, NotFoundError } from "@gytickets/common";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import express from "express";
import "express-async-errors";
import { createChargeRouter } from "./routes/new";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);
app.use(currentUser);

//Routes
app.use(createChargeRouter);

//Route doesn't match any route handlers
app.all("*", async (req, res, next) => {
  throw new NotFoundError();
});

//Error Handler
app.use(errorHandler);

export { app };
