import express from 'express'
import {
	getProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
	getFilterProducts,
} from '../controllers/productsController.js'
import requireAuth from '../middleware/requireAuth.js'

const router = express.Router()

router.use(requireAuth)

// GET all products
router.get('/', getProducts)

// GET filter products
router.get('/filter', getFilterProducts)

// GET single product
router.get('/:id', getProduct)

// POST new product
router.post('/', createProduct)

// UPDATE product
router.patch('/:id', updateProduct)

// DELETE product
router.delete('/:id', deleteProduct)

export default router
