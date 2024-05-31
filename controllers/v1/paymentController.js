

import { validationResult } from "express-validator";
import stripe from "../../config/stripe.js";
import HttpError from "../../middlewares/httpError.js";

export const createPaymentIntent = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if ( ! errors.isEmpty() ) {
            return next(new HttpError("Something went wrong...", 422));
        } else {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: req.body.amount,
                currency: 'usd',
            });
            console.log("try block")
            res.status(200).json({
                status: true,
                message: 'Payment done successfully',
                clientSecret: paymentIntent.client_secret,
                access_token: null
            })
        }
    } catch ( error ) {
        console.log(error.message)
        return next(new HttpError("Oops! Process failed, please do contact admin", 500));
    }
};
