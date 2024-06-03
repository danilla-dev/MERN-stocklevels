import express from 'express'
// Controller functions
import { signupUser, loginUser } from '../controllers/userController.js'

const router = express.Router()

//Login
router.post('/login', loginUser)
//Signup
router.post('/signup', signupUser)

export default router
