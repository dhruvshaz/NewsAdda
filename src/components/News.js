import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import defaultBanner from '../default-banner.jpg'


export class News extends Component { 

        static defaultProps={
          country  : 'India',
          category : 'Science',
          pageSize : 12,
          lang     : 'eng'
        }

        static propTypes={
          country  : PropTypes.string,
          category : PropTypes.string,
          pageSize : PropTypes.number,
          lang     : PropTypes.string,
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

  updateNews=async()=>{
    const url=`https://eventregistry.org/api/v1/article/getArticles?locationUri=http://en.wikipedia.org/wiki/${this.props.country}&categoryUri=news/${this.props.category}&lang=${this.props.lang}&articlesPage=${this.state.page}&articlesCount=${this.props.pageSize}&apiKey=${this.props.apiKey}`
    this.setState({loading:true})
    let data= await fetch(url);
    let parsedData= await data.json();
    this.setState({
        articles : parsedData.articles.results,
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
            {!this.state.loading && this.state.articles && this.state.articles.map((element)=>{
                return <div className="col-md-4 my-3" key={element.url}>
                            <Newsitem 
                                title={element.title?element.title:"News Adda"} 
                                description={element.body?element.body:"Please Click on Read More to view full article"} 
                                imageUrl={element.image?element.image:defaultBanner} 
                                newsUrl={element.url?element.url:"https://indianexpress.com"}
                                date={!element.dateTimePub?"N/A":element.dateTimePub}
                                source={!element.source.title?"Unknown":element.source.title}
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
