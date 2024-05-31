import express from 'express';
import { createPaymentIntent } from '../controllers/v1/paymentController.js';

const router = express.Router();

router.post('/create-payment-intent', createPaymentIntent);

export default router;
