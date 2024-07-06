const mongoose=require("mongoose");

const connectdb =async()=>{
    try {
       const resposne = await mongoose.connect(process.env.mongoUrl)
       console.log("db connected");
    } catch (error) {
        console.log("mongo error is:",error);
    }
}

module.exports=connectdb;

 