import {
	addNewProduct,
	getProduct,
	getProductsByUser,
} from '../data/product-repository.js'
import { formatDate } from '../utils/utils.js'

export function newProductPageController(req, res, next) {
	res.render('new-product.html', {
		title: 'Añadir producto',
		values: {},
	})
}

export async function createProductController(req, res, next) {
	// TODO: Gestionar si el usuario no mete algun dato
	// mostrar mensaje en modal
	const userId = req.session.userId
	console.log(req.body)

	if (
		!req.body.pName ||
		req.body.pName === '' ||
		!req.body.price ||
		req.body.price === '' ||
		!req.body.tags ||
		req.body.tags.length === 0
	) {
		const errorMessage = 'Faltan campos por rellenar en el formulario'

		res.render('new-product.html', {
			title: 'Añadir productos',
			errorMessage: errorMessage,
			values: req.body,
		})

		return
	}

	const newProduct = {
		name: req.body.pName,
		price: req.body.price,
		tags: req.body.tags,
		owner: userId,
	}

	const createdProduct = await addNewProduct(newProduct)

	res.redirect('/products')
}

export async function productsPageController(req, res, next) {
	const userId = req.session.userId
	const products = await getProductsByUser(userId)

	res.render('products.html', {
		title: 'Editar productos',
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
