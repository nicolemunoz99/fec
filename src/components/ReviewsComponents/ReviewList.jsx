import React from 'react';
import ReviewCard from './ReviewCard.jsx';

const ReviewList = (props) => {
  // console.log(props);
  let moreButton = '';
  let currentReviews = (props.state.reviews.length);
  let now = new Date().getTime();
  window.onscroll = (e) => {
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight && props.state.more && props.total > currentReviews) {
      if (new Date().getTime() - now > 500) {
        props.update({ page: props.state.page + 1 }, true);
        now = new Date().getTime();
      }
    }
  };
  if (currentReviews > 2 && !props.state.starFilters.length) {
    moreButton = (<button className='reviewsButton' onClick={(e) => props.update({ more: !props.state.more })}>{props.state.more ? 'LESS REVIEWS' : 'MORE REVIEWS'}</button>);
  }
  let filters = props.state.starFilters.concat(props.state.search);
  return (
    <div className='reviewlist'>
      <div className='infoSort text-main bold'>{props.total} reviews, sorted by
          <select id='sortSelect' className='text-main bold' onChange={(e) => {
          let select = document.getElementById("sortSelect");
          let selected = select.options[select.selectedIndex];
          for (let i = 0; i < select.options.length; ++i) {
            select.options[i].style.display = 'block';
          }
          selected.style.display = 'none';
          props.update({ reviews: [], page: 1, sort: selected.value }, true);
        }}>
          <option defaultValue value='helpful' style={{ display: 'none' }}>helpfulness</option>
          <option value='newest'>newest</option>
          <option value='relevant'>relevance</option>
        </select>
      </div>
      <span className='rsearch'><input id='rsearch' onChange={(e) => {
        let term = document.getElementById('rsearch').value.toLowerCase().trim();
        if (term.length > 2) {
          props.update({ search: term });
        } else if (props.state.search.length) {
          props.update({ search: '' });
        }
      }} placeholder='Search by keyword...'></input></span> 
      <div className='filters text-sub'>Filters: {filters.length && filters[0] ? filters.join(', ') : 'none'}</div>
      <hr></hr>
      {props.state.reviews.length ? props.state.reviews.map((review, i) => {
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
          } else if (review.summary.toLowerCase().includes(props.state.search) || review.body.toLowerCase().includes(props.state.search)) {
            return <ReviewCard review={review} helpful={props.helpful} report={props.report} key={i} />;
          }
        }
      }) : (<em>No reviews posted... yet</em>)}
      {moreButton}
      <button className='reviewsButton' onClick={(e) => {
        document.getElementById('rmodal').style.display = 'block';
      }}>ADD A REVIEW +</button>
    </div>
  );
};

export default ReviewList;