import moment from "moment";
import Booking from "../models/booking.js";
import { sendReminderEmail, sendUpdationEmail } from "./mailService.js";

const sendReminderEmails = async () => {
    try {
        const targetDate = moment().add(2, 'days').startOf('day');

        const bookings = await Booking.find({
            date: { $eq: targetDate.toDate() }
        }).populate('user').populate('event');


        for (const booking of bookings) {
            const user = booking.user;
            const event = booking.event;
            const userEmail = user.email;
            const emailSubject = 'Event Reminder';
            const emailBody = `Dear ${user.first_name} ${user.last_name},\n\nThis is a reminder for the event "${event.title}" you have booked, which is scheduled on ${moment(booking.date).format('MMMM Do YYYY')}. We look forward to seeing you there!\n\nThank you!`;

            await sendReminderEmail(userEmail, emailSubject, emailBody);
        }
    } catch (error) {
        console.error("Failed to send reminder emails:", error);
    }
};

export default sendReminderEmails;
