import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import defaultBanner from '../default-banner.jpg'


export class News extends Component { 

        static defaultProps={
          country  : 'in',
          category : 'general',
          pageSize : 12,
        }

        static propTypes={
          country  : PropTypes.string,
          category : PropTypes.string,
          pageSize : PropTypes.number,
        }

        constructor(props){
          super(props);
          this.state={
              articles:[],
              loading :true,
              page    :1
          }

          document.title=`${this.capitalizeFirstLetter(this.props.category)} - NewsAdda`;
        }

  capitalizeFirstLetter=(string)=>{
      return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async updateNews(){
    const url=`https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=597a9d5e409642f3ae2d49858b8cb4f0&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({loading:true})
        let data= await fetch(url);
        let parsedData= await data.json();
        this.setState({
            articles : parsedData.articles,
            totalResults  : parsedData.totalResults,
            loading  : false
        })
  }
    
  async componentDidMount(){
    this.updateNews();
  }

  handleOnClickNext= async()=>{
        this.setState({page : this.state.page+1})
        this.updateNews();
  }

  handleOnClickPrevious= async()=>{
        this.setState({page : this.state.page-1})
        this.updateNews();
  }


  render() {
    return (

      <div className='container my-2'>
        <h1 className='text-center' style={{margin:'25px', borderRadius: '10px'}}>NewsAdda - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>

        {this.state.loading && <Spinner/> }  

        <div className="row my-2">
            {!this.state.loading && this.state.articles.map((element)=>{
                return <div className="col-md-4 my-3" key={element.url}>
                            <Newsitem 
                                title={element.title?element.title:"News Adda"} 
                                description={element.description?element.description:"Please Click on Read More to view full article"} 
                                imageUrl={element.urlToImage?element.urlToImage:defaultBanner} 
                                newsUrl={element.url?element.url:"https://indianexpress.com"}
                                author={!element.author?"Unknown":element.author}
                                date={!element.publishedAt?"N/A":element.publishedAt}
                                source={!element.source.name?"Unknown":element.source.name}
                            />
                       </div>
            })}
                
        </div>

        <div className="container d-flex justify-content-between my-1">
        {!this.state.loading && <button disabled={this.state.page<=1} type='button' className='btn btn-primary' onClick={this.handleOnClickPrevious}>&larr; Previous</button>}
        {!this.state.loading && <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type='button' className='btn btn-primary' onClick={this.handleOnClickNext}>Next &rarr;</button>}
        </div>
    </div>
    )
  }
}

export default News
