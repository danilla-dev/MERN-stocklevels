import { Store } from '../models/storeModel.js'
import { User } from '../models/userModel.js'
import sharp from 'sharp'

export const getStoreData = async (req, res) => {
	const user_id = req.user.id
	try {
		const storeData = await Store.findOne({ user_id })
		res.status(200).json(storeData)
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

export const createStore = async (req, res) => {
	const user_id = req.user.id

	const { name, category, currency, stores, image } = req.body

	const formattedImage = await sharp(req.file.buffer).resize(500, 500).toFormat('webp').toBuffer()
	const imageURL = `data:image/webp;base64,${formattedImage.toString('base64')}`
	try {
		const storeData = await Store.create({
			user_id,
			category,
			name,
			stores: JSON.parse(stores),
			image: imageURL,
			currency,
		})
		await User.updateOne({ _id: user_id }, { $set: { complete: true } })
		const user = await User.findOne({ _id: user_id })
		const complete = user.complete

		res.status(200).json({ storeData, complete })
	} catch (error) {
		console.log(error)
		res.status(400).json({ error: error.message })
	}
}
