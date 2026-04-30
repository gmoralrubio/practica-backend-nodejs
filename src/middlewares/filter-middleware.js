import { getMostExpensiveProduct } from '../data/product-repository.js'

export async function filterProductsMiddleware(req, res, next) {
	req.productFilter = {}

	// Paginación
	const page = Number(req.query.page) || 1
	const limit = Number(req.query.limit) || 10
	const skip = (page - 1) * limit
	// Filtros
	const sortOptions = res.locals.sortOptions
	const sortQuery = req.query.sort || 'nameAsc'
	const sort = sortOptions[sortQuery] || sortOptions['nameAsc']

	const tags = []
	let selectedTags = req.query.tags ? tags.concat(req.query.tags) : []

	const mostExpensiveProduct = await getMostExpensiveProduct()
	const minPrice = Number(req.query.minPrice) || 0
	let maxPrice = Number(req.query.maxPrice) || mostExpensiveProduct.price

	const search = req.query.search?.trim() || ''

	if (selectedTags.length > 0) {
		req.productFilter.tags = { $in: selectedTags }
	}

	if (!isNaN(minPrice) || !isNaN(maxPrice)) {
		req.productFilter.price = {}
		if (!isNaN(minPrice)) {
			req.productFilter.price.$gte = minPrice
		}
		if (!isNaN(maxPrice)) {
			req.productFilter.price.$lte = maxPrice
		}
	}

	if (search) {
		req.productFilter.$text = { $search: search }
	}

	const queryBase = new URLSearchParams()
	queryBase.set('limit', limit)
	queryBase.set('sort', sortQuery)
	selectedTags.forEach((tag) => queryBase.append('tags', tag))
	queryBase.set('minPrice', minPrice)
	queryBase.set('maxPrice', maxPrice)
	queryBase.set('search', search)
	console.log(queryBase.toString())

	req.productQuery = {
		skip,
		limit,
		sort,
		currentPage: page,
		sortQuery,
		selectedTags,
		queryBase,
		minPrice,
		maxPrice,
		search,
	}

	next()
}
