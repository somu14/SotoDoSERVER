const mongoose=require("mongoose");

const connectdb =async()=>{
    try {
       const resposne = await mongoose.connect("mongodb://localhost:27017/SoToDo")
       console.log("db connected");
    } catch (error) {
        console.log(error);
    }
}

module.exports=connectdb;

 