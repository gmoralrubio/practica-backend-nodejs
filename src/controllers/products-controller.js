import { getProduct, getProductsByUser } from '../data/productRepository.js'
import { formatDate } from '../utils/utils.js'

export async function productsPageController(req, res, next) {
	const userId = req.session.userId
	const products = await getProductsByUser(userId)

	res.render('products.html', {
		title: 'Editar productos',
		tags: ['work', 'motor', 'lifestyle', 'mobile'],
		products: products,
		formatDate: formatDate,
	})
}

export async function productPageController(req, res, next) {
	const productId = req.params.productId
	const product = await getProduct(productId)

	res.render('product.html', {
		title: 'Producto',
		product: product,
	})
}
