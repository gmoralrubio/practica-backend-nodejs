import { getFilteredProducts, getProductsCount } from '../data/product-repository.js'

export async function homePageController(req, res, next) {
	const skip = Number(req.query.skip) || 0
	const limit = Number(req.query.limit) || 10
	const sort = req.query.sort || {}
	const tag = req.query.tag || ['motor', 'mobile', 'lifestyle', 'motor']
	console.log(tag)

	const productsCount = await getProductsCount()
	const filteredProducts = await getFilteredProducts(skip, limit, sort, tag)

	const pages = Math.ceil(productsCount / limit)
	const maxSkip = (pages - 1) * limit

	console.log(sort)

	res.render('index.html', {
		title: 'Bienvenido',
		products: filteredProducts,
		pages,
		skip,
		maxSkip,
		limit,
	})
	return
}
// Productos por pagina -> limit
// Pagina -> skip
