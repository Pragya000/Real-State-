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
const PORT = process.env.PORT || 8800;

const app = express();

const allowedOrigins = [
 
  process.env.CLIENT_URL,
].filter(Boolean); // Removes undefined/null if env is missing

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
         console.log("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS: " + origin));
      }
    },
    credentials: true,
  })
);

 console.log("Allowed Origins:", allowedOrigins);


app.use(express.json());
app.use(cookieParser());

console.log("It is working fine")
app.use("/api/post" , postRoute);




app.use("/api/posts" , postRoute);
app.use("/api/auth" , authRoute);
app.use("/api/test" , testRoute);
app.use("/api/users" , userRoute);


app.use("/api/chats" , chatRoute);
app.use("/api/messages" , messageRoute);


app.get("/", (req, res) => {
  res.send("API is running 🚀");
});


app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
})


