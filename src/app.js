import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import express from 'express'
import morgan from 'morgan'
import ejs from 'ejs'

import { pagesRouter } from './routes/pages-router.js'
import { productsRouter } from './routes/products-routes.js'

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
app.use('/products', productsRouter)

// Handler 404
app.use((req, res) => {
	res.status(404).send('Resource not found')
})

export default app
