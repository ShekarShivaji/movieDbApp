import './index.css'
import {Link} from 'react-router-dom'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import {Carousel} from 'react-responsive-carousel'
import {FaStar} from 'react-icons/fa'

const BannerSection = props => {
  const {moviesData} = props
  const ImgUrl = 'https://image.tmdb.org/t/p/original'
  return (
    <div className="banner">
      <Carousel
        showThumbs={false}
        autoPlay
        transitionTime={3}
        infiniteLoop
        showStatus
        width="100%"
        showIndicators={false}
      >
        {moviesData.map(data => (
          <Link
            style={{textDecoration: 'none', color: 'white'}}
            to={`/movie/${data.id}`}
            key={data.id}
          >
            <div className="posterImg">
              <img src={ImgUrl + data.backdropPath} alt={data.originalTitle} />
            </div>
            <div className="posterImg_overLay">
              <div className="bannerTitle">
                {data ? data.originalTitle : ''}
              </div>
              <div className="bannerImgRunTime">
                {data ? data.releaseDate : ''}{' '}
                <span className="bannerImgRatting">
                  {data ? data.voteAverage : ''}
                </span>
                <FaStar />
              </div>
              <div className="bannerImageDescription">
                {data ? `${data.overview.slice(0, 118)}...` : ''}
              </div>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  )
}

export default BannerSection
