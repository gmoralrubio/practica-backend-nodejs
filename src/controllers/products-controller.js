import {
	addNewProduct,
	getProduct,
	getProductsByUser,
	updateProduct,
} from '../data/product-repository.js'
import { formatDate } from '../utils/utils.js'

export function newProductPageController(req, res, next) {
	res.render('product.html', {
		title: 'Añadir producto',
		values: {},
	})
}

export async function editProductPageController(req, res, next) {
	const productId = req.params.productId
	const product = await getProduct(productId)
	console.log(product)

	if (!product) {
		next()
		return
	}

	res.render('product.html', {
		title: 'Editar producto',
		values: {
			_id: product._id,
			name: product.name,
			price: product.price,
			tags: product.tags,
		},
	})
}

export async function productsPageController(req, res, next) {
	const userId = req.session.userId
	const products = await getProductsByUser(userId)

	res.render('products.html', {
		title: 'Listado de productos',
		products: products,
		formatDate: formatDate,
	})
}

export async function createProductController(req, res, next) {
	// TODO: Gestionar si el usuario no mete algun dato
	// mostrar mensaje en modal
	const userId = req.session.userId
	console.log(req.body)

	if (
		!req.body.name ||
		req.body.name === '' ||
		!req.body.price ||
		req.body.price === '' ||
		!req.body.tags ||
		req.body.tags.length === 0
	) {
		const errorMessage = 'Faltan campos por rellenar en el formulario'

		res.render('product.html', {
			title: 'Añadir producto',
			errorMessage: errorMessage,
			values: req.body,
		})

		return
	}

	const newProduct = {
		name: req.body.name,
		price: req.body.price,
		tags: req.body.tags,
		owner: userId,
	}

	await addNewProduct(newProduct)

	res.redirect('/products')
}

export async function editProductController(req, res, next) {
	const productId = req.params.productId
	const product = await getProduct(productId)

	if (!product) {
		next()
		return
	}

	if (
		!req.body.name ||
		req.body.name === '' ||
		!req.body.price ||
		req.body.price === '' ||
		!req.body.tags ||
		req.body.tags.length === 0
	) {
		const errorMessage = 'Faltan campos por rellenar en el formulario'

		res.render('product.html', {
			title: 'Editar producto',
			errorMessage: errorMessage,
			values: {
				id: productId,
				...req.body,
			},
		})
		return
	}

	const userId = req.session.userId

	await updateProduct(productId, userId, {
		id: productId,
		name: req.body.name,
		price: req.body.price,
		tags: req.body.tags,
	})
	res.redirect('/products')
}
