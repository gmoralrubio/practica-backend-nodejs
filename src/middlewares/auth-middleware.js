import session from 'express-session'
import ConnectMongo from 'connect-mongo'

const INACTIVITY_2_DAYS = 1000 * 60 * 60 * 24 * 2

export function guard(req, res, next) {
	const redirectUrl = `/login?redirect=${encodeURIComponent(req.originalUrl)}`

	// Si no hay una sesión del usuario, redirige a /login
	if (!req.session.userId) {
		res.redirect(redirectUrl)
		return
	}
	next()
}

// Crea la sesión
export const sessionMiddleware = session({
	name: 'nodepop',
	secret: process.env.SESSION_SECRET || 'secret',
	saveUninitialized: true,
	resave: true,
	cookie: {
		maxAge: INACTIVITY_2_DAYS,
	},
	// Almacenamos la sesion en la DB
	store: ConnectMongo.create({
		mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017',
	}),
})

// Almacena la sesión en locals
export function sessionInViews(req, res, next) {
	res.locals.session = req.session
	next()
}
