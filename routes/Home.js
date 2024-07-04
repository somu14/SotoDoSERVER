const express = require("express");
const auth = require("../middleware/auth");
const user = require("../models/user");

const router = express();

router.get("/", auth, async (req, res) => {
  try{
  const data=await user.findOne({email:req.user});
  //console.log(data.tasks);
   res.status(200).json({data:data.tasks,message:"data log"});
  }
  catch(err)
  {
   res.status(500).json({message:"Internal server error"});
  }
});

router.post("/createtask", auth, async (req, res) => {
  try{
  const {task, description} =req.body;
  const userdata= await user.findOne({email:req.user});
  const taskdata={
    "taskName":task,
    "description":description,
  }
  userdata.tasks.push(taskdata);
  await userdata.save();
  res.status(200).json({message:"Todo added"});
}
catch(err)
{
  res.status(500).json({message:"Internal server error",errormsg:err});
}
});

router.post("/deletetask/:id",auth, async(req, res) => {
  try{
  const userdata=await user.findOne({email:req.user}); 
  const deleted=userdata.tasks.id(req.params.id)
  userdata.tasks.pull({_id:req.params.id});
  console.log(deleted);
  await userdata.save()
  res.status(200).json({message:"Todo Deleted"});
  }
  catch(err)
  {
    res.status(500).json({message:"Internal server error"});
  }
});

router.post("/updatetask/:id",auth ,async(req, res) => {
  try
 {
  const {task,description,completed}=req.body;
  const upadtedtask={"taskName":task,"description":description};
  const userdata=await user.findOne({email:req.user});
  const taskdata=userdata.tasks.id(req.params.id);
  taskdata.taskName=task
  taskdata.description=description;
  taskdata.completed=completed;
  await userdata.save();
  res.status(200).json({message:"updated"});
 }
 catch(err)
 {
  res.status(500).json({message:"Internal server error"});
 }
});

router.get("/user",auth,async(req,res)=>{
  try{
    const data=await user.findOne({email:req.user});

    return res.status(200).json({message:"userdata",name:data.name,email:data.email}); 
  }
  catch(err)
  {
    return res.status(500).json({message:"Internal  server error"});
  }
})

module.exports = router;
