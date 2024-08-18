const Student =require('../models/student-model.js')
const jwt =require('jsonwebtoken');

const authenticateUser= async(req,res,next)=>{
    const token=req.cookies?.AccessToken
    console.log(token);
    if(!token){
        console.log("failed")
        return res.status(400)
        .json({
            message:"cookies are missing",
            success:false
        })
    }

   

    try {
        const decoded=jwt.verify(token,process.env.SECRET);
        const User=await Student.findById(decoded?.id).select("-password -refreshToken"); 

        if(!User){
            res.status(400)
            .json({
                message:"user not found",
                success:false
            })
        }

        req.user=User;
        next();
        
    } catch (error) {
        console.log(error.message);
    }
}

module.exports=authenticateUser