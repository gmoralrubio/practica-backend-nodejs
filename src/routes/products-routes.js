import express from 'express'
import {
	productPageController,
	productsPageController,
	createProductController,
	newProductPageController,
} from '../controllers/products-controller.js'

export const productsRouter = express.Router()

// Create
productsRouter.get('/new', newProductPageController)
productsRouter.post('/', createProductController)

// Read
productsRouter.get('/', productsPageController)
productsRouter.get('/:productId', productPageController)
