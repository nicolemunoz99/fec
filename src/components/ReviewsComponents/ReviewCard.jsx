import React from 'react';

const ReviewCard = (props) => {
  // console.log(props.review)
  let date = new Date(props.review.date);
  let monthNames = ["January", "February", "March", "April", "May", "June",
   "July", "August", "September", "October", "November", "December"];
  let day = date.getDate();
  let monthIndex = date.getMonth();
  let year = date.getFullYear();
  let daySuffix;
  if (day === 1 || day === 11 || day === 21 || day === 31) {
    daySuffix = 'st';
  } else if (day === 2 || day === 12 || day === 22) {
    daySuffix = 'nd';
  } else if (day === 3 || day === 13 || day === 23) {
    daySuffix = 'rd';
  } else {
    daySuffix = 'th';
  }
  date = monthNames[monthIndex] + ' ' + day + daySuffix + ', ' + year;
  return (
    <div className='review-card'>
      <div className='r-stars'>{props.review.rating} stars</div>
      <div className='r-info'>{props.review.reviewer_name}, {date}</div>
      <div className='r-summary'>{props.review.summary}</div>
      <div className='r-body'>{props.review.body}</div>
      <div className='r-bottom'>Helpful? <div className='text-button' id='helpful' onClick={(e) => {
        props.helpful(props.review.review_id);
        props.review.helpfulness++;
        e.target.style.display = 'none';
      }}>Yes</div> ({props.review.helpfulness}) | <div className='text-button' onClick={(e) => {
        // props.report(props.review.review_id);
        e.target.parentNode.parentNode.innerHTML = '<em>Thank you for your report. This review is now being examined by a moderator</em>';
      }}>Report</div></div>
    </div>
  );
}


export default ReviewCard;