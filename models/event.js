import mongoose, { model, Schema } from "mongoose";
import uniqueValidator from 'mongoose-unique-validator'

const eventSchema = new Schema({
    user: {
        ref : "Users",
        type: mongoose.Schema.Types.ObjectId,
    },
    title:{
        type:String,
        required:true
    },
    time:{
        start_date: {
            type: Date,
        },
        end_date: {
            type: Date
        },
        moment: {
            type: String,
        }
    },
    description: {
        type: String,
        required: true
    },
    totalTickets: {
        type: Number,
        required: true
    },
    availability: {
        type: Number,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    duration: {
        type: String
    }, 
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    venue: {
        type: String,
        required: true
    },
    star_rating: {
        type: Number,
        
    },
    booking: {
        ref : "Bookings",
        type: mongoose.Schema.Types.ObjectId,
    }

},{ timestamps : true })

eventSchema.plugin(uniqueValidator);

const Events = model("events", eventSchema)

export default Events