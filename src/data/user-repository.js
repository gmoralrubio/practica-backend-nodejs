import { User } from '../models/user-model.js'

export async function getUserByEmail(email) {
	const user = await User.findOne({ email: email }).select('+password')
	return user
}

export async function getUserByUsername(username) {
	const user = await User.findOne({ username: username }).select('+password')
	return user
}

export async function createUser(userData) {
	const user = new User({
		...userData,
		password: await User.hashPassword(userData.password),
	})
	await user.save()
	return user
}
