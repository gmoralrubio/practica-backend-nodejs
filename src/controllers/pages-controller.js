import { getProducts } from '../data/product-repository.js'

export async function homePageController(req, res, next) {
	const products = await getProducts()

	res.render('index.html', {
		title: 'Bienvenido',
		products: products,
	})
	return
}
