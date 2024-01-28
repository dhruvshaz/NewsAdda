import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {

    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;

    return (
      <div className="card news-card">
        <img src={imageUrl} className="card-img-top" style={{ height: '250px' }} alt="..." />
        <span className="bg-danger badge">
          {source}
        </span>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-body-secondary">By {author} on {new Date(date).toGMTString()}</small>
          </p>
          <a href={newsUrl} className="btn btn-sm btn-dark">
            Read More
          </a>
        </div>
      </div>
    )
  }
}

export default Newsitem
