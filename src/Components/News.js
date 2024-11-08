import React,{useState ,useEffect} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import '../App.css';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
   
  const [articles,setArticles]=useState([])
  const [loading,setLoading]=useState(true)
  const [page,setPage]=useState(1)
  const [totalResults,setTotalResults]=useState(0)
  const [parsedArticles, setParsedArticles] = useState(1)

  const capitalizeFirstLetter =(a)=> {
    return (a.slice(0, 1).toUpperCase() + a.slice(1, a.length));
  }
  
  const updateNews = async() =>
  {
    props.setProgress(10);
    const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData= await data.json();
    props.setProgress(50);
    let filteredArticles = parsedData.articles.filter(
      (article) => article.title && article.title !== "[Removed]"
    );
    props.setProgress(70);
    setArticles(filteredArticles);
    setTotalResults(parsedData.totalResults); 
    props.setProgress(100);
  }

  useEffect(() => {
     document.title=capitalizeFirstLetter(`${props.category} | NewsSnake`)
    updateNews(); 
    //eslint-disable-next-line
  },[])

  const fetchMoreData = async () => 
  {
    if (articles.length >= totalResults) return;
    const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1); 
    setLoading(true);
    let data = await fetch(url);
    let parsedData= await data.json()
    setParsedArticles(parsedData.articles.length);
    if (parsedData.articles.length === 0) return;
    let filteredArticles = parsedData.articles.filter(
      (article) => article.title && article.title !== "[Removed]"
    );
    setArticles(articles.concat( filteredArticles));
    setTotalResults(parsedData.totalResults); 
    setLoading(false);
  };

    return (
      <>
        <div className='container my-3'>
          <h1 className='text-center' style={{marginTop:'56px'}}>News<span className='font'>S</span>nake - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
          <InfiniteScroll dataLength={articles.length} next={fetchMoreData} hasMore={parsedArticles!==0} loader={loading && <Spinner/>}>
            <div className="container">
            <div className='row'>
              {articles.map((element)=>{
                return <div className='col-md-4' key={element.url}>
                <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageurl={element.urlToImage} newsurl={element.url} author={element.author?element.author:"Unknown"} date={new Date(element.publishedAt).toDateString()} time={new Date(element.publishedAt).toLocaleTimeString()} source={element.source.name}/>
              </div>  
            })}
            </div>
            </div>  
          </InfiniteScroll>
        </div>
      </>
    )
  }

  News.defaultProps=
  {
    country:'us',
    pageSize:6,
    category: 'general',
  }
  News.propTypes={
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

export default News