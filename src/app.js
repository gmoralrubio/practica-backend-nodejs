import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import express from 'express'
import morgan from 'morgan'
import ejs from 'ejs'

import { pagesRouter } from './routes/pages-router.js'

// Creamos la aplicación
const app = express()
const appDir = dirname(fileURLToPath(import.meta.url))

// Global middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.static(join(appDir, '../public')))
app.use(morgan('tiny'))

// Configuracion del motor de plantillas
app.set('view engine', 'html')
app.engine('html', ejs.renderFile)
app.set('views', join(appDir, 'views'))

// Routes
app.use('/', pagesRouter)

export default app
