import './index.css'
import {Component} from 'react'
import BannerSection from '../BannerSection/index'
import Card from '../Card/index'
import Pagination from '../Pagination/index'

class Popular extends Component {
  state = {
    moviesData: [],
    totalPages: 0,
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
    this.setState({moviesData: moviesdata, totalPages: jsondata.total_pages})
  }

  render() {
    const {moviesData, totalPages} = this.state
    return (
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
        <Pagination
          totalPages={totalPages}
          apiCallback={this.getPopularMovies}
        />
      </div>
    )
  }
}

export default Popular
