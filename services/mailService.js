import transporter from '../config/mailerConfig.js';

export const sendConfirmationEmail = async (to, subject, text) => {

    const mailOptions = {
        from: process.env.EMAIL_USER,
        // template: "booking_confirm_email",
        to,
        subject,
        text 
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("confirmation mail sent")
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
        console.log("updation mail sent")
    } catch (error) {
        console.log(error,"nodemailer error")
    }
};


export const sendReminderEmail = async (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        // template: "booking_confirm_email",
        to,
        subject,
        text 
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("reminder mail sent")
    } catch (error) {
        console.log(error,"nodemailer error")
    }
};