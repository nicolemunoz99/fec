import React from 'react';
import axios from 'axios';
import StarRating from './StarRating.jsx'


// get number of reviews from GET to /reviews/:product_id/meta and summing
// all property values within the ratings property

class ProductBasics extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      avgRating: undefined,
      numReviews: 0
    }
    this.getMetaRating = this.getMetaRating.bind(this);
  }

  componentDidMount() {
    // console.log('productBasics mounted')
    this.getMetaRating(this.props.productInfo.id)
  }

  componentDidUpdate(prevProps) {
    // console.log('productBasics updated')
    if (prevProps.productInfo.id !== this.props.productInfo.id) {
      this.getMetaRating(this.props.productInfo.id)
    }
  }

  getMetaRating(productId) {
    axios.get(`http://3.134.102.30/reviews/${productId}/meta`)
    .then(response => {
      let avgRating = this.calcAvgRating(response.data.ratings)
      this.setState({ avgRating })
    })
  }

  calcAvgRating(ratings) {
    if (Object.keys(ratings).length === 0) { return }
    let sum = 0;
    let count = 0;
    for (const key in ratings) {
      count += ratings[key];
      sum += Number(key) * Number(ratings[key]);
    }
    this.setState({ numReviews: count })
    return sum / count;
  }

  render() {
    return (
        <div className="row">
          
          <div className="col-sm-12 mt-2 mb-2 mt-4">
            <span>
              <StarRating rating={this.state.avgRating} />
              {
              this.state.avgRating === undefined ? null :
                <span className="overview-reviews pl-1"><a href="#reviews">{`Read all ${this.state.numReviews} reviews`}</a></span>
              }
                </span>
          
          </div>
 
          <div className="col-sm-12">
            <div id="fb-root"></div> 
            <p>Category: {this.props.productInfo.category}</p>
            <h2>{this.props.productInfo.name}</h2>
            <p>
              {this.props.productInfo.description ? this.props.productInfo.description : null}
            </p>
            <p>
            
            <a target="NONE" href={`https://twitter.com/intent/tweet?text=Look%20what%20I%20found%20at%20Greenfield!!  ${this.props.productInfo.description}`} className="social-icon fab fa-twitter fa-1x px-2"></a>
            <a href="https://www.pinterest.com/pin/create/button/" data-pin-do="buttonBookmark" className="social-icon fab fa-pinterest fa-1x px-2"></a>
            
            <div className="fb-share-button" data-href="http://127.0.0.1:8080/" data-layout="button" data-size="small"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2F127.0.0.1%3A8080%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">Share</a></div>
            
            </p>
            
          </div>
        </div>
    )
  }
}

export default ProductBasics