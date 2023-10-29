import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import fs from "fs";
import * as mongoose from "mongoose";
import multer from "multer";

import { configs } from "./configs";
import { authRouter, postRouter } from "./routers";
import {authMiddleware} from "./middlewares";

const app = express();

app.use(express.json({ limit: "5mb" }));
app.use(cors());
app.use(express.urlencoded({ limit: "5mb", extended: true }));

// Upload file
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync("uploads")) {
      fs.mkdirSync("uploads");
    }
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use("/uploads", express.static("uploads"));

// Router

app.post("/upload", upload.single("image"), (req: Request, res: Response) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.use("*", authMiddleware.checkAccessToken);
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

const PORT = process.env.PORT || 4444;
app.listen(PORT, () => {
  mongoose.connect(configs.DB_URL);
  console.log(`Server has started on PORT ${PORT} 🥸`);
});
