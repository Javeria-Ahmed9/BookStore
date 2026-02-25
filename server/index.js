import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import Book from './models/Book.js'

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/bookstore')
  .then(() => console.log('MongoDB connected'))

app.get('/books', async (req, res) => {
  const books = await Book.find().sort({ createdAt: -1 })
  res.json(books)
})

app.post('/books', async (req, res) => {
  const book = await Book.create({ title: req.body.title })
  res.json(book)
})

app.put('/books/:id', async (req, res) => {
  const book = await Book.findByIdAndUpdate(
    req.params.id,
    { title: req.body.title },
    { new: true }
  )
  res.json(book)
})

app.delete('/books/:id', async (req, res) => {
  await Book.findByIdAndDelete(req.params.id)
  res.json({ ok: true })
})

app.listen(3001, () => console.log('Server running on port 3001'))
