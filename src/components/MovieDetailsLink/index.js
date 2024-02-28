import {Link} from 'react-router-dom'
import './index.css'

const MovieDetailsLink = props => {
  const {movieDetails} = props
  const {posterPath, title, id} = movieDetails
  return (
    <li>
      <img
        className="popular-img"
        alt={title}
        src={`http://localhost${posterPath}`}
      />
      <Link to={`/movies/${id}`}>
        {' '}
        <button type="button" className="btn">
          {' '}
          View Details
        </button>
      </Link>
    </li>
  )
}

export default MovieDetailsLink
