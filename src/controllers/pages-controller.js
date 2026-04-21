import { getProducts } from '../data/productRepository.js'

export async function homePageController(req, res, next) {
	const products = await getProducts()

	res.render('index.html', {
		title: 'Bienvenido',
		tags: ['work', 'motor', 'lifestyle', 'mobile'],
		products: products,
	})
	return
}
