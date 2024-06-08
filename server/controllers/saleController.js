import { Sale } from '../models/saleModel.js'
import { Product } from '../models/productModel.js'
import { SoldProduct } from '../models/soldProduct.js'
import dayjs from 'dayjs'
import mongoose from 'mongoose'
const { ObjectId } = mongoose.Types

export const getSales = async (req, res) => {
	Date.prototype.setToWarsawTime = function () {
		this.setTime(this.getTime() + 2 * 60 * 60 * 1000)

		this.setUTCHours(21, 59, 59, 999)
	}

	const user_id = new mongoose.Types.ObjectId(req.user.id)
	const { start, end } = req.query
	const startDate = new Date(start)
	let endDate = new Date(end)
	endDate.setToWarsawTime()
	startDate

	try {
		const salesByDate = await Sale.find({
			user_id,
			createdAt: { $gte: startDate, $lte: endDate },
		}).sort({
			createdAt: -1,
		})
		res.status(200).json({ sales: salesByDate })
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

export const getSalesOfProduct = async (req, res) => {
	const user_id = req.user.id
	const product_id = req.params.id

	try {
		const sale = await SoldProduct.find({ user_id, product_id }).sort({
			createdAt: -1,
		})
		res.status(200).json({ sale })
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

export const postSale = async (req, res) => {
	const user_id = req.user.id

	const saleDataArray = [...req.body]
	const store = saleDataArray.shift().store

	try {
		let soldProductsIDS = []

		const saleData = await Sale.create({
			products: soldProductsIDS,
			store,
			user_id,
		})
		const saleID = saleData._id

		for (const element of saleDataArray) {
			const { EAN, product_id, quantity } = element

			let product = await Product.findOne({ user_id, product_id })

			////////////// check exist
			if (!product) {
				console.log('Co ty chcesz sprzedac niby? xD')

				return res.status(404).json({ message: `Product not found. [ ${product_id} ]` })
			}

			////////////// check quantity
			const productQuantity = product.quantity

			if (quantity > productQuantity) {
				console.log('nie masz tyle debiilu')
				return res.status(400).json({ message: `Not enough products in store. [ ${product_id} ]` })
			}

			////////////// create sold doc DZIAłA
			const sold = await SoldProduct.create({
				product_id,
				EAN,
				quantity,
				store,
				user_id: new ObjectId(user_id),
			})
			soldProductsIDS.push(sold._id)

			/// update product quantity DZIAłA
			await Product.updateOne(
				{ user_id, product_id },
				{
					$inc: { quantity: -quantity },
					$push: { sales: saleID },
				}
			)
		}
		console.log(soldProductsIDS)

		// update SALE - Sale have all sold products
		await Sale.findByIdAndUpdate(saleID, {
			$set: {
				products: soldProductsIDS,
			},
		})

		// get updated previewProduct
		const previewProduct = await Product.findOne({
			user_id,
			product_id: saleDataArray[0].product_id,
		})

		const allProducts = await Product.find({
			user_id,
		})
		return res.status(200).json({ product: previewProduct, products: allProducts })
	} catch (error) {
		console.log(error)
		return res.status(400).json({ error: error.message })
	}
}
