import { getFilteredProducts, getProductsCount } from '../data/product-repository.js'

export async function homePageController(req, res, next) {
	// Paginación
	const page = Number(req.query.page) || 1
	const limit = Number(req.query.limit) || 10
	const skip = (page - 1) * limit
	// Filtros
	const sortOptions = {
		nameAsc: { name: 1 },
		nameDesc: { name: -1 },
		priceAsc: { price: 1 },
		priceDesc: { price: -1 },
	}
	const sortQuery = req.query.sort || {}
	const sort = sortOptions[sortQuery]
	const tag = req.query.tag || ['motor', 'mobile', 'lifestyle', 'motor']

	const productsCount = await getProductsCount()
	const filteredProducts = await getFilteredProducts(skip, limit, sort, tag)

	const pages = Math.ceil(productsCount / limit)
	console.log(pages)

	res.render('index.html', {
		title: 'Bienvenido',
		products: filteredProducts,
		currentPage: page,
		currentSort: sort,
		pages,
		skip,
		limit,
	})
	return
}
