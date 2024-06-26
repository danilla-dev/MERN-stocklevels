import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const saleSchema = new Schema(
	{
		product_id: {
			type: String,
			required: true,
		},
		EAN: {
			type: String,
			required: false,
		},
		quantity: {
			type: Number,
			required: true,
		},
		store: {
			type: String,
			required: true,
		},
		user_id: {
			type: ObjectId,
			required: true,
		},
	},
	{ timestamps: true }
)
export const Sale = mongoose.model('userSale', saleSchema)
