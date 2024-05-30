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
            // required: true
        },
        end_date: {
            type: Date
        },
        moment: {
            type: String,
            // required: true
        }
    },
    // location: {
    //     type: {
    //       type: String,
    //       enum: ['Point'],
    //       required: true
    //     },
    //     coordinates: {
    //       type: [Number],
    //       required: true
    //     }
    // },
    location: {
        latitude: {
          type: Number,
        //   required: true
        },
        longitude: {
            type: Number,
            // required: true
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
        // required: true
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
        // default: null,
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
    // log: {
    //     user_id: 
    // }

},{ timestamps : true })

eventSchema.plugin(uniqueValidator);

const Events = model("events", eventSchema)

export default Events