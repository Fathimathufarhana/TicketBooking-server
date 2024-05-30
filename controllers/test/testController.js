import { validationResult } from "express-validator"
import HttpError from "../../middlewares/httpError.js"
import Events from "../../models/event.js"

export const addVenue = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (! errors.isEmpty()) {

            return next( new HttpError( "Something went wrong...", 422 ))
        } else {
            let insertVenue = await Events.updateMany({},{ venue: "calicut" })
            res.status(200).json({
                status: true,
                message: 'Venue inserted',
                data: null,
                access_token: null
            })
        }
    } catch (error) {
        return next( new HttpError( "Oops! Process failed, please do contact admin", 500 ) );
        
    }
}

export const addRating = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (! errors.isEmpty()) {

            return next( new HttpError( "Something went wrong...", 422 ))
        } else {
            let insertRating = await Events.updateMany({},{ star_rating: 4 })
            res.status(200).json({
                status: true,
                message: 'Rating inserted',
                data: insertRating,
                access_token: null
            })
        }
    } catch (error) {
        return next( new HttpError( "Oops! Process failed, please do contact admin", 500 ) );
        
    }
}