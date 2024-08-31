const teacher = require('../models/teacher-model.js');
const { verifyPassword, hashingPassword} = require('../utils/hashPassword.js');
const { generateAccessToken, generateRefreshToken } = require('../utils/generateAccessAndRefreshToken.js');
const { OneTimePassword } = require('../utils/OTPGenerator.js');
const { sendEmail } = require('../utils/verifyEmail.js');

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

const createTeacher = async (req, res) => {
    
    try {
        const { fullname, email, password } = req.body;
        if(!fullname || !email || !password){
            return res.json({
                message:"Enter the credentials",
                success:false
            })
        }
        const checkTeacher = await teacher.findOne({ email });
        if (checkTeacher) {
            return res.json({ message: "Teacher already exists", success: false });
        }
        const hash = await hashingPassword(password);  // Ensure you await the hashing function
        const newTeacher = await teacher.create({ fullname, email, password: hash });  // Use a different variable name
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
                message: "Student created successfully. Please verify your email.",
                success: true
            });
        } else {
            return res.status(500).json({
                message: "Failed to create student",
                success: false
            });        }
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

module.exports = createTeacher;