import express from "express"
import { check } from "express-validator"
import { register, authConfirmTest, login, settings, view, list } from "../controllers/v1/userController.js"
import authCheck from "../middlewares/authCheck.js";


const router = express.Router()

router.post( '/login',
[
    check('email').not().isEmpty(),
    check('password').not().isEmpty()
], login);

router.post('/register',
[
    check('first_name').not().isEmpty(),
    check('address').not().isEmpty(),
    check('gender').not().isEmpty(),
    check('age').not().isEmpty(),
    check('email','Invalid Email').not().isEmpty().isEmail(),
    check('password','The minimum password length is 6 characters').isLength({min: 6})
] ,register)

router.post('/list', list)
router.use(authCheck);

router.post('/test_auth_check', authConfirmTest)
router.patch('/settings', settings)
router.post('/view', view)


export default router