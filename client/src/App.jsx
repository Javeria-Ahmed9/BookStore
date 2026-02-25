import { useEffect, useState } from 'react'

const API = 'http://localhost:3001'

export default function App() {
  const [books, setBooks] = useState([])
  const [input, setInput] = useState('')
  const [editId, setEditId] = useState(null)
  const [editTitle, setEditTitle] = useState('')

  useEffect(() => {
    fetch(`${API}/books`).then(r => r.json()).then(setBooks)
  }, [])

  async function addBook() {
    if (!input.trim()) return
    const book = await fetch(`${API}/books`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: input })
    }).then(r => r.json())
    setBooks([book, ...books])
    setInput('')
  }

  async function saveEdit(id) {
    if (!editTitle.trim()) return
    const book = await fetch(`${API}/books/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editTitle })
    }).then(r => r.json())
    setBooks(books.map(b => b._id === id ? book : b))
    setEditId(null)
  }

  async function deleteBook(id) {
    await fetch(`${API}/books/${id}`, { method: 'DELETE' })
    setBooks(books.filter(b => b._id !== id))
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col items-center py-16 px-4">
      <div className="w-full max-w-lg">

        <div className="mb-10">
          <h1 className="text-3xl font-bold">Book Store</h1>
          <p className="text-gray-600 text-sm mt-1">{books.length} books in your list</p>
        </div>

        <div className="flex gap-2 mb-8">
          <input
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-white/25 placeholder:text-gray-600 transition-colors"
            placeholder="Add a book title..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addBook()}
          />
          <button
            onClick={addBook}
            className="bg-white text-black px-5 py-3 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors shrink-0"
          >
            Add
          </button>
        </div>

        <div className="space-y-2">
          {books.map((book, i) => (
            <div key={book._id} className="flex items-center gap-3 bg-white/3 border border-white/8 rounded-xl px-4 py-3 group">
              <span className="text-gray-600 text-xs w-5 shrink-0">{i + 1}</span>

              {editId === book._id ? (
                <input
                  className="flex-1 bg-white/5 border border-white/20 rounded-lg px-3 py-1.5 text-sm outline-none"
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && saveEdit(book._id)}
                  autoFocus
                />
              ) : (
                <span className="flex-1 text-sm text-gray-200">{book.title}</span>
              )}

              {editId === book._id ? (
                <button onClick={() => saveEdit(book._id)} className="text-emerald-400 text-sm">Save</button>
              ) : (
                <button
                  onClick={() => { setEditId(book._id); setEditTitle(book.title) }}
                  className="text-transparent group-hover:text-gray-600 hover:!text-blue-400 text-sm transition-colors"
                >
                  Edit
                </button>
              )}

              <button
                onClick={() => deleteBook(book._id)}
                className="text-transparent group-hover:text-gray-600 hover:!text-red-400 text-sm transition-colors"
              >
                ✕
              </button>
            </div>
          ))}
          {books.length === 0 && (
            <p className="text-center text-gray-700 py-10 text-sm">No books yet. Add one above.</p>
          )}
        </div>

      </div>
    </div>
  )
}
