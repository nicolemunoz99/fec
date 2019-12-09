import React from 'react';
import ReviewCard from './ReviewCard.jsx';

const ReviewList = (props) => {
  // console.log(props);
  let moreButton = '';
  let currentReviews = (props.state.reviews.length);
  if (currentReviews > 2 && !props.state.starFilters.length) {
    moreButton = (<button className='reviewsButton' onClick={(e) => props.update({ more: !props.state.more })}>{props.state.more ? 'LESS REVIEWS' : 'MORE REVIEWS'}</button>);
  }
  let now = new Date().getTime();
  window.onscroll = (e) => {
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight && props.state.more && props.total !== currentReviews) {
      if (new Date().getTime() - now > 250) {
        // console.log('this only happens occasionally')
        props.update({ page: props.state.page + 1 }, true);
        now = new Date().getTime();
      }
    }
  };
  return (
    <div className='reviewlist'>
      <div className='infoSort'>{props.total} reviews, sorted by 
        <select id='sortSelect' onChange={(e) => {
          let select = document.getElementById("sortSelect");
          props.update({ reviews: [], page: 1, sort: select.options[select.selectedIndex].value }, true);
        }}>
          <option defaultValue value='helpful'>helpfulness</option>
          <option value='newest'>newest</option>
          <option value='relevant'>relevance</option>
        </select>
      </div>
      {props.state.reviews.map((review, i) => {
        if (props.state.more || i < 2) {
          if (props.state.starFilters.length) {
            let filters = props.state.starFilters.map((filter, i) => {
              if (filter === 'fivestars') {
                return 5;
              } else if (filter === 'fourstars') {
                return 4;
              } else if (filter === 'threestars') {
                return 3;
              } else if (filter === 'twostars') {
                return 2;
              } else if (filter === 'onestar') {
                return 1;
              }
            })
            if (filters.includes(review.rating)) {
              return <ReviewCard review={review} helpful={props.helpful} report={props.report} key={i} />;
            }
          } else {
            return <ReviewCard review={review} helpful={props.helpful} report={props.report} key={i} />;
          }
        }
      })}
      {moreButton}
      <button className='reviewsButton' onClick={(e) => {
        document.getElementById('rmodal').style.display = 'block';
      }}>ADD A REVIEW +</button>
    </div>
  );
};

export default ReviewList;