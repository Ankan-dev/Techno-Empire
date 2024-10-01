const Student = require('../models/student-model.js');
const Token = require('../models/student-token-model.js');
const { hashingPassword, verifyPassword } = require('../utils/hashPassword.js');
const { OneTimePassword } = require('../utils/OTPGenerator.js');
const { sendEmail } = require('../utils/verifyEmail.js');
const { generateAccessToken, generateRefreshToken } = require('../utils/generateAccessAndRefreshToken.js');


const generateToken = async (email) => {

    try {
        const user = await Student.findOne({ email });
        if (user) {
            const access = generateAccessToken(user._id,user.email)
            const refresh = generateRefreshToken(user._id,user.email)
            return { access, refresh };
        }
    } catch (error) {
        console.log(error)
    }
}

const RegisterStudent = async (req, res) => {
    const { fullname, email, password } = req.body;

    // Validate input fields
    if (!fullname || !email || !password) {
        console.log("ulala")
        return res.status(400).json({
            message: "Enter the required fields",
            success: false
        });
    }

    console.log(email);

    try {
        // Check if the student already exists
        const isExistStudent = await Student.findOne({ email });
        if (isExistStudent) {
            console.log(true)
            return res.status(409).json({
                message: "User already exists",
                success: false
            });
        }

        
        // Hash the password
        const hashedPassword = await hashingPassword(password);
        console.log(hashedPassword);
        // Create a new student
        const newStudent = await Student.create({ fullname, email, password: hashedPassword });

        if (newStudent) {
            const otp = OneTimePassword();
            const subject = "Email Id Verification Mail";
            const text = `Your One Time Password is \n OTP: ${otp}\n Do not share this with anybody.`;

            // Send the OTP via email
            let emailResponse = await sendEmail(email, subject, text);
            console.log(emailResponse);
            if (!emailResponse) {
                return res.status(400).json({
                    message: "Failed to send verification email",
                    success: false
                });
            }

            // Save the OTP token to the database
            await Token.create({ email: email, student: emailResponse._id, token: otp });

            return res.status(200).json({
                message: "Student created successfully. Please verify your email.",
                success: true
            });
        } else {
            // Handle the case where creation fails
            return res.status(500).json({
                message: "Failed to create student",
                success: false
            });
        }
    } catch (error) {
        // Handle unexpected errors
        console.log("Error has occured")
        console.log(error.message);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message
        });
    }
};

const verifyEmail = async (req, res) => {
    const { email, code } = req.body;
    console.log(code)

    if (!email) {
        return res.status(400).json({
            message: "Email not provided",
            success: false
        });
    }

    if (!code) {
        return res.status(400).json({
            message: "OTP code not provided",
            success: false
        });
    }

    try {
        const codeFromDb = await Token.findOne({ email });
        if (!codeFromDb) {
            return res.status(401).json({
                message: "Invalid OTP code",
                success: false
            });
        }

        console.log(codeFromDb);
        if (codeFromDb.token === code) {
            const updateStatus = await Student.findOneAndUpdate({ email: email }, { verified: true }, { new: true });
            if (!updateStatus) {
                return res.status(400).json({
                    message: "Failed to update user status",
                    success: false
                })
            }

            const deleteToken = await Token.deleteOne({ email });
            if (!deleteToken) {
                return res.status(400).json({
                    message: "Failed to delete OTP token",
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

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message
        });
    }
}


const profile = async (req, res) => {
    const User = req.user;
    if (!User) {
        return res.status(400)
            .json({
                message: "user details are missing",
                success: false
            })
    }

    return res.status(200)
        .json({
            message: "Profile details fetched successfully",
            data: User,
            success: true
        })
}


const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400)
            .json({
                message: "Username or password is missing",
                success: false,
            })
    }

    const verifiedUser = await verifyPassword(email, password);
    console.log(verifiedUser)
    if (verifiedUser === false) {
        return res.status(401)
            .json({
                message: "Wrong Password",
                success: false,
            })
    }

    if (verifiedUser.verified === false) {
        return res.status(401)
            .json({
                message: "user not verified",
                success: false,
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
            message: "user loggedin successfully",
            data: verifiedUser,
            success: true
        })

}




const logout = async (req, res) => {
    const user = req.user
    if (!user) {
        return res.status(400)
            .json({
                message: "User not found",
                success: false
            })
    }

    const deleteRefreshToken = await Student.findOneAndUpdate({ email: user.email }, { refreshToken: "" }, { new: true });

    if (!deleteRefreshToken) {
        return res.status(500)
            .json({
                message: "Internal server Error",
                success: false
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
            message: "user logged out successfully",
            success: true
        })
}

const deleteToken=async(req,res)=>{
    const {email}=req.body;
    if(!email){
        return res.status(400)
        .json({
            message:"email not found",
            success:false
        })
    }

    try {
        const deleteStatus= await Token.findOneAndUpdate({ email: email }, { refreshToken: "" }, { new: true });
        if(!deleteStatus){
            return  res.status(500)
            .json({
                message:"token not deleted",
                success:false
            })
        }
        return res.status(201)
        .json({
            message:"token is deleted",
            success:true
        })
    } catch (error) {
        return res.status(500)
        .json({
            message:"Internal server error",
            success:false
        })
    }
    
    
}

const resendCode=async(req,res)=>{
    const {email}=req.body;
    console.log(email);
    if(!email){
        return res.status(400)
        .json({
            message:"email not found",
            success:false
        })
    }
    const otp = OneTimePassword();
    const subject = "Email Id Verification Mail";
    const text = `Your One Time Password is \n OTP: ${otp}\n Do not share this with anybody.`;

    // Send the OTP via email
    let emailResponse = await sendEmail(email, subject, text);
    console.log(emailResponse);
    if (!emailResponse) {
        return res.status(400).json({
            message: "Failed to send verification email",
            success: false
        });
    }

    // Save the OTP token to the database
    await Token.create({ email: email, student: emailResponse._id, token: otp });

    return res.status(200).json({
        message: "Student created successfully. Please verify your email.",
        success: true
    }); 
}


const updateProfileDetails = async (req, res) => {
    const { name, phone, college, cgpa } = req.body;

    const updateData = {};
    if (name) updateData.fullname = name;
    if (phone) updateData.phone = phone;
    if (college) updateData.college = college;
    if (cgpa) updateData.cgpa = cgpa;

    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({
            message: "Please send some data to update",
            success: false,
        });
    }

    try {
        const response = await Student.findByIdAndUpdate(req.user._id, updateData, { new: true });
        if (!response) {
            return res.status(404).json({
                message: "Student not found",
                success: false,
            });
        }

        const updatedData=await Student.findOne(req.user._id).select("-password -refreshToken");
        if(!updatedData){
            return res.status(404).json({
                message: "Student not found",
                success: false,
            });
        }
        return res.status(200).json({
            message: "Details updated successfully",
            success: true,
            data: updatedData
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message,
        });
    }
};



module.exports = { RegisterStudent, verifyEmail, profile,login, logout,deleteToken,resendCode,updateProfileDetails };
