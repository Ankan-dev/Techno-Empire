const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587, // Use 587 for STARTTLS
            secure: false, // Set to false for STARTTLS
            auth: {
                user: process.env.PROVIDER, // Your Gmail address
                pass: process.env.PASSWORD, // Your Gmail password or App Password
            },
        });

        // Send mail with defined transport object
        const info = await transporter.sendMail({
            from: process.env.PROVIDER, // Sender address
            to: email, // List of receivers
            subject: subject, // Subject line
            text: text, // Plain text body
            html: `<b>${text}</b>`, // HTML body
        });

        console.log("Message sent: %s", info.messageId);
        return info.messageId; // Return the message ID on success
    } catch (error) {
        console.error("Error sending email:", error);
        throw error; // Throw the error to handle it where the function is called
    }
};

module.exports = { sendEmail };
