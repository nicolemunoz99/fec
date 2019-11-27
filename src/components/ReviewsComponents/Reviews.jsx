import React from 'react'
import ReviewList from './ReviewList.jsx'
import Ratings from './Ratings.jsx';

class Reviews extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id='reviews'>
        RATINGS & REVIEWS
        <Ratings />
        <ReviewList />
      </div>
    )
  }
}

export default Reviews;