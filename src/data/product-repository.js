import { Product } from '../models/product-model.js'

export async function getProducts() {
	const products = Product.find({})
	return products
}

export async function getProductsCount(filter) {
	const productsCount = Product.find(filter).countDocuments()
	return productsCount
}

export async function getMostExpensiveProduct() {
	const mostExpensiveProduct = Product.findOne({}).sort({ price: -1 })
	return mostExpensiveProduct
}
console.log()

export async function getFilteredProducts(skip, limit, sort, filter) {
	const products = Product.find(filter).skip(skip).limit(limit).sort(sort)

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

export async function addNewProduct(product) {
	const newProduct = new Product(product)
	await newProduct.save()

	return newProduct
}

export async function updateProduct(productId, ownerId, updatedProduct) {
	const product = await Product.findOneAndUpdate(
		{
			_id: productId,
			owner: ownerId,
		},
		{
			$set: {
				name: updatedProduct.name,
				price: updatedProduct.price,
				tags: updatedProduct.tags,
			},
		},
	)

	return product
}

export async function deleteProduct(productId, ownerId) {
	const deleteResult = await Product.findOneAndDelete({
		_id: productId,
		owner: ownerId,
	})
	return deleteResult
}
