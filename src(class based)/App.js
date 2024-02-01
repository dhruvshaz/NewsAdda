import './App.css';
import React, { Component } from 'react'
import { Navbar } from './components/Navbar';
import News from './components/News';
import About from './components/About';
import Contact from './components/Contact';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NewsSearch from './components/NewsSearch';




export default class App extends Component {

  pageSize = 12;
  apiKey= process.env.REACT_APP_NEWS_API_KEY
  country = 'India';

  constructor() {
    super()
    this.state = {
      inputValue: 'India',
      lang :'eng'
    }
  }

  handleChange = (val) => {
    this.setState({
      inputValue: val
    })
  }

  handleChangeLang = (val) => {
    this.setState({
      lang : val
    })
  }


  render() {


    return (
      <div>
        <Router>

          <Navbar onSearchChange={this.handleChange} langChange={this.handleChangeLang}/>

          <Routes>

            <Route path='/search' element={this.state.inputValue && <NewsSearch apiKey={this.apiKey} searchValue={this.state.inputValue} key='Shimla' pageSize={this.pageSize} lang = {this.state.lang}  />} > </Route>

            <Route path='/' element={<News apiKey={this.apiKey} key='home' pageSize={this.pageSize} country={this.country} category='Science'  lang = {this.state.lang}  />}></Route>
            <Route path='/business' element={<News apiKey={this.apiKey} key='business' pageSize={this.pageSize} country={this.country} category='Business'  lang = {this.state.lang}  />}> </Route>
            <Route path='/entertainment' element={<News apiKey={this.apiKey} key='entertainment' pageSize={this.pageSize} country={this.country} category='Arts_and_Entertainment'  lang = {this.state.lang}  />}> </Route>
            <Route path='/environment' element={<News apiKey={this.apiKey} key='environment' pageSize={this.pageSize} country={this.country} category='Environment'  lang = {this.state.lang}  />}></Route>
            <Route path='/health' element={<News apiKey={this.apiKey} key='health' pageSize={this.pageSize} country={this.country} category='Health'  lang = {this.state.lang}  />}></Route>
            <Route path='/science' element={<News apiKey={this.apiKey} key='science' pageSize={this.pageSize} country={this.country} category='Science'  lang = {this.state.lang}  />}> </Route>
            <Route path='/sports' element={<News apiKey={this.apiKey} key='sports' pageSize={this.pageSize} country={this.country} category='Sports'  lang = {this.state.lang}  />}></Route>
            <Route path='/politics' element={<News apiKey={this.apiKey} key='politics' pageSize={this.pageSize} country={this.country} category='Politics'  lang = {this.state.lang}  />}></Route>
            <Route path='/about' element={<About />}></Route>
            <Route path='/contact' element={<Contact />}></Route>
          </Routes>

        </Router>
      </div>
    )
  }
}
