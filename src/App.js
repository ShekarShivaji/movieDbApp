import './App.css'
import {useState} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Popular from './components/Popular'
import SingleMovieDetails from './components/SingleMovieDetails'
import Header from './components/Header'
import Footer from './components/Footer'
import TopRated from './components/TopRated'
import Upcoming from './components/Upcoming'
import SearchMoviesContext from './context/SearchMoviesContext'
import SearchResult from './components/SearchResult'

// write your code here
const App = () => {
  const [searchResponse, setSearchResponse] = useState({})
  const [apiStatus, setApiStatus] = useState('INITIAL')
  const [searchInput, setSearchInput] = useState('')

  const onChangeSearchInput = text => setSearchInput(text)

  const getUpdatedData = responseData => ({
    totalPages: responseData.total_pages,
    totalResults: responseData.total_results,
    results: responseData.results.map(each => ({
      adult: each.adult,
      backdropPath: each.backdrop_path,
      genreIds: each.genre_ids,
      id: each.id,
      originalLanguage: each.original_language,
      originalTitle: each.original_title,
      overview: each.overview,
      popularity: each.popularity,
      posterPath: `https://image.tmdb.org/t/p/w500${each.poster_path}`,
      releaseDate: each.release_date,
      title: each.title,
      video: each.video,
      voteAverage: each.vote_average,
      voteCount: each.vote_count,
    })),
  })

  const onTrrigerSearchingQuery = async (page = 1) => {
    setApiStatus('IN_PROGRESS')
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=da572fda53f46907063705b7b38f9918&language=en-US&query=${searchInput}&page=${page}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    console.log(data)
    setSearchResponse(getUpdatedData(data))
    setApiStatus('SUCCESS')
  }
  return (
    <SearchMoviesContext.Provider
      value={{
        searchResponse,
        onTrrigerSearchingQuery,
        searchInput,
        onChangeSearchInput,
        apiStatus,
      }}
    >
      <>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/" component={Popular} />
            <Route exact path="/top-rated" component={TopRated} />
            <Route exact path="/upcoming" component={Upcoming} />
            <Route exact path="/search" component={SearchResult} />
            <Route exact path="/movie/:id" component={SingleMovieDetails} />
          </Switch>
          <Footer />
        </BrowserRouter>
      </>
    </SearchMoviesContext.Provider>
  )
}
export default App
