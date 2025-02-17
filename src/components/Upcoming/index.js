import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import Card from '../Card/index'
import Pagination from '../Pagination/index'
import Header from '../Header/index'

class Upcoming extends Component {
  state = {
    movieList: [],
    totalPages: 0,
    isLoading: true,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async (page = 1) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=da572fda53f46907063705b7b38f9918&language=en-US&page=${page}`,
    )
    const data = await response.json()
    const convertData = data.results.map(each => ({
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
      movieList: convertData,
      totalPages: data.total_pages,
      isLoading: false,
    })
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#032541" />
    </div>
  )

  render() {
    const {movieList, isLoading, totalPages} = this.state
    return (
      <>
        {isLoading ? (
          this.renderLoadingView()
        ) : (
          <>
            <Header />
            <div className="movie__list">
              <h2 className="list__title">Upcoming</h2>
              <div className="list__cards">
                {movieList.map(movie => (
                  <Card movie={movie} key={movie.id} />
                ))}
              </div>
            </div>
          </>
        )}
        <Pagination totalPages={totalPages} apiCallback={this.getData} />
      </>
    )
  }
}

export default Upcoming
