import {useState, useEffect} from 'react'
import './index.css'
import {FaStar} from 'react-icons/fa'

import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {Link} from 'react-router-dom'

const Card = props => {
  const {movie} = props
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 100)
  }, [])

  return (
    <>
      {isLoading ? (
        <div className="cards" style={{color: '#ffffff'}}>
          <SkeletonTheme>
            <Skeleton height={300} duration={2} />
          </SkeletonTheme>
        </div>
      ) : (
        <li className="cardContainer">
          <div className="cards">
            <img
              alt={movie.title}
              className="cards__img"
              src={`https://image.tmdb.org/t/p/w300${
                movie ? movie.posterPath : ''
              }`}
            />
            <div className="cards__overlay">
              <div className="card__title">{movie ? movie.title : ''}</div>
              <div className="card__runtime">
                {movie ? movie.releaseDate : ''}
                <span className="card__rating">
                  {movie ? movie.voteAverage : ''}
                  <FaStar />
                </span>
              </div>
              <div className="card__description">
                {movie ? `${movie.overview.slice(0, 118)}...` : ''}
              </div>
              <Link
                to={`/movie/${movie.id}`}
                style={{textDecoration: 'none', color: 'White'}}
                className="mt-auto align-self-center"
              >
                <button className="viewDetailsButton" type="button">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        </li>
      )}
    </>
  )
}

export default Card
