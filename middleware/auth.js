const jwt=require("jsonwebtoken");

const auth=async(req,res,next)=>{
    try
    {
    const token=req.headers.authorization;
    if(!token)
        {
           return res.status(403).json({message:"not authentic"});
        }
        else
        {
           const result= await jwt.verify(token,process.env.secretkey,(err,user)=>{
            if(err)
                {
                   return res.status(401).json({message:"jwt failed"})
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