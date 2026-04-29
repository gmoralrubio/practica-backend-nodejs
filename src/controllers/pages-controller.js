import {
	getFilteredProducts,
	getProductsCount,
	getMostExpensiveProduct,
} from '../data/product-repository.js'
import TAGS from '../models/TAGS.js'

export async function homePageController(req, res, next) {
	// Paginación
	const page = Number(req.query.page) || 1
	const limit = Number(req.query.limit) || 10
	const skip = (page - 1) * limit
	// Filtros
	const limitOptions = [5, 10, 15]
	const sortOptions = {
		nameAsc: { name: 1 },
		nameDesc: { name: -1 },
		priceAsc: { price: 1 },
		priceDesc: { price: -1 },
	}
	const sortQuery = req.query.sort || 'nameAsc'
	const sort = sortOptions[sortQuery] || sortOptions['nameAsc']

	const tags = []
	let selectedTags = req.query.tags ? tags.concat(req.query.tags) : []

	const minPrice = Number(req.query.minPrice)
	let maxPrice = Number(req.query.maxPrice)

	const search = req.query.search?.trim() || ''
	console.log(search)

	const filter = {}

	if (selectedTags.length > 0) {
		filter.tags = { $in: selectedTags }
	}

	const mostExpensiveProduct = await getMostExpensiveProduct()
	maxPrice === 0 ? (maxPrice = mostExpensiveProduct.price) : maxPrice

	if (!isNaN(minPrice) || !isNaN(maxPrice)) {
		filter.price = {}
		if (!isNaN(minPrice)) {
			filter.price.$gte = minPrice
		}
		if (!isNaN(maxPrice)) {
			filter.price.$lte = maxPrice
		}
	}

	if (search) {
		filter.$text = { $search: search }
	}

	const productsCount = await getProductsCount(filter)
	const filteredProducts = await getFilteredProducts(skip, limit, sort, filter)

	const pages = Math.ceil(productsCount / limit)

	const queryBase = new URLSearchParams()
	queryBase.set('sort', sortQuery)
	selectedTags.forEach((tag) => queryBase.append('tags', tag))
	queryBase.set('minPrice', minPrice)
	queryBase.set('maxPrice', maxPrice)
	queryBase.set('search', search)

	res.render('index.html', {
		title: 'Bienvenido',
		products: filteredProducts,
		currentPage: page,
		limitOptions,
		limit,
		sortOptions,
		sortQuery,
		selectedTags,
		pages,
		queryBase,
		minPrice,
		maxPrice,
		search,
	})
	return
}
