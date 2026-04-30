import TAGS from '../models/TAGS.js'

export function dataInViews(req, res, next) {
	res.locals.errorMessage = null
	res.locals.tags = TAGS
	res.locals.limitOptions = [5, 10, 15]
	res.locals.sortOptions = {
		nameAsc: { name: 1 },
		nameDesc: { name: -1 },
		priceAsc: { price: 1 },
		priceDesc: { price: -1 },
	}
	next()
}
