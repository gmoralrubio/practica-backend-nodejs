import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import express from 'express'
import morgan from 'morgan'
import { pagesRouter } from './routes/pages-router.js'

// Creamos la aplicación
const app = express()
const appDir = dirname(fileURLToPath(import.meta.url))

// Global middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.static(join(appDir, '../public')))
app.use(morgan('tiny'))

// Routes
app.use('/', pagesRouter)

export default app
