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
  country = 'India';

  constructor() {
    super()
    this.state = {
      inputValue: 'Shimla',
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
    console.log("ye hai lang "+this.state.lang)
  }


  render() {


    return (
      <div>
        <Router>

          <Navbar onSearchChange={this.handleChange} langChange={this.handleChangeLang}/>

          <Routes>

            <Route path='/search' element={this.state.inputValue && <NewsSearch searchValue={this.state.inputValue} key='Shimla' pageSize={this.pageSize} lang = {this.state.lang}  />} > </Route>

            <Route path='/' element={<News key='home' pageSize={this.pageSize} country={this.country} category='Science'  lang = {this.state.lang}  />}></Route>
            <Route path='/business' element={<News key='business' pageSize={this.pageSize} country={this.country} category='Business'  lang = {this.state.lang}  />}> </Route>
            <Route path='/entertainment' element={<News key='entertainment' pageSize={this.pageSize} country={this.country} category='Arts_and_Entertainment'  lang = {this.state.lang}  />}> </Route>
            <Route path='/environment' element={<News key='environment' pageSize={this.pageSize} country={this.country} category='Environment'  lang = {this.state.lang}  />}></Route>
            <Route path='/health' element={<News key='health' pageSize={this.pageSize} country={this.country} category='Health'  lang = {this.state.lang}  />}></Route>
            <Route path='/science' element={<News key='science' pageSize={this.pageSize} country={this.country} category='Science'  lang = {this.state.lang}  />}> </Route>
            <Route path='/sports' element={<News key='sports' pageSize={this.pageSize} country={this.country} category='Sports'  lang = {this.state.lang}  />}></Route>
            <Route path='/politics' element={<News key='politics' pageSize={this.pageSize} country={this.country} category='Politics'  lang = {this.state.lang}  />}></Route>
            <Route path='/about' element={<About />}></Route>
            <Route path='/contact' element={<Contact />}></Route>
          </Routes>

        </Router>
      </div>
    )
  }
}
