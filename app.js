import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from './routes/userRoutes.js'
import eventRoutes from './routes/eventRoutes.js'
import testRoutes from './routes/testRoutes.js'
import bookingRoutes from './routes/bookingRoutes.js'
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import { fileURLToPath } from 'url';
import { dirname, join } from "path";
import cron from 'node-cron';
import sendReminderEmails from "./services/reminderService.js";
import paymentRoutes from './routes/paymentRoutes.js';



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


dotenv.config()
// console.log(process.env.EMAIL_USER)
connectDB()
const app = express()
const port = process.env.PORT || 8000

app.use(cors())
app.use(express.json())

app.use("/user", userRoutes)
app.use("/events", eventRoutes)
app.use("/test", testRoutes)
app.use("/booking", bookingRoutes)
app.use('/payments', paymentRoutes);

cron.schedule('0 8 * * *', async () => {
    console.log('Running daily job to send reminder emails');
    await sendReminderEmails();
});

app.use('', express.static(join(__dirname, '/uploads')));

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`Server running on port ${port}`));