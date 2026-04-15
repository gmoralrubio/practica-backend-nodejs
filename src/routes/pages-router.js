import express from 'express'

import { homePageController } from '../controllers/pages-controller.js'

export const pagesRouter = express.Router()

pagesRouter.get('/', homePageController)
