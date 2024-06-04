import transporter from '../config/mailerConfig.js';

export const sendConfirmationEmail = async (to, subject, context) => {

    const mailOptions = {
        from: process.env.EMAIL_USER,
        template: "booking_confirm_email",
        to,
        subject,
        context
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("confirmation mail sent")
    } catch (error) {
        console.log(error,"nodemailer error")
    }
};


export const sendUpdationEmail = async (to, subject, context) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        template: "event_updation_email",
        to,
        subject,
        context 
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("updation mail sent")
    } catch (error) {
        console.log(error,"nodemailer error")
    }
};


export const sendReminderEmail = async (to, subject, context) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        template: "booking_reminder_email",
        to,
        subject,
        context 
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("reminder mail sent")
    } catch (error) {
        console.log(error,"nodemailer error")
    }
};