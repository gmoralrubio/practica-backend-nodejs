import { getPaginatedProducts, getProductsCount } from '../data/product-repository.js'

export async function homePageController(req, res, next) {
	const page = Number(req.query.page)
	const productsPerPage = 5
	const productsToSkip = page * productsPerPage
	const productsCount = await getProductsCount()

	const filteredProducts = await getPaginatedProducts(productsToSkip, productsPerPage)
	const pages = productsCount / productsPerPage

	res.render('index.html', {
		title: 'Bienvenido',
		products: filteredProducts,
		pages,
		currentPage: page || 0,
	})
	return
}
