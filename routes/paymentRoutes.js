
import express from 'express';
import { createPaymentIntent } from '../controllers/v1/paymentController.js';
import { check } from 'express-validator';

const router = express.Router();

router.post(
    '/create-payment-intent',
    [
        check('amount').not().isEmpty().withMessage('Amount is required'),
    ],
    createPaymentIntent
);

export default router;
