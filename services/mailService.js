import transporter from '../config/mailerConfig.js';

export const sendConfirmationEmail = async (to, subject, text) => {
    // console.log(to, "- to", subject, text, 'params')
    console.log(to,"to")
    console.log(subject,"subject")
    console.log(text,"text")

    const mailOptions = {
        from: process.env.EMAIL_USER,
        // template: "booking_confirm_email",
        to,
        subject,
        text 
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("mail sent")
    } catch (error) {
        console.log(error,"nodemailer error")
    }
};


export const sendUpdationEmail = async (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        // template: "booking_confirm_email",
        to,
        subject,
        text 
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("mail sent")
    } catch (error) {
        console.log(error,"nodemailer error")
    }
};