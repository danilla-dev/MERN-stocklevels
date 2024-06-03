import mongoose from 'mongoose'
import { User } from '../models/userModel.js'
import jwt from 'jsonwebtoken'

// Create token
const createToken = _id => {
	return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

// Signup user
export const signupUser = async (req, res) => {
	const { email, password } = req.body

	try {
		// create a user object
		const user = await User.signup(email, password)

		// Create a JWT
		const token = createToken(user._id)

		const complete = user.complete
		// response to site

		res.status(200).json({ email, token, complete })
	} catch (error) {
		res.status(401).json({ error: error.message })
	}
}
// login user
export const loginUser = async (req, res) => {
	const { email, password } = req.body
	try {
		// create a user object
		const user = await User.login(email, password)
		const complete = user.complete
		console.log(complete)

		// Create a JWT
		const token = createToken(user._id)

		// response to site
		res.status(200).json({ email, token, complete })
	} catch (error) {
		res.status(401).json({ error: error.message })
	}
}
