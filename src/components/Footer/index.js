import './index.css'
import {Link} from 'react-router-dom'
import {FcRating} from 'react-icons/fc'
import {FaHome} from 'react-icons/fa'
import {MdOutlineUpcoming} from 'react-icons/md'
import {CgProfile} from 'react-icons/cg'

const Footer = () => (
  <div className="FooterBgContainer">
    <div className="NavigationContainerInMobile">
      <Link to="/" style={{textDecoration: 'none', color: 'white'}}>
        <div className="profileContainer">
          <FaHome size="50" color="#ffffff" />
          <p className="lable">Popular</p>
        </div>
      </Link>
      <Link to="/top-rated" style={{textDecoration: 'none', color: 'white'}}>
        <div className="profileContainer">
          <FcRating size="50" />
          <p className="lable">Top Rated</p>
        </div>
      </Link>
      <Link to="/upcoming" style={{textDecoration: 'none', color: 'white'}}>
        <div className="profileContainer">
          <MdOutlineUpcoming size="50" />
          <p className="lable">Upcoming</p>
        </div>
      </Link>
      <Link to="/" style={{textDecoration: 'none', color: 'white'}}>
        <div className="profileContainer">
          <CgProfile size="50" />
          <p className="lable">Profile</p>
        </div>
      </Link>
    </div>
  </div>
)

export default Footer
