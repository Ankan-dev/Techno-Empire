const Teacher = require('../models/teacher-model.js');
const { sendEmail } = require('../utils/verifyEmail.js')
const { OneTimePassword } = require('../utils/OTPGenerator.js');
const { generateAccessToken, generateRefreshToken } = require('../utils/generateAccessAndRefreshToken.js');



const generateToken = async (email) => {

    try {
        const user = await Student.findOne({ email });
        if (user) {
            const access = generateAccessToken(user._id)
            const refresh = generateRefreshToken(user._id)
            return { access, refresh };
        }
    } catch (error) {
        console.log(error)
    }
}


const sendOTPForVerification= async(email)=>{
    const otp = OneTimePassword();
        const subject = "One Time Password for getting Registered";
        const message = `This code for your verification is ${otp}. This code is valid for 60 seconds. Don't share this with anyone as it can lead to major security issues`;

        const isEmailSent = await sendEmail(email, subject, message);

        if (!isEmailSent) {
            return false
        }
        return true;
}

const Register = async (req, res) => {
    const { fullname, email } = req.body;
    if (!fullname || !email) {
        return res.status(404)
            .json({
                message: "Credentials are required",
                success: false
            })
    }

    try {
        const teacherExists = Teacher.findOne({ email });
        if (teacherExists) {
            //console.log(teacherExists);
            return res.status(403)
                .json({
                    message: "user already exists",
                    success: false
                })
        }

        const createTeacher = await Teacher.create({ fullname: fullname, email: email })

        if (!createTeacher) {
            return res.status(500)
                .json({
                    message: "Internal server error",
                    success: false
                })
        }

        const isEmailSent=await sendOTPForVerification(email)


        if (!isEmailSent) {
            return res.status(404)
                .json({
                    message: "Email not found",
                    success: false
                })
        }

        const storeOTP = await Teacher.findOneAndUpdate({ email }, { $set: { verificationCode: otp } }, { new: true });

        if (!storeOTP) {
            return res.status(404)
                .json({
                    message: "Email not found",
                    success: false
                })
        }

        return res.status(201)
            .json({
                message: "Otp hasbeen send to your mail",
                success: true
            })

    } catch (error) {
        console.log("Error has occured")
        console.log(error.message);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message
        });
    }
}

const validateCode = async (req, res) => {
    const code = req.body;
    if (!code) {
        return res.status(404)
            .json({
                message: "Please enter the code",
                success: false
            })
    }

    const getTeacher = await Teacher.findOne({ email });

    if (!getTeacher) {
        return res.status(404)
            .json({
                message: "Teacher doesn't exists",
                success: false
            })
    }

    const getCode = getTeacher.verificationCode;
    if (!getCode) {
        return res.status(404)
            .json({
                message: "Code doesn't exists in the database",
                success: false
            })
    }

    if (getCode !== code) {
        return res.status(401)
            .json({
                message: "The code is incorrect",
                success: false
            })
    }

    const isVerified = await Teacher.findOneAndUpdate({ email }, { $set: { verified: true } }, { new: true });

    if (!isVerified) {
        return res.status(500)
            .json({
                message: "Internal server error",
                success: false
            })
    }

    const removeCode = await Teacher.findOneAndUpdate({ email }, { $set: { verificationCode: "" } }, { new: true });
    if (!removeCode) {
        return res.status(500)
            .json({
                message: "Internal server error",
                success: false
            })
    }

    const { access, refresh } = await generateToken(email);
    //console.log(access,refresh);

    if (!access || !refresh) {
        return res.status(400).json({
            message: "Failed to generate tokens",
            success: false
        })
    }


    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .cookie("AccessToken", access, options)
        .cookie("RefreshToken", refresh, options)
        .json({
            message: "User verified successfully",
            success: true
        });


}

const login=async (req,res)=>{
    const email=req.body;
    if(!email){
        res.status(404)
            .json({
                message:"Enter your email",
                success:false
            })
    }

    try {
      
        const isEmailSent=await sendOTPForVerification(email)


        if (!isEmailSent) {
            return res.status(404)
                .json({
                    message: "Email not found",
                    success: false
                })
        }
        
        const storeOTP = await Teacher.findOneAndUpdate({ email }, { $set: { verificationCode: otp } }, { new: true });

        if (!storeOTP) {
            return res.status(404)
                .json({
                    message: "Email not found",
                    success: false
                })
        }
        return res.status(201)
            .json({
                message: "Otp hasbeen send to your mail",
                success: true
            })

    } catch (error) {
        console.log("Error has occured")
        console.log(error.message);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message
        });
    }

    
}

module.exports={Register,validateCode,login};