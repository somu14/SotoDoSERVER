const express=require("express");
const bodyParser=require("body-parser");
const connectdb = require("./models/db");
require('dotenv').config();
const cookieParser = require('cookie-parser');
const app=express();
app.use(bodyParser.json());

connectdb();
app.use(cookieParser());

//routes
//signuproutes
app.use("/signup",require("./routes/Signup"));
//loginroutes
app.use("/login",require("./routes/Login"));
//home route
app.use("/home",require("./routes/Home"))

app.listen(3000,()=>{
    console.log("server is running");
})