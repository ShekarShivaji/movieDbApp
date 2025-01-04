import {Component} from 'react'
import './index.css'
import Card from '../Card/index'
import Pagination from '../Pagination/index'

class TopRated extends Component {
  state = {
    movieList: [],
    totalPages: 0,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async (page = 1) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=da572fda53f46907063705b7b38f9918&language=en-US&page=${page}`,
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

    this.setState({movieList: convertData, totalPages: data.total_pages})
  }

  render() {
    const {movieList, totalPages} = this.state
    return (
      <>
        <div className="movie__list">
          <h2 className="list__title">Top Rated</h2>
          <div className="list__cards">
            {movieList.map(movie => (
              <Card movie={movie} key={movie.id} />
            ))}
          </div>
        </div>
        <Pagination totalPages={totalPages} apiCallback={this.getData} />
      </>
    )
  }
}

export default TopRated
