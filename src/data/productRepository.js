import { Product } from '../models/product-model.js'

export async function getProducts() {
	const products = Product.find({})
	return products
}

export async function getProduct(_id) {
	const product = Product.findOne({ _id: _id })
	return product
}
