import { validationResult } from "express-validator";
import stripe from "../../config/stripe.js";
import HttpError from "../../middlewares/httpError.js";

export const createPaymentIntent = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new HttpError("Invalid input, please check your data", 422));
        } else {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: req.body.amount,
                currency: 'usd',
            });
            res.status(200).json({
                status: true,
                message: 'Payment intent created successfully',
                clientSecret: paymentIntent.client_secret,
                access_token: null
            });
        }
    } catch (error) {
        console.log(error.message);
        return next(new HttpError("Oops! Process failed, please contact admin", 500));
    }
};
