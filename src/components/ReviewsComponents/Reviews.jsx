import React from 'react'
import ReviewList from './ReviewList.jsx'
import Ratings from './Ratings.jsx';
const url = 'http://3.134.102.30/reviews/';

class Reviews extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      more: false,
      reviews: []
    }

    this.updateState = this.updateState.bind(this);
    this.markHelpful = this.markHelpful.bind(this);
  }

  getReviews() {
    fetch(url + this.props.productId + `/list`)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        this.setState({
          reviews: result.results
        }, () => {
          // console.log('Reviews retrieved and state updated successfully!');
        })
      })
      .catch((err) => {
        console.error(err);
      })
  }

  markHelpful(rid) {
    fetch(url + 'helpful/' + rid, {
      method: 'PUT'
    })
    .then(() => {
      this.forceUpdate();
      // console.log('refresh')
    })
    .catch((err) => {
      console.error(err);
    })
  }

  reportReview(rid) {
    fetch(url + 'report/' + rid, {
      method: 'PUT'
    })
    .then(() => {
      // console.log('reported, refresh and this review should be gone')
    })
    .catch((err) => {
      console.error(err);
    })
  }

  updateState(obj) {
    this.setState(obj);
  }

  componentDidMount() {
    this.getReviews();
  }

  render() {
    return (
      <div id='reviews'>
        RATINGS & REVIEWS
        <Ratings />
        <ReviewList reviews={this.state.reviews} more={this.state.more} update={this.updateState} helpful={this.markHelpful} report={this.reportReview}/>
      </div>
    )
  }
}

export default Reviews;