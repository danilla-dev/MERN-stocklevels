import dotenv from 'dotenv'
dotenv.config()
console.log(dotenv.config())
import express from 'express'
import mongoose from 'mongoose'
import userRoutes from './routes/user.js'
import productsRoutes from './routes/productsRoutes.js'
import storeRoutes from './routes/storeRoutes.js'
import saleRoutes from './routes/saleRoutes.js'
import cookieParser from 'cookie-parser'
import multer from 'multer'
import path from 'path'
const __dirname = path.resolve()

// express app
const app = express()

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

// middleware
app.use(express.json())
app.use(cookieParser())

// routes
app.use('/api/user', userRoutes)
app.use('/api/sales', saleRoutes)
app.use('/api/products', upload.single('image'), productsRoutes)
app.use('/api/store', upload.single('image'), storeRoutes)

if (process.env.NODE_ENV === 'production') {
	console.log(__dirname)
	app.use(express.static(path.join(__dirname, '/client/dist')))
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
	})
} else {
	app.get('/', (req, res) => {
		res.send('API is running')
	})
}
// connect to db
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		// listen for requests
		app.listen(process.env.PORT, () => {
			console.log('connected to db & listening on port', process.env.PORT)
		})
	})
	.catch(error => {
		console.log(error)
	})
