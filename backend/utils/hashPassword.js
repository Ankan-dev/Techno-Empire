const bcrypt = require('bcrypt');
const Student = require('../models/student-model.js');

// Function to hash the password
const hashingPassword = async (password) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error("Error in hashingPassword:", error);
        return false;
    }
};

// Function to verify the password
const verifyPassword = async (email, password) => {
    try {
        // Find the student by email
        const savedUser = await Student.findOne({ email: email });
        if (!savedUser) {
            return false;
        }
        
        // Compare the provided password with the saved hashed password
        const validPassword = await bcrypt.compare(password, savedUser.password);
        if (!validPassword) {
            return false;
        }

        // Optionally remove sensitive information before returning the user
        savedUser.password = undefined;
        savedUser.refreshToken = undefined;

        return savedUser;
    } catch (error) {
        console.error("Error in verifyPassword:", error);
        return false;
    }
};

module.exports = { hashingPassword, verifyPassword };
