import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import Cookies from 'js-cookie'

// MUST IMPORT THESE FOR HORIZONTAL ALIGNMENT
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Header from '../Header'
import MovieItem from '../MovieItem'
import RecentMovieItem from '../RecentMovieItem'
import Footer from '../Footer'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {slidesToShow: 4, slidesToScroll: 1},
    },
    {
      breakpoint: 768,
      settings: {slidesToShow: 3, slidesToScroll: 1},
    },
    {
      breakpoint: 480,
      settings: {slidesToShow: 2, slidesToScroll: 1},
    },
  ],
}

class Home extends Component {
  state = {
    trendingMoviesList: [],
    originalsMoviesList: [],
    homePageMovie: {},
    dataFetched: false,
    originalsApiStatus: apiConstants.initial,
    trendingApiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getTrendingNowMoviesList()
    this.getOriginalsMoviesList()
  }

  getFormattedMovieData = eachMovie => ({
    backdropPath: eachMovie.backdrop_path,
    id: eachMovie.id,
    overview: eachMovie.overview,
    posterPath: eachMovie.poster_path,
    title: eachMovie.title,
  })

  getTrendingNowMoviesList = async () => {
    this.setState({trendingApiStatus: apiConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const response = await fetch(
      'https://apis.ccbp.in/movies-app/trending-movies',
      {
        headers: {Authorization: `Bearer ${jwtToken}`},
      },
    )
    if (response.ok) {
      const data = await response.json()
      const formattedData = data.results.map(this.getFormattedMovieData)
      this.setState({
        trendingMoviesList: formattedData,
        trendingApiStatus: apiConstants.success,
      })
    } else {
      this.setState({trendingApiStatus: apiConstants.failure})
    }
  }

  getOriginalsMoviesList = async () => {
    this.setState({originalsApiStatus: apiConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const response = await fetch('https://apis.ccbp.in/movies-app/originals', {
      headers: {Authorization: `Bearer ${jwtToken}`},
    })
    if (response.ok) {
      const data = await response.json()
      const formattedData = data.results.map(this.getFormattedMovieData)
      this.setState({
        originalsMoviesList: formattedData,
        homePageMovie:
          formattedData[Math.floor(Math.random() * formattedData.length)],
        dataFetched: true,
        originalsApiStatus: apiConstants.success,
      })
    } else {
      this.setState({originalsApiStatus: apiConstants.failure})
    }
  }

  renderSlider = (status, list, retryFn) => {
    switch (status) {
      case apiConstants.success:
        return (
          <div className="slick-container">
            <Slider {...settings}>
              {list.map(movie => (
                <MovieItem movieDetails={movie} key={movie.id} />
              ))}
            </Slider>
          </div>
        )
      case apiConstants.inProgress:
        return (
          <div className="loader-container" data-testid="loader">
            <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
          </div>
        )
      case apiConstants.failure:
        return (
          <div className="error-view-container">
            <img
              src="https://res.cloudinary.com/dlygjzdo7/image/upload/v1673696599/alert-icon_fjdzey.png"
              alt="failure view"
              className="error-icon"
            />
            <p>Something went wrong. Please try again</p>
            <button onClick={retryFn} type="button" className="retry-btn">
              Try Again
            </button>
          </div>
        )
      default:
        return null
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) return <Redirect to="/login" />

    const {
      homePageMovie,
      dataFetched,
      trendingMoviesList,
      originalsMoviesList,
      trendingApiStatus,
      originalsApiStatus,
    } = this.state
    const recentMovies = JSON.parse(localStorage.getItem('recentMovies'))

    const bgImage = dataFetched ? `url(${homePageMovie.backdropPath})` : ''
    const bgOverlay = `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #181818 100%)`

    return (
      <div className="home-page-container page-animation">
        <div
          className="home-page-top-container"
          style={{backgroundImage: `${bgOverlay}, ${bgImage}`}}
        >
          <Header />
          {originalsApiStatus === apiConstants.success && (
            <div className="top-container-content">
              <h1 className="movie-title">{homePageMovie.title}</h1>
              <p className="movie-overview">{homePageMovie.overview}</p>
              <button className="play-btn" type="button">
                Play
              </button>
            </div>
          )}
        </div>

        <div className="home-page-bottom-container">
          <section className="movie-section">
            <h1 className="section-heading">Trending Now</h1>
            {this.renderSlider(
              trendingApiStatus,
              trendingMoviesList,
              this.getTrendingNowMoviesList,
            )}
          </section>

          <section className="movie-section">
            <h1 className="section-heading">Originals</h1>
            {this.renderSlider(
              originalsApiStatus,
              originalsMoviesList,
              this.getOriginalsMoviesList,
            )}
          </section>

          {recentMovies && (
            <section className="movie-section">
              <h1 className="section-heading">Recent Movies</h1>
              <ul className="recent-movies-grid">
                {recentMovies.map(movie => (
                  <RecentMovieItem movieDetails={movie} key={movie.id} />
                ))}
              </ul>
            </section>
          )}
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
