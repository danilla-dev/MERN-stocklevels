import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const productSchema = new Schema({
	product_id: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: false,
	},
	EAN: {
		type: Number,
		required: false,
	},
	quantity: {
		type: Number,
		required: true,
	},
	image: {
		type: String,
		required: false,
	},
	category: {
		type: String,
		required: true,
	},
	details: {
		type: [],
		required: false,
	},
	sales: {
		type: Array,
		required: false,
	},
	user_id: {
		type: ObjectId,
		required: true,
	},
})

export const Product = mongoose.model('Product', productSchema)
