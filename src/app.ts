import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs";
import { authRouter, postRouter } from "./routers";

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(cors());
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Our policy
app.use(cors());

// Router
app.use("/auth", authRouter);
app.use("/posts", postRouter);

// Make errors object response if something happened
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  return res.status(status).json({
    message: err.message,
    status: err.status,
  });
});

app.listen(configs.PORT, () => {
  mongoose.connect(configs.DB_URL);
  console.log(`Server has started on PORT ${configs.PORT}`);
});
