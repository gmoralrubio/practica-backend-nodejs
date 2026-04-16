import express from 'express'
import {
	productPageController,
	productsPageController,
} from '../controllers/products-controller.js'

export const productsRouter = express.Router()

productsRouter.get('/', productsPageController)
productsRouter.get('/:productId', productPageController)
