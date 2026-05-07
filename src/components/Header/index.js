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

  onSearchBtnClick = e => {
    e.preventDefault()
    const {searchInput} = this.state
    const {searchMovies} = this.props
    if (searchInput !== '' && searchMovies !== undefined) {
      searchMovies(searchInput)
    }
  }

  onSearchInput = e => {
    this.setState({searchInput: e.target.value})
  }

  togglingSearchBarDisplayResult = () => {
    const {searchInput} = this.state
    const {match} = this.props
    const {path} = match

    if (path === tabPathConstants.search) {
      return (
        <div className="search-bar-icon-container">
          <input
            onChange={this.onSearchInput}
            value={searchInput}
            placeholder="Search"
            type="search"
            className="search-input"
          />
          <button
            data-testid="searchButton"
            className="search-icon-button"
            type="button"
            onClick={this.onSearchBtnClick}
          >
            <HiOutlineSearch className="search-icon-alone" />
          </button>
        </div>
      )
    }
    return (
      <button
        data-testid="searchButton"
        onClick={this.navigateToSearchRoute}
        className="search-icon-button"
        type="button"
      >
        <HiOutlineSearch className="search-icon-alone" />
      </button>
    )
  }

  render() {
    const {displayHamburgerMenu} = this.state
    const {match} = this.props
    const {path} = match

    const homeClass = path === tabPathConstants.home ? 'active-tab-class' : ''
    const popularClass =
      path === tabPathConstants.popular ? 'active-tab-class' : ''
    const accountClass =
      path === tabPathConstants.account ? 'active-tab-class' : ''

    return (
      <nav className="header-nav-bar">
        <div className="nav-items-container">
          <div className="logo-container">
            <Link to="/">
              <img
                className="header-movies-logo"
                src="https://res.cloudinary.com/dk6x9gpyl/image/upload/v1778093943/Group_7399_1_by8d7y.png"
                alt="website logo"
              />
            </Link>
            <ul className="menu-options-container">
              <li className="menu-option" key="home">
                <Link className={`menu-option-nav-link-item ${homeClass}`} to="/">
                  Home
                </Link>
              </li>
              <li className="menu-option" key="popular">
                <Link
                  className={`menu-option-nav-link-item ${popularClass}`}
                  to="/popular"
                >
                  Popular
                </Link>
              </li>
            </ul>
          </div>
          <div className="search-avatar-container">
            {this.togglingSearchBarDisplayResult()}
            <Link to="/account">
              <img
                alt="profile"
                className="header-avatar"
                src="https://res.cloudinary.com/dlygjzdo7/image/upload/v1673088070/Netflix%20Clone%20App/Header/header_avatar_qistmq.svg"
              />
            </Link>
            <button
              onClick={this.toggleHamburgerMenuDisplay}
              type="button"
              className="hamburger-button"
            >
              <GiHamburgerMenu className="hamburger-icon" />
            </button>
          </div>
        </div>
        {displayHamburgerMenu && (
          <ul className="menu-items-list-mobile-view-container">
            <li className="menu-option-mobile" key="home">
              <Link className={`menu-option-nav-link-item ${homeClass}`} to="/">
                Home
              </Link>
            </li>
            <li className="menu-option-mobile" key="popular">
              <Link
                className={`menu-option-nav-link-item ${popularClass}`}
                to="/popular"
              >
                Popular
              </Link>
            </li>
            <li className="menu-option-mobile" key="account">
              <Link
                className={`menu-option-nav-link-item ${accountClass}`}
                to="/account"
              >
                Account
              </Link>
            </li>
            <li className="close-menu-option" key="close">
              <button
                onClick={this.collapseHamburgerMenu}
                className="close-button"
                type="button"
              >
                <RiCloseFill size={25} color="#ffffff" />
              </button>
            </li>
          </ul>
        )}
      </nav>
    )
  }
}

export default withRouter(Header)