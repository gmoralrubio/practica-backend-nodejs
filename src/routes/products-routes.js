import express from 'express'
import { productsPageController } from '../controllers/products-controller.js'

export const productsRouter = express.Router()

productsRouter.get('/', productsPageController)
