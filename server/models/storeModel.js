import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const storeSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	currency: {
		type: String,
		required: true,
	},
	stores: {
		type: Array,
		required: true,
	},
	image: {
		type: String,
		required: false,
	},
	productsQuantity: {
		type: Number,
		required: false,
	},
	user_id: {
		type: ObjectId,
		required: true,
	},
})
export const Store = mongoose.model('userStore', storeSchema)
