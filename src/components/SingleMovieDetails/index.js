import './index.css'
import {Component} from 'react'
import {withRouter} from 'react-router-dom'

class SingleMovieDetails extends Component {
  state = {
    singleMovieDetails: [],
    castAndCrew: [],
    director: [],
    writer: [],
  }

  componentDidMount() {
    this.getMovieDetails()
  }

  getCastprofile = cast => (
    <div className="CastContainer">
      {cast
        ? cast.map(each => (
            <div className="profiles" key={each.name}>
              <img
                className="profileImage"
                src={each.profilePath}
                alt={each.name}
              />
              <p className="profileTextName">{each.name}</p>
              <p className="profileTextCharacter">{each.character}</p>
            </div>
          ))
        : ' '}
    </div>
  )

  getMovieDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response2 = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=da572fda53f46907063705b7b38f9918&language=en-US`,
    )
    const response1 = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=da572fda53f46907063705b7b38f9918&language=en-US`,
    )
    const data1 = await response1.json()
    const data2 = await response2.json()

    const detailsOfCast = {
      id: data2.id,
      cast: data2.cast.map(each => ({
        character: each.character,
        name: each.name,
        profilePath: `https://image.tmdb.org/t/p/original${each.profile_path}`,
      })),
      crew: data2.crew.map(each => ({
        job: each.job,
        name: each.name,
      })),
    }

    const filterDirector = detailsOfCast.crew.filter(
      each => each.job === 'Director' || each.job === 'Writer',
    )

    const details = {
      adult: data1.adult,
      backdropPath: `https://image.tmdb.org/t/p/original${data1.backdrop_path}`,
      genres: data1.genres,
      id: data1.id,
      originalLanguage: data1.original_language,
      originalTitle: data1.original_title,
      overview: data1.overview,
      popularity: data1.popularity,
      posterPath: data1.poster_path,
      releaseDate: data1.release_date,
      revenue: data1.revenue,
      runtime: data1.runtime,
      spokenLanguages: data1.spoken_languages.map(each => ({
        english_name: each.english_name,
        iso_639_1: each.iso_639_1,
        name: each.name,
      })),
      status: data1.status,
      tagline: data1.tagline,
      title: data1.title,
      video: data1.video,
      voteAverage: data1.vote_average,
      voteCount: data1.vote_count,
    }

    this.setState({
      singleMovieDetails: details,
      castAndCrew: detailsOfCast,
      director: filterDirector[0],
      writer: filterDirector[1],
    })
  }

  render() {
    const {singleMovieDetails, director, writer, castAndCrew} = this.state
    console.log(castAndCrew)
    const {
      backdropPath,
      originalTitle,
      overview,
      popularity,
      posterPath,
      releaseDate,
      revenue,
      runtime,
      status,
      tagline,
      title,
    } = singleMovieDetails
    return (
      <div className="bg-conatainer">
        <div className="card">
          <img
            src={backdropPath}
            className="SingleMoviebackdropPath"
            alt={title}
          />
          <div className="cards__overlay" />
        </div>
        <div className="movieDetails">
          <img
            alt={originalTitle}
            className="posterImage"
            src={`https://image.tmdb.org/t/p/original${posterPath}`}
          />
          <div className="detailsContainer">
            <h1 className="title">{title}</h1>
            <p className="tagline">{tagline}</p>
            <hr className="horizental" />

            <div className="movieContainer">
              <p className="moviePopularity">Rating : {status} </p>
              <p className="moviePopularity">|</p>
              <p className="moviePopularity">View : {popularity}</p>
              <p className="moviePopularity">|</p>
              <p className="moviePopularity">Duration : {runtime}</p>
            </div>

            <hr className="horizental" />
            <h2 className="overview">Overview</h2>
            <p className="tagline" style={{marginBottom: '30px'}}>
              {overview}
            </p>
            <hr className="horizental" />

            <div className="movieContainer">
              <p className="moviePopularity">Status : {status} </p>
              <p className="moviePopularity">|</p>
              <p className="moviePopularity">Release Date : {releaseDate}</p>
              <p className="moviePopularity">|</p>
              <p className="moviePopularity">Revenue : {revenue}</p>
            </div>
            <hr className="horizental" />
            <p className="moviePopularity">
              Director : {director ? director.name : ''}
            </p>
            <hr className="horizental" />
            <p className="moviePopularity">
              Writer : {writer ? writer.name : ''}
            </p>
            <hr className="horizental" />
            <h2 className="overview">Cast</h2>
            <div>{this.getCastprofile(castAndCrew.cast)}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(SingleMovieDetails)
