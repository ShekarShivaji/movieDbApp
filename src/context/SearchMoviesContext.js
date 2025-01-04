import {createContext} from 'react'

const SearchMoviesContext = createContext({
  searchResponse: {},
  onTrrigerSearchingQuery: () => {},
})

export default SearchMoviesContext
