import React from 'react';
import axios from 'axios';
import StarRating from './StarRating.jsx'


// get number of reviews from GET to /reviews/:product_id/meta and summing
// all property values within the ratings property

class ProductBasics extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      avgRating: null
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
    return sum / count;
  }

  render() {
    return (
        <div className="row">
          
          <div className="col-sm-12 overview-component mt-2 mb-2">
            <StarRating rating={this.state.avgRating} />
          </div>
          <div className="col-sm-12">
            <p>Category: {this.props.productInfo.category}</p>
            <h2>{this.props.productInfo.name}</h2>
            <p>
              {this.props.productInfo.description ? this.props.productInfo.description : null}
            </p>
            <p>
            <a target="NONE" href="http://facebook.com" className="social-icon fab fa-facebook fa-1x px-2"></a>
            <a target="NONE" href="http://twitter.com" className="social-icon fab fa-twitter fa-1x px-2"></a>
            <a target="NONE" href="http://pinterest.com" className="social-icon fab fa-pinterest fa-1x px-2"></a>
            </p> 
          </div>
        </div>
    )
  }
}

export default ProductBasics