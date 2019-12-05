import React from 'react'
import ReviewList from './ReviewList.jsx'
import Ratings from './Ratings.jsx';
const url = 'http://3.134.102.30/reviews/';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      more: false,
      reviews: [],
      meta: {},
      page: 1,
      sort: 'helpful',
      charsLeft: 50
    };

    this.updateState = this.updateState.bind(this);
    this.markHelpful = this.markHelpful.bind(this);
    this.force = this.force.bind(this);
    this.submitReview = this.submitReview.bind(this);
  }

  getReviews() {
    fetch(url + this.props.productInfo.id + `/list?page=${this.state.page}&sort=${this.state.sort}`)
      .then((response) => {
        // console.log(this.state);
        return response.json();
      })
      .then((result) => {
        this.setState({
          reviews: this.state.reviews.concat(result.results)
        }, () => {
          // console.log('Reviews retrieved and state updated successfully!');
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
          // console.log('Meta retrieved and state updated successfully!', this.state.meta);
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

  submitReview(review) {
    fetch(url + this.props.productInfo.id, {
      method: 'POST',
      body: JSON.stringify(review),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      this.getMeta();
      // console.log('New review added', response.status)
    })
    .catch((err) => {
      console.error(err);
    })
  }

  force() {
    this.forceUpdate();
    // console.log('updated');
  }

  updateState(obj, update) {
    this.setState(obj, () => {
      if (update) {
        this.getReviews();
      }
    });
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
        <ReviewList state={this.state} 
        update={this.updateState} 
        helpful={this.markHelpful} 
        report={this.reportReview} 
        pname={this.props.productInfo.name} 
        force={this.force} 
        submit={this.submitReview}
        total={this.state.meta.recommended['0'] + this.state.meta.recommended['1']}/>
      </div>
    )
  }
}

export default Reviews;