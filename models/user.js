import { model, Schema } from "mongoose";
import uniqueValidator from 'mongoose-unique-validator'

const userSchema = new Schema({
  
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
    },
    gender: {
        type: String,
        enum: ["male", "female", "others"]
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password: {
         type: String, 
         required: true 
    },
    role: {
        type: String,
        default:"client"
    },
    age: {
        type: Number,
        required: true
    },
    address: {
        city: {
            type: String
        },
        country: {
            type: String
        },
        pin_code: {
            type: Number
        },
        state: {
            type: String
        }
    },
    phone: {
        phone_number: {
            type: Number,
            unique: true
        },
        country_code: {
            type: String,
            required: true,
            
        }
    },
    isdeleted: {
        type: Boolean,
        default: false
    }

},{ timestamps : true })

userSchema.plugin(uniqueValidator);

const Users = model("Users", userSchema)

export default Users