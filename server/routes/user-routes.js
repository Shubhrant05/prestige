import express from 'express'
import {signupController, signinController, googleController, updateUserController} from '../controllers/user-controllers.js'
import {verifyUser} from '../../verifyUser.js'
const router = express.Router()

router.post('/signup', signupController)
router.post('/signin', signinController)
router.post('/google', googleController)
router.post('/update/:id', verifyUser, updateUserController)
export default router