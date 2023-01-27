import { useLazyQuery } from '@apollo/client'
import { useState, useEffect } from 'react'
import { ALL_BOOKS } from '../queries'

let genres
const GenreFilter = ({ books, setFilter }) => {
  if (!genres) genres = [...new Set(books.map((b) => b.genres).flat())]

  return (
    <div>
      {genres.map((genre) => (
        <button key={genre} onClick={() => setFilter(genre)}>
          {genre}
        </button>
      ))}
    </div>
  )
}

const Books = (props) => {
  const [filter, setFilter] = useState(null)
  const [getBooks, books] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    getBooks()
  }, [books.data])

  useEffect(() => {
    getBooks({ variables: { genre: filter } })
  }, [filter, books.data])

  if (!props.show) {
    return null
  }

  if (books.loading) {
    return <div>loading...</div>
  }
  //console.log(books.data.allBooks)
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <GenreFilter books={books.data.allBooks} setFilter={setFilter} />
    </div>
  )
}

export default Books
