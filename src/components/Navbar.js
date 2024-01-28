import React, { Component } from 'react'
import { Link} from 'react-router-dom'
import logo from '../favicon-32x32.png'

export class Navbar extends Component {


  constructor() {
    super()
    this.state = {
      searchValue: 'technology',
    }
  }

  newsSearchChange = (event) => {
    this.setState({
      searchValue: event.target.value
    })
  }
  newsSearchClick = (e) => {
    const { onSearchChange } = this.props;
    onSearchChange(this.state.searchValue);
    e.preventDefault();
  }

  render() {

    return (
      <nav className="navbar navbar-expand-lg enhanced-navbar" data-bs-theme="dark">
        <div className="container-fluid">

          <img className='mx-2 my-1 logo' src={logo} alt="Your Logo" height="30" />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/business">
                  Business
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/entertainment">
                  Entertainment
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/general">
                  General
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/health">
                  Health
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/science">
                  Science
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/sports">
                  Sports
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/technology">
                  Technology
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/about">
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/contact">
                  Contact Us
                </Link>
              </li>
            </ul>
            <Link className="nav-link active" to="/search">
            <form className="d-flex mx-2 enhanced-search" role="search">
              
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                required
                value={this.state.searchValue}
                onChange={this.newsSearchChange}
              />
              
                <button
                  className="btn btn-outline-primary"
                  style={{ backgroundColor: 'blue', color: 'white', fontSize: '20px', margin: '2px' }}
                  onClick={(e) => { this.newsSearchClick(e) }}
                  type="submit"
                  disabled={!this.state.searchValue.trim()}
                  required
                >
                  Search
                </button>
              
            </form>
            </Link>

          </div>

        </div>
      </nav>
    )
  }
}

export default Navbar;

