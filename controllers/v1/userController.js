import { validationResult } from "express-validator";
import HttpError from "../../middlewares/httpError.js";
import bcrypt from "bcrypt"
import Users from "../../models/user.js";
import jwt from "jsonwebtoken";



  export const register = async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if ( ! errors.isEmpty() ) {
        
        return next( new HttpError( "Invalid data inputs passed, Please check your data before retry!", 422 ));
            } else {
          const { 
            first_name, 
            last_name,
            gender,
            email, 
            password, 
            role,
            age,
            address,
            phone,
          } = req.body

        const existingUser = await Users.findOne({ email })
        if ( existingUser ){
          return next( new HttpError( "User already exist!!", 500 ));
        }
      const saltRounds = parseInt(process.env.SALT_ROUNDS);
    
      const salt = bcrypt.genSaltSync( saltRounds );
      const hash = bcrypt.hashSync( password, salt );
      const savedUser = await new Users({ 
        first_name, 
        last_name,
        gender,
        email, 
        password : hash, 
        role,
        age,
        address,
        phone,
      }).save();

        if ( ! savedUser ){
          return next( new HttpError( "Oops! Something went wrong!!", 500 ) );
        } else {
              res.status(200).json({ 
                status: true,
                message: 'New user Registered',
                data: process.env.NODE_ENV === 'dev' ? savedUser : null,
                access_token: null 
              })

        }
    }
    } catch ( error ) {
      console.log(error.message,"register")
        return next( new HttpError( "Oops! Process failed, please do contact admin", 500 ) );
    }
  }

  export const login = async (req, res, next) => {
    try {
      const errors = validationResult(req);
        if ( ! errors.isEmpty() ) {
            return next( new HttpError("Invalid data inputs passed, Please check your data before retry!",422));
        } else {
            const { email } = req.body 
            const user = await Users.findOne({ email })
            
            if ( ! user ) {
              return next( new HttpError( "Invalid credentials",400 ) )
            } else {
              const isPassword = await bcrypt.compare( req.body.password, user.password );
              
             if ( isPassword ) {
                 const token = jwt.sign(
                  { userId : user._id, userEmail : user.email, role : user.role }, 
                  process.env.JWT_SECRET,
                  { expiresIn: process.env.JWT_TOKEN_EXPIRY }
                   );
                 
                 res.status(200).json({
                   status : true,
                   message : 'Login successful',
                   access_token : token,
                   result:{
                    role: user.role, 
                    _id: user._id
                   }
                 })
             }
             else{
              return next( new HttpError( "Invalid credentials", 500 ) );
             }
             }
        }
    } catch ( error ) {
        return next( new HttpError( "Oops! Process failed, please do contact admin", 500 ) );
    }
  }

  export const authConfirmTest = async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if ( ! errors.isEmpty() ) {

        return next( new HttpError( 
          "Invalid data inputs passed, Please check your data before retry!",
          422 
          ));
      } else {
        const { userId } = req.userData 
         res.status(200).json({
                status : true,
                message : '',
                data: userId,
                access_token : null
              })
          }
    } catch ( error ) {
      return next( new HttpError( "Oops! Process failed, please do contact admin", 500 ) );
    }
  };

  export const settings = async (req, res, next) => {
    try {
      const errors = validationResult(req);
        if ( ! errors.isEmpty() ) {
            return next( new HttpError("Invalid data inputs passed, Please check your data before retry!",422));
        } else {
          const { 
            user_id,
            first_name, 
            last_name,
            gender,
            email, 
            password, 
            role,
            age,
            address,
            phone,
          } = req.body
          // console.log(req.body.data.user_id,"req.body")

          const user = await Users.findOneAndUpdate({ _id: user_id },
            {
              first_name, 
              last_name,
              gender,
              email, 
              password, 
              role,
              age,
              address,
              phone,
            },
            { new: true }
          )
          console.log(user,"user")
          if ( ! user ){
            console.log(user)
            return next( new HttpError( "Oops! Process failed, please do contact assdmin", 500 ) );
        } else {
            res.status(200).json({  
                status: true,
                message: 'user updated',
                data: process.env.NODE_ENV === 'dev' ? user : null,
                access_token: null
            })
        }

        }
    } catch (error) {
      console.log(error)
      return next( new HttpError( "Oops! Process failed, please do contact admin", 500 ) );
    }
  }

  export const view = async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (! errors.isEmpty() ) {
          return next( new HttpError( "Something went wrong...", 422 ))
      } else {
          const { user_id } = req.body

          const viewUser = await Users.findOne({ _id: user_id })

         if(! viewUser) {

          return next( new HttpError( "User Does not exists!!", 404 ))
         } else {
          res.status(200).json({
              status: true,
              message: '',
              data: viewUser,
              access_token: null
          })
         }
      }
  } catch (error) {
      console.log(error.message)
      return next( new HttpError( "Oops! Process failed, please do contact admin", 500 ) );
  }
  }

  export const list = async (req, res, next) => {
    try {
      const errors = validationResult(req)
        if (! errors.isEmpty() ) {
            return next(new HttpError("Something went wrong...", 422))
        } else {
          const users = await Users.find()
          res.status(200).json({
            status: true,
            message: '',
            data: users,
            access_token: null
        })
        }
    } catch (error) {
      return next( new HttpError( "Oops! Process failed, please do contact admin", 500 ) )
    }
  }