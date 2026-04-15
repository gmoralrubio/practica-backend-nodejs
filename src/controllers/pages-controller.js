export function homePageController(req, res, next) {
	res.render('index.html', {
		title: 'Home page',
	})
}
