import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

const app = express();

// MIDDLEWARE
export const corsOptions = {
  origin: (origin, cb) => cb(null, true),
  credentials: true,
};
app.use(cookieParser());
app.use(cors(corsOptions));

export default app;
