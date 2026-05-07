import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import {GiHamburgerMenu} from 'react-icons/gi'
import {RiCloseFill} from 'react-icons/ri'

import './index.css'

const tabPathConstants = {
  home: '/',
  popular: '/popular',
  account: '/account',
  search: '/search',
}

class Header extends Component {
  state = {
    displayHamburgerMenu: false,
    searchInput: '',
  }

  collapseHamburgerMenu = () => {
    this.setState({displayHamburgerMenu: false})
  }

  toggleHamburgerMenuDisplay = () => {
    this.setState(prevState => ({
      displayHamburgerMenu: !prevState.displayHamburgerMenu,
    }))
  }

  navigateToSearchRoute = () => {
    const {history} = this.props
    history.push('/search')
  }

  onSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onSearchBtnClick = () => {
    const {searchInput} = this.state
    const {searchMovies} = this.props

    if (searchInput.trim() !== '' && searchMovies !== undefined) {
      searchMovies(searchInput)
    }
  }

  renderSearchSection = () => {
    const {searchInput} = this.state
    const {match} = this.props
    const {path} = match

    if (path === tabPathConstants.search) {
      return (
        <div className="search-bar-container">
          <input
            type="search"
            placeholder="Search"
            className="search-input"
            value={searchInput}
            onChange={this.onSearchInput}
          />

          <button
            type="button"
            data-testid="searchButton"
            className="search-btn"
            onClick={this.onSearchBtnClick}
          >
            <HiOutlineSearch className="search-icon" />
          </button>
        </div>
      )
    }

    return (
      <button
        type="button"
        data-testid="searchButton"
        className="search-btn-alone"
        onClick={this.navigateToSearchRoute}
      >
        <HiOutlineSearch className="search-icon" />
      </button>
    )
  }

  render() {
    const {displayHamburgerMenu} = this.state
    const {match} = this.props
    const {path} = match

    const homeClass = path === tabPathConstants.home ? 'active-link' : ''

    const popularClass = path === tabPathConstants.popular ? 'active-link' : ''

    const accountClass = path === tabPathConstants.account ? 'active-link' : ''

    return (
      <nav className="header-navbar">
        <div className="navbar-content">
          <div className="left-section">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dk6x9gpyl/image/upload/v1778093943/Group_7399_1_by8d7y.png"
                alt="website logo"
                className="website-logo"
              />
            </Link>

            <ul className="nav-menu">
              <li>
                <Link className={`nav-link ${homeClass}`} to="/">
                  Home
                </Link>
              </li>

              <li>
                <Link className={`nav-link ${popularClass}`} to="/popular">
                  Popular
                </Link>
              </li>
            </ul>
          </div>

          <div className="right-section">
            {this.renderSearchSection()}

            <Link to="/account">
              <img
                src="https://res.cloudinary.com/dlygjzdo7/image/upload/v1673088070/Netflix%20Clone%20App/Header/header_avatar_qistmq.svg"
                alt="profile"
                className="profile-image"
              />
            </Link>

            <button
              type="button"
              className="hamburger-btn"
              onClick={this.toggleHamburgerMenuDisplay}
            >
              <GiHamburgerMenu className="hamburger-icon" />
            </button>
          </div>
        </div>

        {displayHamburgerMenu && (
          <ul className="mobile-menu">
            <li>
              <Link to="/" className={`nav-link ${homeClass}`}>
                Home
              </Link>
            </li>

            <li>
              <Link to="/popular" className={`nav-link ${popularClass}`}>
                Popular
              </Link>
            </li>

            <li>
              <Link to="/account" className={`nav-link ${accountClass}`}>
                Account
              </Link>
            </li>

            <li>
              <button
                type="button"
                className="close-btn"
                onClick={this.collapseHamburgerMenu}
              >
                <RiCloseFill size={24} color="#fff" />
              </button>
            </li>
          </ul>
        )}
      </nav>
    )
  }
}

export default withRouter(Header)
