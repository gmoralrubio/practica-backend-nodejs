import express from 'express'

const app = express()
const PORT = process.env.PORT
const HOST = process.env.HOST

app.get('/', (req, res) => {
	res.send('Práctica final')
})

app.listen(PORT, HOST, () => {
	console.log(`Server running on http://${HOST}:${PORT}`)
})
