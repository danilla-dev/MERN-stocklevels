import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const saleSchema = new Schema(
	{
		products: [
			{
				type: { type: Schema.Types.ObjectId, ref: 'soldProduct' },
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
