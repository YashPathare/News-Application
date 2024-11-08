import React from 'react'

const NewsItem = (props) => {
    let {title, description, imageurl, newsurl, author, date, time, source}=props;
    return (
      <div className='my-3'> 
        <div className="card" style={{width: "18rem"}}>
          <div style={{display:'flex',justifyContent:'flex-end',position:'absolute',right:'0'}}>
            <span className="badge rounded-pill bg-secondary">
              {source}
            </span>
          </div>
          <img src={imageurl?imageurl:"https:images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-body-secondary">By {author} on {date} {time} IST</small></p>
    
            <a href={newsurl} target='_blank' rel="noreferrer noopener" className="btn btn-light btn-sm">Read more</a>
          </div>
        </div>
      </div>
    )
  
}

export default NewsItem
