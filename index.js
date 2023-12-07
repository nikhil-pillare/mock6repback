const express= require("express");
const app= express();
const cors= require("cors");
app.use(cors());
app.use(express.json());
const userRouter = require('./routes/user.routes');
const blogRouter = require('./routes/blogs.routes')
const auth = require('./middleware/auth.middleware')
const connection = require("./config/db")
require("dotenv").config();

app.use("/",(req,res)=>{
  res.send("welcome to blog api")
})
app.use("/api", userRouter);

app.use("/api",auth,blogRouter)




app.listen(process.env.PORT, async()=>{
    try {
      await connection
        console.log("connected")
    } catch (error) {
      console.log("error in db")
    }
    
})