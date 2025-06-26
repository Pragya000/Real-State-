import express from "express";
import cors from "cors";
import postRoute from "./routes/post.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();
const PORT = 8800;

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL
].filter(Boolean); // Removes undefined/null if env is missing

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS: " + origin));
      }
    },
    credentials: true,
  })
);

 console.log("Allowed Origins:", allowedOrigins);


app.use(express.json());
app.use(cookieParser());


app.use("/api/post" , postRoute);
app.use("/api/auth" , authRoute);
app.use("/api/test" , testRoute);


app.use("/api/posts" , postRoute);
app.use("/api/auth" , authRoute);
app.use("/api/test" , testRoute);
app.use("/api/users" , userRoute);


app.use("/api/chats" , chatRoute);
app.use("/api/messages" , messageRoute);



app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
})


