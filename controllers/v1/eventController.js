import { validationResult } from "express-validator";
import HttpError from "../../middlewares/httpError.js";
import Events from "../../models/event.js";
import fs from "fs"
import Booking from "../../models/booking.js";
import { sendUpdationEmail } from "../../services/mailService.js";

export const createEvent = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (! errors.isEmpty() ) {

            return next( new HttpError( "Something went wrong...", 422 ) )
        } else {
            const { role } = req.userData;
            const { 
                title, 
                start_date,
                end_date,
                moment,
                description,
                totalTickets,
                duration,
                latitude,
                longitude,
                venue,
                star_rating,
                price
            } = req.body;

            const image = req.file ? process.env.BASE_URL + "cover_images/" + req.file.filename : null;
    
            if ( role !== 'admin' ) {
                return next( new HttpError( "Access denied!!", 500 ) );
            } else {

                const savedEvent = await new Events({
                    title,
                    time :{
                        start_date,
                        end_date,
                        moment
                    },
                    location: {
                        latitude,
                        longitude
                    },
                    description,
                    totalTickets,
                    availability: totalTickets ,
                    duration,
                    image,
                    venue,
                    star_rating,
                    price
                   }).save()
               
         
                   if (! savedEvent) {
                     return next(new HttpError("Oops! Process failed, please do contact admin", 500));
                   } else { 
                       res.status(201).json({
                         status: true,
                         message: 'New Event created',
                         data: null,
                         access_token: null
                       });
                   }
            }
        }
    } catch (error) {
        return next(new HttpError("Oops! Process failed, please do contact admin", 500));
    }
}

export const listEvents = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (! errors.isEmpty() ) {
            return next(new HttpError("Something went wrong...", 422))
        } else {

        const { q, price } = req.body

        let query = {isDeleted : false}

        if( q ){
            const searchValue = q.toLowerCase()
            query.title = { $regex: searchValue, $options: "i" }
        }

        if( price ){
            query.price = { $lte : price }
        }

        const events = await Events.find(query)
            res.status(200).json({
                status: true,
                message: '',
                data: process.env.NODE_ENV === 'dev' ? events : null,
                access_token: null
            })
        }
    } catch (err) {
        return next( new HttpError( "Oops! Process failed, please do contact admin", 500 ) )
    }
}

export const viewEvent = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (! errors.isEmpty() ) {
            return next( new HttpError( "Something went wrong...", 422 ))
        } else {
            const { event_id } = req.body

            const viewEvent = await Events.findOne({ _id: event_id })

           if(! viewEvent) {

            return next( new HttpError( "Invalid credentials", 404 ))
           } else {
            res.status(200).json({
                status: true,
                message: '',
                data: process.env.NODE_ENV === 'dev' ? viewEvent : null,
                access_token: null
            })
           }
        }
    } catch ( error ) {
        return next( new HttpError( "Oops! Process failed, please do contact admin", 500 ) );
    }
}

export const deleteEvent = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (! errors.isEmpty()) {
            return next( new HttpError( "Something went wrong...", 422 ))
        } else {
            const { role } = req.userData
            const { event_id } =req.body;

            if ( role !== 'admin' ) {
               
                return next( new HttpError( "Access denied!!", 500 ) );
            } else {
                await Events.findOneAndUpdate(
                    { _id :event_id },
                    { isDeleted : true },
                    { new : true }
                    )
                res.status(200).json({  
                    status: true,
                    message: 'Event deleted',
                    data: null,
                    access_token: null 
                })
            }
        }
    } catch ( error ) {
        return next( new HttpError( "Oops! Process failed, please do contact admin", 500 ) );
    }
}

export const editEvent = async(req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new HttpError("Something went wrong...", 422));
        } else {
            const { role } = req.userData;
            const { 
                event_id,
                title, 
                start_date,
                end_date,
                moment,
                description,
                totalTickets,
                duration,
                latitude,
                longitude,
                venue,
                price
            } = req.body;

            if (role !== 'admin') {
                return next(new HttpError("Access denied!!", 500));
            } else {
                const eventData = await Events.findOne({ _id: event_id });
                const image = req.file ? 
                    process.env.BASE_URL + "/cover_images/" + req.file.filename : 
                    eventData.image;

                if (req.file && eventData.image !== null) {
                    const prevImgPath = eventData.image.slice(22);
                    fs.unlink(`./uploads/${prevImgPath}`, (err) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                    });
                } 

                const updatedEventData = {
                    title, 
                    start_date,
                    end_date,
                    moment,
                    description,
                    totalTickets,
                    duration,
                    latitude,
                    longitude,
                    venue,
                    price,
                    image
                };

                const editEvent = await Events.findOneAndUpdate(
                    { _id: event_id },
                    updatedEventData,
                    { new: true }
                );

                if (! editEvent) {
                    return next(new HttpError("Oops! Process failed, please do contact admin", 500));
                } else {
                    const bookings = await Booking.find({ event: event_id }).populate('user');

                    for (const booking of bookings) {
                        const user = booking.user;
                        const userEmail = user.email;
                        const emailSubject = 'Event Update Notification';
                        const context = {
                            first_name: user.first_name,
                            last_name: user.last_name,
                            title: editEvent.title
                        }

                        await sendUpdationEmail(userEmail, emailSubject, context);
                    }

                    res.status(200).json({  
                        status: true,
                        message: 'Event updated',
                        data: process.env.NODE_ENV === 'dev' ? editEvent : null,
                        access_token: null
                    });
                }
            }
        }
    } catch (error) {
        return next(new HttpError("Oops! Process failed, please do contact admin", 500));
    }
}
