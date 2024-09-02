const Teacher = require('../models/teacher-model.js');
const { verifyPassword, hashingPassword} = require('../utils/hashPassword.js');
const { generateAccessToken, generateRefreshToken } = require('../utils/generateAccessAndRefreshToken.js');
const { OneTimePassword } = require('../utils/OTPGenerator.js');
const { sendEmail } = require('../utils/verifyEmail.js');
const Token = require('../models/student-token-model.js');

const generateToken = async (email) => {

    try {
        const user = await Teacher.findOne({ email });
        if (user) {
            const access = generateAccessToken(user._id)
            const refresh = generateRefreshToken(user._id)
            return { access, refresh };
        }
    } catch (error) {
        console.log(error)
    }
}

const RegisterTeacher = async (req, res) => {
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
        // Check if the teacher already exists
        const isExistTeacher = await Teacher.findOne({ email });
        if (isExistTeacher) {
            return res.status(409).json({
                message: "Teacher already exists",
                success: false
            });
        }

        
        // Hash the password
        const hashedPassword = await hashingPassword(password);
        // Create a new student
        const newTeacher = await Teacher.create({ fullname, email, password: hashedPassword });

        if (newTeacher) {
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
                message: "Teacher created successfully. Please verify your email.",
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
            const updateStatus = await Teacher.findOneAndUpdate({ email: email }, { verified: true }, { new: true });
            if (!updateStatus) {
                return res.status(400).json({
                    message: "Failed to update Teacher status",
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
                    message: "Teacher verified successfully",
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
    const teacher = req.user;
    if (!teacher) {
        return res.status(400)
            .json({
                message: "Teacher details are missing",
                success: false
            })
    }

    return res.status(200)
        .json({
            message: "Profile details fetched successfully",
            data: teacher,
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

    const verifiedTeacher = await verifyPassword(email, password);
    console.log(verifiedTeacher)
    if (verifiedTeacher === false) {
        return res.status(401)
            .json({
                message: "Wrong Password",
                success: false,
            })
    }

    if (verifiedTeacher.verified === false) {
        return res.status(401)
            .json({
                message: "Teacher not verified",
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
            message: "Teacher loggedin successfully",
            data: verifiedTeacher,
            success: true
        })

}




const logout = async (req, res) => {
    const teacher = req.user
    if (!teacher) {
        return res.status(400)
            .json({
                message: "Teacher not found",
                success: false
            })
    }

    const deleteRefreshToken = await Teacher.findOneAndUpdate({ email: teacher.email }, { refreshToken: "" }, { new: true });

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
            message: "Teacher logged out successfully",
            success: true
        })
}

module.exports = {RegisterTeacher,verifyEmail,profile,login,logout};