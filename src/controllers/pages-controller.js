import { getProducts } from '../data/productRepository.js'

export async function homePageController(req, res, next) {
	const products = await getProducts()

	res.render('index.html', {
		title: 'Home page',
		products: products,
		tags: ['work', 'lifestyle', 'motor', 'mobile'],
	})
	return
}
