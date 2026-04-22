export function dataInViews(req, res, next) {
	res.locals.errorMessage = null
	res.locals.tags = ['work', 'motor', 'lifestyle', 'mobile']
	res.locals.isModalOpen = null
	next()
}
