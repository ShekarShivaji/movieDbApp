import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import BannerSection from '../BannerSection/index'
import Card from '../Card/index'
import Pagination from '../Pagination/index'
import Header from '../Header/index'

class Popular extends Component {
  state = {
    moviesData: [],
    totalPages: 0,
    isLoading: true,
  }

  componentDidMount() {
    this.getPopularMovies()
  }

  getPopularMovies = async (page = 1) => {
    const getPopularMoviesURL = `https://api.themoviedb.org/3/movie/popular?api_key=da572fda53f46907063705b7b38f9918&language=en-US&page=${page}`
    const data = await fetch(getPopularMoviesURL)
    const jsondata = await data.json()
    const moviesdata = jsondata.results.map(each => ({
      adult: each.adult,
      backdropPath: each.backdrop_path,
      genreIds: each.genre_ids,
      id: each.id,
      originalLanguage: each.original_language,
      originalTitle: each.original_title,
      overview: each.overview,
      popularity: each.popularity,
      posterPath: each.poster_path,
      releaseDate: each.release_date,
      title: each.title,
      video: each.video,
      voteAverage: each.vote_average,
      voteCount: each.vote_count,
    }))
    this.setState({
      moviesData: moviesdata,
      isLoading: false,
      totalPages: jsondata.total_pages,
    })
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#032541" />
    </div>
  )

  render() {
    const {moviesData, isLoading, totalPages} = this.state
    return (
      <>
        {isLoading ? (
          this.renderLoadingView()
        ) : (
          <>
            <Header />
            <div className="bg-conatainer">
              <div>
                <BannerSection moviesData={moviesData} />
              </div>

              <div className="bg-popularContainer">
                <div className="movie__list">
                  <h2 className="list__title">Popular</h2>
                  <div className="list__cards">
                    {moviesData.map(movie => (
                      <Card movie={movie} key={movie.id} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        <Pagination
          totalPages={totalPages}
          apiCallback={this.getPopularMovies}
        />
      </>
    )
  }
}

export default Popular
