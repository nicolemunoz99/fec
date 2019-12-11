import React from 'react';
import StarRating from '../overview/StarRating.jsx';

const ReviewCard = (props) => {
  // console.log(props.review)
  let date = new Date(props.review.date);
  let monthNames = ["January", "February", "March", "April", "May", "June",
   "July", "August", "September", "October", "November", "December"];
  let day = date.getDate();
  let monthIndex = date.getMonth();
  let year = date.getFullYear();
  let daySuffix;
  if (day === 1 || day === 21 || day === 31) {
    daySuffix = 'st';
  } else if (day === 2 || day === 22) {
    daySuffix = 'nd';
  } else if (day === 3 || day === 23) {
    daySuffix = 'rd';
  } else {
    daySuffix = 'th';
  }
  date = monthNames[monthIndex] + ' ' + day + daySuffix + ', ' + year;
  let showMore;
  if (props.review.body.length > 250) {
    showMore = (<div className='text-button' onClick={(e) => {
      e.target.parentNode.innerHTML = props.review.body;
    }}>Show more</div>);
  }
  return (
    <div className='review-card' data-selector='review-card'>
      <div className='r-stars'>
        <StarRating rating={props.review.rating} />
      </div>
      <div className='r-info text-sub'>{props.review.reviewer_name}, {date}</div>
      <div className='r-summary text-main bold'>{props.review.summary}</div>
      <div className='r-body text-reg'>{props.review.body.slice(0, 250)}{showMore}</div>
      <div className='r-bottom text-sub'>Helpful? <div className='text-button' id='helpful' onClick={(e) => {
        props.helpful(props.review.review_id);
        props.review.helpfulness++;
        e.target.style.display = 'none';
      }} data-selector='review-helpful'>Yes</div> ({props.review.helpfulness}) | <div className='text-button' onClick={(e) => {
        props.report(props.review.review_id);
        e.target.parentNode.parentNode.innerHTML = '<em>Thank you for your report. This review is now being examined by a moderator</em>';
      }} data-selector='review-report'>Report</div></div>
      <hr></hr>
    </div>
  );
}

export default ReviewCard;