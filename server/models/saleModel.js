import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const saleSchema = new Schema(
	{
		products: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'SoldProduct',
			},
		],
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
