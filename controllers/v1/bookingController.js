import { validationResult } from "express-validator";
import HttpError from "../../middlewares/httpError.js";
import Booking from "../../models/booking.js";
import Events from "../../models/event.js";
import { sendConfirmationEmail } from "../../services/mailService.js";
import Users from "../../models/user.js";

// export const add = async (req, res, next) => {
//     try {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return next(new HttpError("Something went wrong...", 422));
//         } else {
//             const { userId } = req.userData;
//             const { event_id, date, tickets } = req.body;

//             const eventData = await Events.findById(event_id);
//             if ( ! eventData ) {

//                 return next(new HttpError("Event not found", 404));
//             }
//             if ( eventData.availability < tickets ) {
//                 return next(new HttpError("Not enough tickets available", 400));
//             }

//             const savedBooking = await new Booking({
//                 user: userId,
//                 event: event_id,
//                 date,
//                 tickets
//             }).save();

//             if (!savedBooking) {
//                 return next(new HttpError("Oops! Booking failed", 500));
//             } else {
//                 eventData.availability -= tickets;
//                 await eventData.save();
//                 await confirmBooking(savedBooking)

//                 res.status(200).json({
//                     status: true,
//                     message: 'Booking successful',
//                     data: process.env.NODE_ENV === 'dev' ? savedBooking : null,
//                     access_token: null
//                 });
//             }
//         }
//     } catch (error) {
//         console.log(error.message)
//         return next(new HttpError("Oops! Process failed, please do contact admin", 500));
//     }
// };


export const add = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new HttpError("Something went wrong...", 422));
        }

        const { userId } = req.userData;
        const { event_id, date, tickets } = req.body;

        const eventData = await Events.findById(event_id);
        if (!eventData) {
            return next(new HttpError("Event not found", 404));
        }
        if (eventData.availability < tickets) {
            return next(new HttpError("Not enough tickets available", 400));
        }

        const savedBooking = await new Booking({
            user: userId,
            event: event_id,
            date,
            tickets
        }).save();

        if (!savedBooking) {
            return next(new HttpError("Oops! Booking failed", 500));
        } else {
            eventData.availability -= tickets;
            await eventData.save();

            // Send confirmation email
            const user = await Users.findById(userId);
            if (user) {
                const to = user.email;
                const subject = 'Booking Confirmation';
                const body = `Dear ${user.first_name} ${user.last_name},\n\nYour booking for ${eventData.title} on ${date} for ${tickets} tickets is confirmed!\n\nThank you!`;

                await sendConfirmationEmail(to, subject, body);
            }

            res.status(200).json({
                status: true,
                message: 'Booking successful',
                data: process.env.NODE_ENV === 'dev' ? savedBooking : null,
                access_token: null
            });
        }
    } catch (error) {
        console.log(error);
        return next(new HttpError("Oops! Process failed, please do contact admin", 500));
    }
};


export const list = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (! errors.isEmpty() ) {
            return next( new HttpError( "Something went wrong...", 422 ) )
        } else {
            const bookingDetails = await Booking.find()
            .populate({
                path : "user" ,
                select : "first_name last_name email phone_number"
            })
            .populate({
                path : "event" , 
                select : "title time location price"
            })

            res.status(200).json({
                status: true,
                message: '',
                data: process.env.NODE_ENV === 'dev' ? bookingDetails : null,
                access_token: null
            })
        }
    } catch (error) {
        return next(new HttpError("Oops! Process failed, please do contact admin", 500));
    }
}

export const view = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (! errors.isEmpty() ) {
            return next( new HttpError( "Something went wrong...", 422 ))
        } else {
            const { booking_id } = req.body

            const viewBooking = await Booking.findOne({ _id: booking_id })
            .populate({
                path : "user" ,
                select : "first_name last_name email phone_number"
            })
            .populate({
                path : "event" , 
                select : "title time location price"
            })

           if(! viewBooking) {

            return next( new HttpError( "Invalid credentials", 404 ))
           } else {
            res.status(200).json({
                status: true,
                message: '',
                data: process.env.NODE_ENV === 'dev' ? viewBooking : null,
                access_token: null
            })
           }
        }
    } catch ( error ) {
        return next( new HttpError( "Oops! Process failed, please do contact admin", 500 ) );
    }
}

export const myBookings = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            return next(new HttpError("Something went wrong...", 422));
        }

        const { user_id } = req.body;

        if (! user_id) {
            return next(new HttpError("User ID is required", 400));
        }

        const viewBookings = await Booking.find({ user: user_id })
            // .populate({
            //     path: "user",
            //     select: "first_name last_name email"
            // })
            .populate({
                path: "event",
                select: "title venue"
            });

        if ( ! viewBookings || viewBookings.length === 0 ) {
            return next(new HttpError("No bookings found for this user", 404));
        }

        res.status( 200 ).json({
            status: true,
            message: '',
            data: process.env.NODE_ENV === 'dev' ? viewBookings : null,
            access_token: null
        });
    } catch ( error ) {
        return next(new HttpError("Oops! Process failed, please do contact admin", 500));
    }
};

// export const confirmBooking = async (req, res, next) => {
//     try {
//         const errors = validationResult(req)
//         if (! errors.isEmpty() ) {
//             return next( new HttpError( "Something went wrong...", 422 ))
//         } else {
//             const { booking_id } = req.body

//             const bookingDetails = await Booking.findOne({ _id: booking_id })
//             .populate({
//                 path : "event" , 
//                 select : "title date"
//             })
//             .populate({
//                 path : "user" , 
//                 select : "first_name last_name email"
//             })


//             if (! bookingDetails) {
//                 return next( new HttpError( 'Booking not found', 404 ) );
//             }

//             const { date, tickets } = bookingDetails;
//             const to = bookingDetails.user.email
//             const event = bookingDetails.event.title;
//             const name = `${bookingDetails.user.first_name} ${bookingDetails.user.last_name}`;
        
//             const subject = 'Booking Confirmation';
//             const body = `Dear ${name},\n\nYour booking for ${event} on ${date} for ${tickets} tickets is confirmed!\n\nThank you!`;

//             await sendConfirmationEmail( to, subject, body);

//             res.json({ message: "Email sent successfully"})

//         }
//     } catch (error) {
//         console.log(error)
//         return next( new HttpError( "Oops! Process failed, please do contact admin", 500 ) );
//     }
// }