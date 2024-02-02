import express from "express";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import mongoose from "mongoose";
import session from "express-session";
import clickRouter from "./routes/clickRouter.js";

const app = express();
mongoose
    .connect(process.env.MONGO_URL || "mongodb://127.0.0.1/URL_Shortner")
    .then(() => console.log("Connected to user db!"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET || 'My-secret-key', // Change this to a random string
    resave: false,
    saveUninitialized: true,
}));

app.use('/auth', authRouter);
app.use('/user',userRouter)
app.use('/',clickRouter);

app.listen(process.env.PORT || 8000, () => console.log("server on localhost:8000..."));