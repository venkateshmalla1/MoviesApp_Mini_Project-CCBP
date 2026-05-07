import {Link} from 'react-router-dom'
import './index.css'

const SimilarMovieItem = props => {
  const {similarMovieDetails} = props
  const {posterPath, title, id} = similarMovieDetails

  return (
    <li className="similar-movie-list-item">
      <Link to={`/movies/${id}`}>
        <img
          data-testid="movieItem"
          alt={title}
          className="similar-movie-image"
          src={posterPath}
        />
      </Link>
    </li>
  )
}

export default SimilarMovieItem
