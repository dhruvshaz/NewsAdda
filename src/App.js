import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import About from './components/About';
import Contact from './components/Contact';
import NewsSearch from './components/NewsSearch';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  const pageSize = 12;
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;
  const country = 'India';

  const [inputValue, setInputValue] = useState('India');
  const [lang, setLang] = useState('eng');

  const handleChange = (val) => {
    setInputValue(val);
  };

  const handleChangeLang = (val) => {
    setLang(val);
  };

  return (
    <div>
      <Router>
        <Navbar onSearchChange={handleChange} langChange={handleChangeLang} />

        <Routes>
          <Route
            path="/search"
            element={
              inputValue && (
                <NewsSearch
                  apiKey={apiKey}
                  searchValue={inputValue}
                  key="Shimla"
                  pageSize={pageSize}
                  lang={lang}
                />
              )
            }
          ></Route>

          <Route
            path="/"
            element={
              <News
                apiKey={apiKey}
                key="home"
                pageSize={pageSize}
                country={country}
                category="Science"
                lang={lang}
              />
            }
          ></Route>
          <Route
            path="/business"
            element={
              <News
                apiKey={apiKey}
                key="business"
                pageSize={pageSize}
                country={country}
                category="Business"
                lang={lang}
              />
            }
          ></Route>
          <Route
            path="/entertainment"
            element={
              <News
                apiKey={apiKey}
                key="entertainment"
                pageSize={pageSize}
                country={country}
                category="Arts_and_Entertainment"
                lang={lang}
              />
            }
          ></Route>
          <Route
            path="/environment"
            element={
              <News
                apiKey={apiKey}
                key="environment"
                pageSize={pageSize}
                country={country}
                category="Environment"
                lang={lang}
              />
            }
          ></Route>
          <Route
            path="/health"
            element={
              <News
                apiKey={apiKey}
                key="health"
                pageSize={pageSize}
                country={country}
                category="Health"
                lang={lang}
              />
            }
          ></Route>
          <Route
            path="/science"
            element={
              <News
                apiKey={apiKey}
                key="science"
                pageSize={pageSize}
                country={country}
                category="Science"
                lang={lang}
              />
            }
          ></Route>
          <Route
            path="/sports"
            element={
              <News
                apiKey={apiKey}
                key="sports"
                pageSize={pageSize}
                country={country}
                category="Sports"
                lang={lang}
              />
            }
          ></Route>
          <Route
            path="/politics"
            element={
              <News
                apiKey={apiKey}
                key="politics"
                pageSize={pageSize}
                country={country}
                category="Politics"
                lang={lang}
              />
            }
          ></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
