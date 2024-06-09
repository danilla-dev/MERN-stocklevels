import express from 'express'
import { getSalesOfProducts, postSale, getSalesOfProduct, getSales } from '../controllers/saleController.js'
import requireAuth from '../middleware/requireAuth.js'

const router = express.Router()

router.use(requireAuth)

// GET all sales
router.get('/date', getSales)
// GET one sale
// router.get('/:id', getSale)

// GET all sales of products
router.get('/products/date', getSalesOfProducts)

// GET sales of product
router.get('/product/:id', getSalesOfProduct)

// POST new sale
router.post('/', postSale)

export default router
