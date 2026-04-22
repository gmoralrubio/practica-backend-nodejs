import express from 'express'
import {
	productsPageController,
	createProductController,
	newProductPageController,
	editProductController,
	editProductPageController,
} from '../controllers/products-controller.js'

export const productsRouter = express.Router()

// Create
productsRouter.get('/new', newProductPageController)
productsRouter.post('/', createProductController)

// Read
productsRouter.get('/', productsPageController)

// Update
productsRouter.get('/edit/:productId', editProductPageController)
productsRouter.post('/edit/:productId', editProductController)
