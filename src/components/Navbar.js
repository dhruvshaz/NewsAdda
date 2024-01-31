import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logo from '../favicon-32x32.png'

export class Navbar extends Component {


  constructor() {
    super()
    this.state = {
      searchValue: 'Shimla',
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

  onClickEnglish = (e) => {
    const { langChange } = this.props;
    langChange('eng');
    e.preventDefault();
  }
  onClickHindi = (e) => {
    const { langChange } = this.props;
    langChange('hin');
    e.preventDefault();
  }

  render() {

    return (
      <nav className="navbar navbar-expand-lg enhanced-navbar" data-bs-theme="dark">
        <div className="container-fluid">

          <img className='mx-2 my-1 logo' src={logo} alt="Your Logo" />
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
                  Arts & Entertainment
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/environment">
                  Environment
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
                <Link className="nav-link active" to="/politics">
                  Politics
                </Link>
              </li>
              <li className="nav-item dropdown mx-2">
                <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Language
                </a>
                <ul className="dropdown-menu">
                  <li><li className="form-check form-check-inline custom-radio my-2 mx-3">
                    <input className="form-check-input" type="radio" onChange={this.onClickEnglish} name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
                    <label className="form-check-label text-white" for="inlineRadio1">English</label>
                  </li></li>
                  <li className="form-check form-check-inline my-2 mx-3">
                    <input className="form-check-input" type="radio" onChange={this.onClickHindi} name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                    <label className="form-check-label text-white" for="inlineRadio2">Hindi</label>
                  </li>
                </ul>
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

