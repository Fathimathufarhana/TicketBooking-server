import jwt from "jsonwebtoken";
import HttpError from "./httpError.js";
// import Employee from "../models/employ.js";
// import { User } from "../models/user.js";
import User from "../models/user.js"


const authCheck = async (req, res, next) => {
    if ( req.method === "OPTIONS" ) {
        return next()
    } else {
        try {
            const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null
            if ( ! token ) {
                return next( new HttpError( 'Authentication failed!', 403 ) )
            } else {
                
                const decodedToken = jwt.verify( token,process.env.JWT_SECRET )
                const validUser = await User.findOne({ 
                    _id : decodedToken.userId , 
                    role : decodedToken.role 
                })
                if ( ! validUser ) {
                    return next( new HttpError( error.message,400 ) )
                } else {
                    req.userData = { userId : decodedToken.userId , role : decodedToken.role }
                    next()
                }
            }
        } catch ( error ) {
            return next( new HttpError( 'Authentication failed!', 403 ) )
        }
    }
}
export default authCheck;