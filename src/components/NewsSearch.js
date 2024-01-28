import React, { Component } from 'react'
import Spinner from './Spinner';
import Newsitem from './Newsitem';
import defaultBanner from '../default-banner.jpg'
import PropTypes from 'prop-types'


export default class NewsSearch extends Component {
  
    static defaultProps={
        pageSize : 12,
        searchValue : 'science'
      }

      static propTypes={
        pageSize : PropTypes.number,
      }

    constructor(props){
        super(props);
        this.state={
          loading     : false,
          articles    : [],
          page        : 1
        }

        document.title=`${this.capitalizeFirstLetter(this.props.searchValue)} - NewsAdda`;
      }

      capitalizeFirstLetter=(string)=>{
          return string.charAt(0).toUpperCase() + string.slice(1);
      }

      updateNews=async()=>{
        console.log("app se news search me "+this.props.searchValue)
        const url=`https://newsapi.org/v2/everything?q=${this.props.searchValue?this.props.searchValue:'science'}&apiKey=597a9d5e409642f3ae2d49858b8cb4f0&page=${this.state.page}&pagesize=${this.props.pageSize}`
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

      componentDidUpdate(prevProps) {
        if (this.props.searchValue !== prevProps.searchValue) {
          this.setState({searchValue: this.props.searchValue}, () => {
            this.updateNews();
          });
        }
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
        <h1 className='text-center' style={{margin:'25px', borderRadius: '10px'}}>Search Results For {this.capitalizeFirstLetter(this.props.searchValue)}</h1>

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