import React, {useState} from 'react';
import StarRating from '../overview/StarRating.jsx';
import AnswerPhotos from '../QAComponents/AnswerPhotos.jsx';

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
  const [shownBody, setBody] = useState(props.review.body.slice(0, 250));
  if (props.review.body.length > 250 && !props.bodymatch) {
    showMore = (<div className='text-button' onClick={(e) => {
      setBody(props.review.body);
      e.target.parentNode.innerHTML = '';
    }}>Show more</div>);
  }
  return (
    <div className='review-card' data-selector='review-card'>
      <div className='r-stars'>
        <StarRating rating={props.review.rating} />
      </div>
      <div className='r-info text-sub'>{props.review.reviewer_name}, {date}</div>
      <div className='r-summary text-main bold'>{props.summatch ? props.review.summary_begin : props.review.summary}
        <span className='highlight'>{props.summatch ? props.review.summary_match : ''}</span>
        {props.summatch ? props.review.summary_tail : ''}
      </div>
      <div className='r-body text-reg'>{props.bodymatch ? props.review.body_begin : shownBody}
        <span className='highlight'>{props.bodymatch ? props.review.body_match : ''}</span>
        {props.bodymatch ? props.review.body_tail : ''}
        {props.bodymatch ? '' : (<div>{showMore}</div>)}
      </div>
      {props.review.photos.length > 0 && <AnswerPhotos answer={props.review} />}
      <div className='r-bottom text-sub'>Helpful? <div className='text-button' id='helpful' onClick={(e) => {
        props.helpful(props.review.review_id);
        props.review.helpfulness++;
        e.target.style.display = 'none';
      }} data-selector='review-helpful'>Yes</div> ({props.review.helpfulness}) | <div className='text-button' onClick={(e) => {
        props.report(props.review.review_id);
        e.target.parentNode.parentNode.innerHTML = '<em>Thank you for your report. This review is now being examined by a moderator</em><hr></hr>';
      }} data-selector='review-report'>Report</div></div>
      <hr></hr>
    </div>
  );
}

export default ReviewCard;