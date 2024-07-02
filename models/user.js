const mongoose=require("mongoose");

const TaskSchema = new mongoose.Schema({
    taskName: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    dueDate: {
      type: Date,
      //required: true
    },
    completed: {
      type: Boolean,
      default: false
    }
  });
  

const userschema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    tasks: [TaskSchema]
});

const userModel=mongoose.model('user',userschema);

module.exports=userModel;

