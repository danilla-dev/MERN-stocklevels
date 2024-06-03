import express from 'express'
import { getSales, postSale, getSalesOfProduct } from '../controllers/saleController.js'
import requireAuth from '../middleware/requireAuth.js'

const router = express.Router()

router.use(requireAuth)

// GET all sales
router.get('/date', getSales)

// GET sales of product
router.get('/:id', getSalesOfProduct)

// POST new sale
router.post('/', postSale)

export default router
