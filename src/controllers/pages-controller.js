import { getFilteredProducts, getProductsCount } from '../data/product-repository.js'

export async function homePageController(req, res, next) {
	// if (req.url !== '/') {
	// 	req.productFilter.owner = req.session.userId
	// }

	const productsCount = await getProductsCount(req.productFilter)
	const filteredProducts = await getFilteredProducts(
		req.productQuery.skip,
		req.productQuery.limit,
		req.productQuery.sort,
		req.productFilter,
	)

	const pages = Math.ceil(productsCount / req.productQuery.limit)

	res.render('index.html', {
		title: 'Bienvenido',
		path: '/',
		products: filteredProducts,
		pages,
		filter: req.productFilter,
		productQuery: req.productQuery,
	})
	return
}
