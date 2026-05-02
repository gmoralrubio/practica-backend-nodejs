import { readFile } from 'node:fs/promises'

import { User } from '../models/user-model.js'
import { Product } from '../models/product-model.js'
import { connectToDB } from '../lib/database.js'

console.log('Init SeedDB')

const connection = await connectToDB()
console.log(`Connected to MongoDB: ${connection.name}`)

await seedUsers()
await seedProducts()

await connection.close()
process.exit(0)

async function seedUsers() {
	const USERS = [
		{
			username: 'John Doe',
			email: 'johndoe@email.com',
			password: await User.hashPassword('1234'),
		},
		{
			username: 'Admin',
			email: 'admin@email.com',
			password: await User.hashPassword('1234'),
		},
	]

	const deleteResult = await User.deleteMany({})
	console.log(`Deleted [${deleteResult.deletedCount}] users`)

	const insertedUsers = await User.insertMany(USERS)
	console.log(`Inserted [${insertedUsers.length}] users`)
}

async function seedProducts() {
	const fileUrl = new URL('../data/init-products.json', import.meta.url)
	const fileContents = await readFile(fileUrl, 'utf-8')
	const products = JSON.parse(fileContents)

	const [jd, ad] = await Promise.all([
		User.findOne({ email: 'johndoe@email.com' }),
		User.findOne({ email: 'admin@email.com' }),
	])

	// Asigna usuario a productos alternos
	const productsWithOwner = products.map((product, index) => {
		return { ...product, owner: index % 2 === 0 ? jd._id : ad._id }
	})

	const deleteResult = await Product.deleteMany({})
	console.log(`Deleted [${deleteResult.deletedCount}] products`)

	const insertedProducts = await Product.insertMany(productsWithOwner)
	console.log(`Inserted [${insertedProducts.length}] products`)
}
