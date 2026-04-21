import {
	addNewProduct,
	getProduct,
	getProductsByUser,
} from '../data/product-repository.js'
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

export async function createProductController(req, res, next) {
	// TODO: Gestionar si el usuario no mete algun dato
	// mostrar mensaje en modal

	const userId = req.session.userId

	const newProduct = {
		name: req.body.name,
		price: req.body.price,
		tags: req.body.tags,
		owner: userId,
	}

	const createdProduct = await addNewProduct(newProduct)

	res.redirect('/products')
}
