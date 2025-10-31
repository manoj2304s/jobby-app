import Cookies from 'js-cookie'

import {CgHome} from 'react-icons/cg'
import {IoIosLogOut} from 'react-icons/io'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import {Link, withRouter} from 'react-router-dom'
import './index.css'

const Header = props => {
  const logoutBtn = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="header-container">
      <Link to="/" className="link-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="company-logo"
        />
      </Link>
      <ul className="icon-at-nav-container">
        <li>
          <Link to="/">
            <CgHome className="nav-icons" />
          </Link>
        </li>
        <li>
          <Link to="/jobs">
            <BsFillBriefcaseFill className="nav-icons" />
          </Link>
        </li>
        <li>
          <IoIosLogOut onClick={logoutBtn} className="nav-icons" />
        </li>
      </ul>
      <ul className="text-at-nav-container">
        <li>
          <Link to="/" className="nav-a-text">
            Home
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="nav-a-text">
            Jobs
          </Link>
        </li>
      </ul>
      <div className="link-container">
        <button onClick={logoutBtn} className="logout-btn" type="button">
          Logout
        </button>
      </div>
    </nav>
  )
}
export default withRouter(Header)
