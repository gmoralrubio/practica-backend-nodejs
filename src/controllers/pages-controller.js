import { getProducts, getProductsByUser } from '../data/productRepository.js'

export async function homePageController(req, res, next) {
	// TODO: Añadir checkeo de usuario. Si no está logado, mostrar en vista. Si está logado, mostrar productos de usuario
	const userId = req.session.userId
	const products = await getProductsByUser(userId)

	res.render('index.html', {
		title: 'Home page',
		products: products,
		tags: ['work', 'lifestyle', 'motor', 'mobile'],
	})
	return
}
