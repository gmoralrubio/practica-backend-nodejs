import { readFile } from 'node:fs/promises'
import { Product } from '../models/product-model.js'
import { connectToDB } from './database.js'

async function initDB() {
	const connection = await connectToDB()

	const fileUrl = new URL('../data/initProducts.json', import.meta.url)
	const fileContents = await readFile(fileUrl, 'utf-8')
	const products = JSON.parse(fileContents)

	await Product.deleteMany({})
	console.log('Productos eliminados')

	await Product.insertMany(products)
	console.log('Productos insertados')

	connection.close()
}

initDB()
