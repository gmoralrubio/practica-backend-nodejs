import { Product } from '../models/product-model.js'

export async function getProducts() {
	const result = Product.find({})

	return result
}
