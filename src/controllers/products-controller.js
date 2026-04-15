import { getProducts } from '../data/productRepository.js'

export async function productsPageController(req, res, next) {
	const products = await getProducts()

	res.render('products.html', {
		title: 'Productos',
		products: products,
	})
}
