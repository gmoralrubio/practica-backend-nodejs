import express from 'express'
import {
	productPageController,
	productsPageController,
	createProductController,
} from '../controllers/products-controller.js'

export const productsRouter = express.Router()

productsRouter.get('/', productsPageController)
productsRouter.post('/', createProductController)
productsRouter.get('/:productId', productPageController)
