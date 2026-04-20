import { Product } from '../models/product-model.js'

export async function getProducts() {
	const products = Product.find({})
	return products
}

export async function getProductsByUser(userId) {
	const products = Product.find({
		owner: userId,
	})
	return products
}

export async function getProduct(productId) {
	const product = Product.findOne({ _id: productId })
	return product
}
