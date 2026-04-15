import { getProducts } from '../data/productRepository.js'

export async function homePageController(req, res, next) {
	const products = await getProducts()
	console.log(products)

	res.render('index.html', {
		title: 'Home page',
		products: products,
	})
	return
}
