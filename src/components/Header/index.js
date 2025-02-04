import './index.css'
import {Link, withRouter} from 'react-router-dom'
import SearchMoviesContext from '../../context/SearchMoviesContext'

const Header = props => {
  const renderSearch = () => (
    <SearchMoviesContext.Consumer>
      {value => {
        const {
          onChangeSearchInput,
          onTrrigerSearchingQuery,
          searchInput,
        } = value

        const onChangeHandler = event => onChangeSearchInput(event.target.value)

        const onSearchHandler = event => {
          event.preventDefault()
          const {history} = props
          onTrrigerSearchingQuery()
          history.push(`/search`)
        }

        return (
          <div className="navSearchAndProfile">
            <form className="search-container">
              <input
                type="search"
                className="search text-white"
                placeholder="Search here...."
                onChange={onChangeHandler}
                value={searchInput}
              />
              <button
                type="button"
                onClick={onSearchHandler}
                className="searchbutton"
              >
                Search
              </button>
            </form>

            <img
              src="https://res.cloudinary.com/dqkjtjb9x/image/upload/v1735135074/user_j8klpc.png"
              alt="logo"
              className="profile"
            />
          </div>
        )
      }}
    </SearchMoviesContext.Consumer>
  )
  return (
    <nav className="Bg-header-container">
      <div className="navItemsContainer">
        <div>
          <h1 className="headerHeading">movieDB</h1>
        </div>
        <nav className="navigation-keys">
          <Link to="/" style={{textDecoration: 'none', color: 'white'}}>
            <button type="button" className="navigationButtons">
              Popular
            </button>
          </Link>
          <Link
            to="/top-rated"
            style={{textDecoration: 'none', color: 'white'}}
          >
            <button type="button" className="navigationButtons">
              Top Rated
            </button>
          </Link>
          <Link to="/upcoming" style={{textDecoration: 'none', color: 'white'}}>
            <button type="button" className="navigationButtons">
              Upcoming
            </button>
          </Link>
        </nav>
        {renderSearch()}
      </div>
    </nav>
  )
}

export default withRouter(Header)
