import React from 'react'
import ReviewList from './ReviewList.jsx'
import Ratings from './Ratings.jsx';
const url = 'http://3.134.102.30/reviews/';

class Reviews extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      more: false,
      reviews: [],
      meta: {}
    }

    this.updateState = this.updateState.bind(this);
    this.markHelpful = this.markHelpful.bind(this);
  }

  getReviews() {
    fetch(url + this.props.productInfo.id + `/list`)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        this.setState({
          reviews: result.results
        }, () => {
          console.log('Reviews retrieved and state updated successfully!');
        })
      })
      .catch((err) => {
        console.error(err);
      })
  }

  getMeta() {
    fetch(url + this.props.productInfo.id + `/meta`)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        this.setState({
          meta: result
        }, () => {
          console.log('Meta retrieved and state updated successfully!', this.state.meta);
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
    this.getMeta();
  }

  componentDidUpdate() {
    this.render();
  }

  render() {
    return (this.state.meta.hasOwnProperty('characteristics') ? this.renderReviews() : (
      <div>Loading Ratings & Reviews...</div>
    ));
  }

  renderReviews() {
    return (
      <div id='reviews'>
        RATINGS & REVIEWS
        <Ratings />
        <ReviewList reviews={this.state.reviews} more={this.state.more} update={this.updateState} helpful={this.markHelpful} report={this.reportReview} pname={this.props.productInfo.name} christics={this.state.meta.characteristics} />
      </div>
    )
  }
}

export default Reviews;