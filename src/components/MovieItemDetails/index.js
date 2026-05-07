import {Component} from 'react'
import Cookies from 'js-cookie'
import {format} from 'date-fns'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import SimilarMovieItem from '../SimilarMovieItem'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieItemDetails extends Component {
  state = {
    movieDetails: {},
    genres: [],
    similarMovies: [],
    spokenLanguages: [],
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getSpecificMovieDetails()
  }

  componentDidUpdate(prevProps) {
    const {match} = this.props
    const {id} = match.params
    const prevId = prevProps.match.params.id

    if (id !== prevId) {
      this.getSpecificMovieDetails()
      window.scrollTo(0, 0)
    }
  }

  getFormattedMovieDetails = movieDetails => ({
    adult: movieDetails.adult,
    backdropPath: movieDetails.backdrop_path,
    budget: movieDetails.budget,
    id: movieDetails.id,
    overview: movieDetails.overview,
    posterPath: movieDetails.poster_path,
    releaseDate: movieDetails.release_date,
    runtime: movieDetails.runtime,
    title: movieDetails.title,
    voteAverage: movieDetails.vote_average,
    voteCount: movieDetails.vote_count,
  })

  getFormattedSimilarMovie = movie => ({
    backdropPath: movie.backdrop_path,
    id: movie.id,
    posterPath: movie.poster_path,
    title: movie.title,
  })

  getFormattedSpokenLanguagesList = eachLanguage => ({
    englishName: eachLanguage.english_name,
    id: eachLanguage.id,
  })

  getSpecificMovieDetails = async () => {
    this.setState({apiStatus: apiConstants.inProgress})

    const {match} = this.props
    const {id} = match.params
    const jwtToken = Cookies.get('jwt_token')
    const movieDetailsApiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`

    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }

    const response = await fetch(movieDetailsApiUrl, options)

    if (response.ok) {
      const data = await response.json()
      const formattedMovieDetails = this.getFormattedMovieDetails(
        data.movie_details,
      )

      const recentMoviesString = localStorage.getItem('recentMovies')
      let recentMoviesArray = recentMoviesString
        ? JSON.parse(recentMoviesString)
        : []

      recentMoviesArray = recentMoviesArray.filter(
        movie => movie.id !== formattedMovieDetails.id,
      )

      recentMoviesArray.unshift({
        moviePoster: formattedMovieDetails.backdropPath,
        id: formattedMovieDetails.id,
      })

      if (recentMoviesArray.length > 3) {
        recentMoviesArray.pop()
      }

      localStorage.setItem('recentMovies', JSON.stringify(recentMoviesArray))

      const formattedSimilarMoviesList = data.movie_details.similar_movies.map(
        eachMovie => this.getFormattedSimilarMovie(eachMovie),
      )
      const formattedSpokenLanguagesList = data.movie_details.spoken_languages.map(
        eachLanguage => this.getFormattedSpokenLanguagesList(eachLanguage),
      )

      this.setState({
        movieDetails: formattedMovieDetails,
        genres: data.movie_details.genres,
        spokenLanguages: formattedSpokenLanguagesList,
        similarMovies: formattedSimilarMoviesList,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  formattedMovieDuration = runtime => {
    const hours = Math.floor(runtime / 60)
    const minutes = runtime % 60
    if (hours === 0) return `${minutes}m`
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`
  }

  getFormattedDate = releaseDate => {
    if (!releaseDate) return ''
    try {
      return format(new Date(releaseDate), 'do MMMM yyyy')
    } catch (e) {
      return ''
    }
  }

  refetchMovieDetails = () => this.getSpecificMovieDetails()

  getMovieDetailsResultantView = () => {
    const {
      movieDetails,
      genres,
      spokenLanguages,
      similarMovies,
      apiStatus,
    } = this.state

    switch (apiStatus) {
      case apiConstants.success: {
        const {
          backdropPath,
          overview,
          voteCount,
          voteAverage,
          budget,
          releaseDate,
          runtime,
          adult,
          title,
        } = movieDetails
        const duration = this.formattedMovieDuration(runtime)
        const releaseYear = releaseDate
          ? new Date(releaseDate).getFullYear()
          : ''
        const certification = adult ? 'A' : 'U/A'
        const formattedDate = this.getFormattedDate(releaseDate)

        return (
          <>
            <div
              className="movie-item-poster-container"
              style={{
                backgroundImage: `linear-gradient(90.33deg, #181818 -6.5%, rgba(24, 24, 24, 0.6) 57.15%, rgba(24, 24, 24, 0) 99.77%), url(${backdropPath})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <Header />
              <div className="movie-details-top-poster-text-container">
                <h1 className="movie-details-page-title">{title}</h1>
                <div className="movie-duration-certification-release-year-container">
                  <p className="movie-duration">{duration}</p>
                  <p className="movie-certificate">{certification}</p>
                  <p className="release-year">{releaseYear}</p>
                </div>
                <p className="movie-overview">{overview}</p>
                <button className="play-button-in-movie-details" type="button">
                  Play
                </button>
              </div>
            </div>
            <div className="movie-item-details-bottom-container">
              <div className="all-labels-and-info-container">
                <div className="one-content-label-and-info-container">
                  <h3 className="content-label-text">Genres</h3>
                  <div className="genres-list-container">
                    {genres.map(genre => (
                      <p className="info-text" key={genre.id}>
                        {genre.name}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="one-content-label-and-info-container">
                  <h3 className="content-label-text">Audio Available</h3>
                  <div className="genres-list-container">
                    {spokenLanguages.map(lang => (
                      <p className="info-text" key={lang.id}>
                        {lang.englishName}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="two-content-label-and-info-container">
                  <h3 className="content-label-text">Rating Count</h3>
                  <p className="info-text">{voteCount}</p>
                  <h3 className="content-label-text">Rating Average</h3>
                  <p className="info-text">{voteAverage}</p>
                </div>
                <div className="two-content-label-and-info-container">
                  <h3 className="content-label-text">Budget</h3>
                  <p className="info-text">{budget}</p>
                  <h3 className="content-label-text">Release Date</h3>
                  <p className="info-text">{formattedDate}</p>
                </div>
              </div>
              <h3 className="similar-movies-heading">More like this</h3>
              <ul className="similar-movies-list-container">
                {similarMovies.map(movie => (
                  <SimilarMovieItem
                    similarMovieDetails={movie}
                    key={movie.id}
                  />
                ))}
              </ul>
              <Footer />
            </div>
          </>
        )
      }

      case apiConstants.inProgress:
        return (
          <>
            <Header />
            <div
              data-testid="loader"
              className="movie-details-page-loader-failure-container"
            >
              <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
            </div>
          </>
        )

      case apiConstants.failure:
        return (
          <>
            <Header />
            <div className="movie-details-page-loader-failure-container">
              <img
                alt="failure view"
                src="https://res.cloudinary.com/dlygjzdo7/image/upload/v1673638803/Netflix%20Clone%20App/Failure%20Views/something-went-wrong-image_xs8afo.png"
                className="movie-details-page-failure-image"
              />
              <p className="movie-details-page-failure-description">
                Something went wrong. Please try again
              </p>
              <button
                onClick={this.refetchMovieDetails}
                type="button"
                className="movie-details-page-try-again-button"
              >
                Try Again
              </button>
            </div>
          </>
        )

      default:
        return null
    }
  }

  render() {
    return (
      <div className="movie-item-details-main-container">
        {this.getMovieDetailsResultantView()}
      </div>
    )
  }
}

export default MovieItemDetails
