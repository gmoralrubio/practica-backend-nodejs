import { getFilteredProducts, getProductsCount } from '../data/product-repository.js'
import TAGS from '../models/TAGS.js'

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

	const tags = []
	let selectedTags = req.query.tags ? tags.concat(req.query.tags) : []

	const filter = {}

	if (selectedTags.length > 0) {
		filter.tags = { $in: selectedTags }
	}

	const productsCount = await getProductsCount(filter)
	const filteredProducts = await getFilteredProducts(skip, limit, sort, filter)

	const pages = Math.ceil(productsCount / limit)

	const queryBase = new URLSearchParams()
	// queryBase.set('page', page)
	queryBase.set('limit', limit)
	queryBase.set('sort', sortQuery)
	selectedTags.forEach((tag) => queryBase.append('tags', tag))

	console.log(queryBase.toString())

	res.render('index.html', {
		title: 'Bienvenido',
		products: filteredProducts,
		currentPage: page,
		selectedTags,
		pages,
		queryBase,
	})
	return
}
