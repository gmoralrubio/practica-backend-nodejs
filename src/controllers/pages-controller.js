import { getFilteredProducts, getProductsCount } from '../data/product-repository.js'

export async function homePageController(req, res, next) {
	const page = Number(req.query.page) || 1
	const limit = Number(req.query.limit) || 10
	const skip = (page - 1) * limit
	const sort = req.query.sort || {}
	const tag = req.query.tag || ['motor', 'mobile', 'lifestyle', 'motor']

	const productsCount = await getProductsCount()
	const filteredProducts = await getFilteredProducts(skip, limit, sort, tag)

	const pages = Math.ceil(productsCount / limit)
	console.log(pages)

	res.render('index.html', {
		title: 'Bienvenido',
		products: filteredProducts,
		currentPage: page,
		pages,
		skip,
		limit,
	})
	return
}
