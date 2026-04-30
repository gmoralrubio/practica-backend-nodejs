import express from 'express'
import {
	loginPageController,
	loginActionController,
	logoutActionController,
	registerPageController,
	registerActionController,
} from '../controllers/auth-controller.js'

export const authRouter = express.Router()

authRouter.get('/login', loginPageController)
authRouter.post('/login', loginActionController)
authRouter.get('/logout', logoutActionController)
authRouter.get('/register', registerPageController)
authRouter.post('/register', registerActionController)
