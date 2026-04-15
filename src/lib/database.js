import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const DB_NAME = process.env.DB_NAME || 'demo'

// Conexión a la BBDD
export async function connectToDB() {
	const mongooseInstance = await mongoose.connect(MONGODB_URI, {
		dbName: DB_NAME,
	})

	console.log('Connected to MongoDB')

	return mongooseInstance.connection
}
