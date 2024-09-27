const Teacher = require('../models/teacher-model.js');
const { sendEmail } = require('../utils/verifyEmail.js')
const { OneTimePassword } = require('../utils/OTPGenerator.js');
const { generateAccessToken, generateRefreshToken } = require('../utils/generateAccessAndRefreshToken.js');




const generateToken = async (email) => {

    try {
        const user = await Teacher.findOne({ email });
        if (user) {
            const access = await generateAccessToken(user._id, email)
            const refresh = await generateRefreshToken(user._id, email)
            return { access, refresh };
        } else {
            return { access: null, refresh: null }; // Return null tokens if user is not found
        }
    } catch (error) {
        return { access: null, refresh: null }; // Return null tokens if user is not found

        //console.log(error)
    }
}


const sendOTPForVerification = async (email) => {
    const otp = OneTimePassword();
    const subject = "One Time Password for getting Registered";
    const message = `This code for your verification is ${otp}. This code is valid for 60 seconds. Don't share this with anyone as it can lead to major security issues`;

    const isEmailSent = await sendEmail(email, subject, message);

    if (!isEmailSent) {
        return false
    }
    return otp;
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
        const teacherExists = await Teacher.findOne({ email });
        if (teacherExists) {
            console.log("Here there is a problem");
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

        const OTP = await sendOTPForVerification(email)


        if (!OTP) {
            return res.status(404)
                .json({
                    message: "Email not found",
                    success: false
                })
        }

        const storeOTP = await Teacher.findOneAndUpdate({ email }, { $set: { verificationCode: OTP } }, { new: true });

        if (!storeOTP) {
            return res.status(404)
                .json({
                    message: "Email not found",
                    success: false
                })
        }

        return res.status(201)
            .json({
                message: "Otp has been send to your mail",
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
    const { email, code } = req.body;

    console.log(email)
    console.log(code);``

    if (!email || !code) {
        return res.status(404).json({
            message: "Credentials missing",
            success: false
        });
    }

    try {
        // Find the teacher in the database
        const getTeacher = await Teacher.findOne({ email });

        if (!getTeacher) {
            return res.status(404).json({
                message: "Teacher doesn't exist",
                success: false
            });
        }

        const getCode = getTeacher.verificationCode;

        if (!getCode) {
            return res.status(404).json({
                message: "Code doesn't exist in the database",
                success: false
            });
        }

        if (getCode !== code) {
            return res.status(401).json({
                message: "The code is incorrect",
                success: false
            });
        }

        // Update the teacher's verified status and remove the verification code in one operation
        const updateTeacher = await Teacher.findOneAndUpdate(
            { email },
            { $set: { verified: true, verificationCode: "" } },
            { new: true }
        );

        if (!updateTeacher) {
            return res.status(500).json({
                message: "Internal server error during update",
                success: false
            });
        }

        // Generate access and refresh tokens
        const { access, refresh } = await generateToken(email);

        if (!access || !refresh) {
            return res.status(400).json({
                message: "Failed to generate tokens",
                success: false
            });
        }

        if (!getTeacher.refreshToken) {

            const updateRefreshToken = await Teacher.findOneAndUpdate({ email }, { $set: { refreshToken: refresh } }, { new: true });

            if (!updateRefreshToken) {
                return res.status(500).json({
                    message: "Internal server error",
                    success: false,
                    error: error.message
                });
            }
        }



        const options = {
            httpOnly: true,
            secure: true,
            sameSite: "Strict"
        };

        const TeacherData = getTeacher.toObject();
        delete TeacherData.verificationCode
        if(TeacherData.refreshToken){
            delete TeacherData.refreshToken;
        }
        return res.status(200)
            .cookie("AccessToken", access, options)
            .cookie("RefreshToken", refresh, options)
            .json({
                message: "User verified successfully",
                data: TeacherData,
                success: true
            });

    } catch (error) {
        console.error("Error occurred: ", error.message);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message
        });
    }
}

const login = async (req, res) => {
    const email = req.body.email;
    if (!email) {
        res.status(404)
            .json({
                message: "Enter your email",
                success: false
            })
    }

    try {

        const OTP = await sendOTPForVerification(email)


        if (!OTP) {
            return res.status(404)
                .json({
                    message: "Email not found",
                    success: false
                })
        }

        const storeOTP = await Teacher.findOneAndUpdate({ email }, { $set: { verificationCode: OTP } }, { new: true });

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

const logout=async(req,res)=>{
    const teacher=req.teacher;
    if(!teacher){
        return res.status(404)
                .json({
                    message:"Teacher not found",
                    success:false
                })
    }

    try {
        const deleteRefreshToken=await Teacher.findOneAndUpdate({email:teacher.email},{$set:{refreshToken:""}},{new:true});
        if(!deleteRefreshToken){
            return res.status(500)
                    .json({
                        message:"Internal server error",
                        success:false
                    })
        }

        const options = {
            httpOnly: true,
            secure: true
        }
    
        return res.status(200)
            .clearCookie("AccessToken", options)
            .clearCookie("RefreshToken", options)
            .json({
                message: "Teacher logged out successfully",
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

module.exports = { Register, validateCode, login,logout };