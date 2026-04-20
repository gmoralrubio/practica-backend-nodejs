export async function homePageController(req, res, next) {
	// TODO: Añadir checkeo de usuario. Si no está logado, mostrar en vista. Si está logado, mostrar productos de usuario

	res.render('index.html')
	return
}
