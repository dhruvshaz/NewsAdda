import React, { useState, useEffect } from 'react';
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import defaultBanner from '../default-banner.jpg';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsAdda`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    const url = `https://eventregistry.org/api/v1/article/getArticles?locationUri=http://en.wikipedia.org/wiki/${props.country}&categoryUri=news/${props.category}&lang=${props.lang}&articlesPage=${page}&articlesCount=${props.pageSize}&apiKey=${props.apiKey}`;

    setLoading(true);
    try {
      const data = await fetch(url);
      const parsedData = await data.json();

      setArticles(parsedData.articles.results);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleOnClickNext = () => {
    setPage(page + 1);
    updateNews();
  };

  const handleOnClickPrevious = () => {
    setPage(page - 1);
    updateNews();
  };

  return (
    <div className="container my-2">
      <h1 className="text-center" style={{ margin: '25px', borderRadius: '10px' , marginTop:"90px" }}>
        NewsAdda - Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>

      {loading && <Spinner />}

      <div className="row my-2">
        {!loading &&
          articles &&
          articles.map((element) => (
            <div className="col-md-4 my-3" key={element.url}>
              <Newsitem
                title={element.title ? element.title : 'News Adda'}
                description={element.body ? element.body : 'Please Click on Read More to view full article'}
                imageUrl={element.image ? element.image : defaultBanner}
                newsUrl={element.url ? element.url : 'https://indianexpress.com'}
                date={!element.dateTimePub ? 'N/A' : element.dateTimePub}
                source={!element.source.title ? 'Unknown' : element.source.title}
              />
            </div>
          ))}
      </div>

      <div className="container d-flex justify-content-between my-1">
        {!loading && (
          <button
            disabled={page <= 1}
            type="button"
            className="btn btn-primary"
            onClick={handleOnClickPrevious}
          >
            &larr; Previous
          </button>
        )}
        {!loading && (
          <button
            disabled={page + 1 > Math.ceil(totalResults / props.pageSize)}
            type="button"
            className="btn btn-primary"
            onClick={handleOnClickNext}
          >
            Next &rarr;
          </button>
        )}
      </div>
    </div>
  );
};

News.defaultProps = {
  country: 'India',
  category: 'Science',
  pageSize: 12,
  lang: 'eng',
};

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  pageSize: PropTypes.number,
  lang: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
};

export default News;
