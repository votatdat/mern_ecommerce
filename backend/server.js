import express from 'express'
import dotenv from 'dotenv'
import products from './data/products.js'

dotenv.config()

const app = express()

app.get('/', (req, res) => {
  res.send('API is running......')
})

app.get('/api/products', (req, res) => {
  res.json(products)
})

app.get('/api/products/:id', (req, res) => {
  product = products.find(p => p._id === req.params.id)
  res.json(product)
})

const PORT = process.env.PORT || 5000
const MODE = process.env.NODE_ENV || 'development'

app.listen(5000, console.log(`Server is running in ${MODE} mode on http://localhost:${PORT}/`))