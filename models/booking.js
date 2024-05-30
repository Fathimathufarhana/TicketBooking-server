import mongoose, { model, Schema } from "mongoose";
import uniqueValidator from 'mongoose-unique-validator'

const bookingSchema = new Schema({
    user: {
        ref : "Users",
        type: mongoose.Schema.Types.ObjectId,
    },
    event: {
        ref: "events",
        type: mongoose.Schema.Types.ObjectId,
    },
    date: {
        type: Date,
        required: true
    },
    tickets: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        
    },

    },{ timestamps : true })

bookingSchema.plugin(uniqueValidator);

const Booking = model("Bookings", bookingSchema)

export default Booking