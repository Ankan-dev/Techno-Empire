const Student =require('../models/student-model.js')
const Teacher=require('../models/teacher-model.js')
const jwt =require('jsonwebtoken');

const authenticateUser = async (req, res, next) => {
    const token = req.cookies?.AccessToken;
    console.log(token);
    
    if (!token) {
        console.log("failed");
        return res.status(400).json({
            message: "cookies are missing",
            success: false
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        const User = await Student.findById(decoded?.id).select("-password -refreshToken");

        if (!User) {
            return res.status(400).json({
                message: "user not found",
                success: false
            });
        }

        req.user = User;  // Attach user data to request object
        next();  // Proceed to the next middleware or route handler

    } catch (error) {
        // Catch any errors related to token verification or database lookup
        console.log(error.message);
        return res.status(401).json({
            message: "Invalid token or user not authorized",
            success: false
        });
    }
};


const authenticateTeacher= async(req,res,next)=>{
    const token=req.cookies?.AccessToken
    if(!token){
        return res.status(400)
        .json({
            message:"cookies are missing",
            success:false
        })
    }

    try {
        
        const decoded=jwt.verify(token,process.env.SECRET);
        const teacher=await Teacher.findById(decoded._id).select("-password -refreshToken");

        if(!teacher){
            res.status(400)
            .json({
                message:"Teacher not found",
                success:false
            })
        }

        req.teacher=teacher;
        next()

    } catch (error) {
        console.log(error.message);
    }
}

module.exports={authenticateUser,authenticateTeacher}