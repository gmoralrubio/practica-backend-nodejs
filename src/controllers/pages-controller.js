import { getFilteredProducts, getProducts } from '../data/product-repository.js'

export async function homePageController(req, res, next) {
	const page = Number(req.query.page)
	const productsPerPage = 5
	const productsToSkip = page * productsPerPage
	const products = await getProducts()

	const filteredProducts = await getFilteredProducts(productsToSkip, productsPerPage)
	const pages = products.length / productsPerPage

	res.render('index.html', {
		title: 'Bienvenido',
		products: filteredProducts,
		pages,
		currentPage: page || 0,
	})
	return
}
