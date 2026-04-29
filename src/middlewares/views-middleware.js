import TAGS from '../models/TAGS.js'

export function dataInViews(req, res, next) {
	res.locals.errorMessage = null
	res.locals.tags = TAGS
	next()
}
