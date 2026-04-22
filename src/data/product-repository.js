import { Product } from '../models/product-model.js'

export async function getProducts() {
	const products = Product.find({})
	return products
}

export async function getFilteredProducts(productsToSkip, productsPerPage) {
	const products = Product.find({}).skip(productsToSkip).limit(productsPerPage)
	console.log(products)

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
