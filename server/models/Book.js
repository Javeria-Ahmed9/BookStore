import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  title: { type: String, required: true }
}, { timestamps: true })

export default mongoose.model('Book', schema)
