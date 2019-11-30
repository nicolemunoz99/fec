import React from 'react';
import ReviewCard from './ReviewCard.jsx';

const ReviewList = (props) => {
  let shown = 2;
  return (
    <div className='reviewlist'>
      {props.reviews.length} reviews, sorted by X
      {props.reviews.map((review, i) => {
        if (props.more || props.reviews.length < 2) {
          return <ReviewCard review={review} update={props.update} helpful={props.helpful} key={i} />
        } else if (i < shown) {
          return <ReviewCard review={review} update={props.update} helpful={props.helpful} key={i} />
        }
      })}
      <button onClick={(e) => props.update({more: !props.more})}>{props.more ? 'LESS REVIEWS' : 'MORE REVIEWS'}</button>
      <button>ADD A REVIEW  +</button>
    </div>
  );
};

export default ReviewList;