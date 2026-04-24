import { getFilteredProducts, getProductsCount } from '../data/product-repository.js'
import { TAGS } from '../models/TAGS.js'

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
	const sortQuery = req.query.sort || 'nameAsc'
	const sort = sortOptions[sortQuery] || sortOptions['nameAsc']

	const tag = req.query.tag || TAGS

	const productsCount = await getProductsCount()
	const filteredProducts = await getFilteredProducts(skip, limit, sort, tag)

	const pages = Math.ceil(productsCount / limit)

	res.render('index.html', {
		title: 'Bienvenido',
		products: filteredProducts,
		currentPage: page,
		currentSort: sortQuery,
		pages,
		skip,
		limit,
	})
	return
}
