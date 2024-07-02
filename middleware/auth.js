const jwt=require("jsonwebtoken");

const auth=async(req,res,next)=>{
    try
    {
    const token=req.cookies.token;
    if(!token)
        {
            res.status(400).json({message:"not authentic"});
        }
        else
        {
           const result= await jwt.verify(token,process.env.secretkey,(err,user)=>{
            if(err)
                {
                    res.redirect("/login");
                }
                req.user=user.email;
                next();
           })
        }
    }catch(err)
    {
        res.status(500).json({message:"Internal server error"});
    }

}

module.exports=auth;