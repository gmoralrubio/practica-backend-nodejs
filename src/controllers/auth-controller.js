import { getUserByEmail, getUserByUsername, createUser } from '../data/user-repository.js'

export async function loginPageController(req, res, next) {
	res.render('login.html', {
		title: 'Inicia sesión',
		values: {},
	})
}

export async function loginActionController(req, res, next) {
	const redirectUrl = req.query.redirect

	if (
		!req.body.email ||
		req.body.email === '' ||
		!req.body.password ||
		req.body.password === ''
	) {
		const errorMessage = 'El usuario y la contraseña son obligatorios'

		res.render('login.html', {
			title: 'Inicia sesión',
			errorMessage: errorMessage,
			values: { email: req.body.email },
		})
		return
	}

	// Recupera usuario y contraseña
	const user = await getUserByEmail(req.body.email)

	if (!user || !(await user.comparePassword(req.body.password))) {
		const errorMessage = 'Credenciales inválidas'

		res.render('login.html', {
			title: 'Inicia sesión',
			errorMessage: errorMessage,
			values: { email: req.body.email },
		})
		return
	}

	req.session.userId = user._id

	res.redirect(redirectUrl || '/')
}

export function logoutActionController(req, res, next) {
	req.session.regenerate((err) => {
		if (err) {
			next(err)
			return
		}

		res.redirect('/')
	})
}

export const registerPageController = async (req, res, next) => {
	res.render('register.html', {
		title: 'Regístrate',
		values: {},
	})
}

export const registerActionController = async (req, res, next) => {
	const { username, email, password, confirmPassword } = req.body

	if (
		!username ||
		username === '' ||
		!email ||
		email === '' ||
		!password ||
		password === ''
	) {
		const errorMessage =
			'El nombre de usuario, el email y la contraseña son obligatorios'

		res.render('register.html', {
			title: 'Regístrate',
			errorMessage: errorMessage,
			values: { email: req.body.email },
		})
		return
	}

	const [userByUsernameExists, userByEmailExists] = await Promise.all([
		getUserByUsername(username),
		getUserByEmail(email),
	])

	if (userByEmailExists || userByUsernameExists) {
		const errorMessage = 'El email o el nombre de usuario ya están registrados'

		res.render('register.html', {
			title: 'Regístrate',
			errorMessage: errorMessage,
			values: { email: req.body.email, username: req.body.username },
		})
		return
	}

	if (password !== confirmPassword) {
		const errorMessage = 'Las contraseñas no coinciden'

		res.render('register.html', {
			title: 'Regístrate',
			errorMessage: errorMessage,
			values: {},
		})
		return
	}

	const newUser = await createUser({ username, email, password })

	req.session.userId = newUser._id
	res.redirect('/')
}
