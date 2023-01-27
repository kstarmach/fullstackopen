import { CURRENT_USER, ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'
import Books from './Books'

const RecommendedTable = ({ favoriteGenre }) => {
  const recomended = useQuery(ALL_BOOKS, {
    variables: { genre: favoriteGenre },
  })
  if (recomended.loading) {
    return <div>loading...</div>
  }

  return (
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>author</th>
          <th>published</th>
        </tr>
        {recomended.data.allBooks.map((a) => (
          <tr key={a.id}>
            <td>{a.title}</td>
            <td>{a.author.name}</td>
            <td>{a.published}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const Recommended = (props) => {
  const currentUser = useQuery(CURRENT_USER)

  if (!props.show || !currentUser) {
    return null
  }
  return (
    <div>
      <h2>recommendations</h2>
      <div>
        books in your favorite genre <b>{currentUser.data.me.favoriteGenre}</b>
      </div>
      <RecommendedTable favoriteGenre={currentUser.data.me.favoriteGenre} />
    </div>
  )
}

export default Recommended
