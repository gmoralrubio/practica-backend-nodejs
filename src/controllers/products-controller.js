import { getProducts, getProduct } from '../data/productRepository.js'

export async function productsPageController(req, res, next) {
	const products = await getProducts()

	res.render('products.html', {
		title: 'Editar productos',
		products: products,
	})
}

export async function productPageController(req, res, next) {
	const productId = req.params.productId

	const product = await getProduct(productId)
	console.log(product)

	res.render('product.html', {
		title: 'Producto',
		product: product,
	})
}
