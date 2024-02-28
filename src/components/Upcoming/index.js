import {Component} from 'react'
import FailureView from '../FailureView'
import MovieDetailsLink from '../MovieDetailsLink'
import Header from '../Header'
import Loading from '../Loading'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Upcoming extends Component {
  state = {
    originalsMoviesList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getOriginalsMovies()
  }

  getOriginalsMovies = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiKey = 'a58fe6e8cf6d8d65b061af330efe5072'
    const originalsMoviesApi = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`
    const response = await fetch(originalsMoviesApi)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.results.map(eachMovie => ({
        id: eachMovie.id,
        posterPath: eachMovie.poster_path,
        title: eachMovie.title,
      }))
      this.setState({
        originalsMoviesList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickRetry = () => {
    this.getOriginalsMovies()
  }

  renderFailureView = () => <FailureView onClickRetry={this.onClickRetry} />

  renderLoadingView = () => <Loading />

  renderSuccessView = () => {
    const {originalsMoviesList} = this.state
    return (
      <ul className="popular-list">
        {originalsMoviesList.map(eachMovie => (
          <MovieDetailsLink movieDetails={eachMovie} key={eachMovie.id} />
        ))}
      </ul>
    )
  }

  renderOriginalsCarousel = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()

      case apiStatusConstants.failure:
        return this.renderFailureView()

      case apiStatusConstants.inProgress:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="originals-container">
        <Header />
        {this.renderOriginalsCarousel()}
      </div>
    )
  }
}

export default Upcoming
