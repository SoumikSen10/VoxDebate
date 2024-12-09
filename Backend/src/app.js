import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.routes.js";

const app = express();

app.use(cors());

// Configuring for different types of data acceptance
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "30kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//Routes
app.use("/api/v1/users", userRouter);

export { app };
