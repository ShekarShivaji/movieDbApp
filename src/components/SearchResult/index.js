import './index.css'
import Loader from 'react-loader-spinner'
import Card from '../Card/index'
import SearchMoviesContext from '../../context/SearchMoviesContext'
import Pagination from '../Pagination/index'
import Header from '../Header/index'

const SearchResult = () => {
  const renderEmptyView = () => (
    <div className="empty-view-container">
      <h1>No results found.</h1>
      <p>Don not get worried, Try to search again.</p>
    </div>
  )

  const renderMovieList = results => {
    if (!results.length) {
      return renderEmptyView()
    }
    return (
      <div className="list__cards">
        {results.map(movie => (
          <Card movie={movie} key={movie.id} />
        ))}
      </div>
    )
  }

  const renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#032541" />
    </div>
  )

  const renderSearchResultsView = value => {
    const {searchResponse, apiStatus} = value
    const {results} = searchResponse

    switch (apiStatus) {
      case 'IN_PROGRESS':
        return renderLoadingView()
      case 'SUCCESS':
        return renderMovieList(results)
      default:
        return renderEmptyView()
    }
  }
  return (
    <SearchMoviesContext.Consumer>
      {value => {
        const {searchResponse, onTrrigerSearchingQuery} = value

        return (
          <>
            <Header />
            <div className="movie__list">
              <div className="list__cards">
                {renderSearchResultsView(value)}
              </div>
            </div>
            <Pagination
              totalPages={searchResponse.totalPages}
              apiCallback={onTrrigerSearchingQuery}
            />
          </>
        )
      }}
    </SearchMoviesContext.Consumer>
  )
}

export default SearchResult
