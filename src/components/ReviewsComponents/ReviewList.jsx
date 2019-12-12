import React from 'react';
import ReviewCard from './ReviewCard.jsx';

const ReviewList = (props) => {
  // console.log(props);
  let moreButton = '';
  let reviewCards = props.state.reviews.map((review, i) => {
    let pass = true;
    if (props.state.more || i < 2) {
      if (props.state.search.length < 3 && !props.state.starFilters.length) {
        return <ReviewCard review={review} helpful={props.helpful} report={props.report} key={i} />;
      }
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
        });
        if (filters.includes(review.rating)) {
          pass = true;
        } else {
          pass = false;
        }
      }
      let bodymatch = false;
      let summatch = false;
      if (props.state.search.length > 2 && pass) {
        if (review.summary.toLowerCase().includes(props.state.search) || review.body.toLowerCase().includes(props.state.search)) {
          if (review.summary.toLowerCase().includes(props.state.search)) {
            let start = review.summary.toLowerCase().indexOf(props.state.search);
            let end = start + props.state.search.length;
            review.summary_begin = review.summary.slice(0, start);
            review.summary_match = review.summary.slice(start, end);
            review.summary_tail = review.summary.slice(end);
            summatch = true;
            pass = true;
          }
          if (review.body.toLowerCase().includes(props.state.search)) {
            let start = review.body.toLowerCase().indexOf(props.state.search);
            let end = start + props.state.search.length;
            review.body_begin = review.body.slice(0, start);
            review.body_match = review.body.slice(start, end);
            review.body_tail = review.body.slice(end);
            bodymatch = true;
            pass = true;
          }
        } else {
          pass = false;
        }
      }
      if (pass && (bodymatch && !summatch)) {
        return <ReviewCard review={review} helpful={props.helpful} report={props.report} key={i} bodymatch={true} />;
      } else if (pass && (summatch && !bodymatch)) {
        return <ReviewCard review={review} helpful={props.helpful} report={props.report} key={i} summatch={true} />;
      } else if (pass && (summatch && bodymatch)) {
        return <ReviewCard review={review} helpful={props.helpful} report={props.report} key={i} summatch={true} bodymatch={true} />;
      } else if (pass) {
        return <ReviewCard review={review} helpful={props.helpful} report={props.report} key={i} />;
      }
    }
  });
  let currentReviews = reviewCards.length;
  let now = new Date().getTime();
  window.onscroll = (e) => {
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight && props.state.more && props.total > currentReviews) {
      if (new Date().getTime() - now > 500) {
        props.update({ page: props.state.page + 1 }, true);
        now = new Date().getTime();
      }
    }
  };
  if (currentReviews > 2 && !props.state.starFilters.length && !props.state.search.length) {
    moreButton = (<button className='reviewsButton' data-selector='reviews-more' onClick={(e) => props.update({ more: !props.state.more })}>{props.state.more ? 'LESS REVIEWS' : 'MORE REVIEWS'}</button>);
  }
  let filters = props.state.search.length ? props.state.starFilters.concat(props.state.search) : props.state.starFilters;
  return (
    <div className='reviewlist' data-selector='review-list'>
      <div className='infoSort text-main bold'>{currentReviews} reviews, sorted by
          <select id='sortSelect' className='text-main bold' data-selector='reviews-sort' onChange={(e) => {
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
      <span className='rsearch' data-selector='reviews-search'><input id='rsearch' onChange={(e) => {
        let term = document.getElementById('rsearch').value.toLowerCase().trim();
        if (term.length > 2) {
          props.update({ search: term });
        } else if (props.state.search.length) {
          props.update({ search: '' });
        }
      }} placeholder='Search by keyword...'></input></span>
      <div className='filters text-sub'>Filters: {filters.length && filters[0] ? filters.join(', ') : 'none'}</div>
      <hr></hr>
      {reviewCards.length ? reviewCards : '<em>No reviews posted... yet</em>'}
      {moreButton}
      <button className='reviewsButton' data-selector='new-review' onClick={(e) => {
        document.getElementById('rmodal').style.display = 'block';
      }}>ADD A REVIEW +</button>
    </div>
  );
};

export default ReviewList;