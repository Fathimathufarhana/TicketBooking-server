import moment from "moment";
import Booking from "../models/booking.js";
import { sendReminderEmail } from "./mailService.js";

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
            const context = {
                first_name: user.first_name,
                last_name: user.last_name,
                event_title: event.title,
                booking_date: moment(booking.date).format('MMMM Do YYYY')
            }

            await sendReminderEmail(userEmail, emailSubject, context);
        }
    } catch (error) {
        console.error("Failed to send reminder emails:", error);
    }
};

export default sendReminderEmails;
