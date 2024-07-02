const express=require("express");
const bcrypt=require("bcrypt");
const router=express.Router();
const user=require("../models/user");
const userExist=require("../middleware/userexixst")

router.post("/",userExist,async (req,res)=>{
    const values=req.body;
    try
    {
    const userdata=new user();
    const hashedpassword=await bcrypt.hash(values.password,10);
    userdata.name=values.name;
    userdata.email=values.email;
    userdata.password=hashedpassword;
    userdata.tasks=[];
    await userdata.save();
    res.status(200).json({message:"Signup success"});
    }
    catch(err)
    {
        res.status(500).json({message:"Internal Server error"});
    }
})


module.exports=router;