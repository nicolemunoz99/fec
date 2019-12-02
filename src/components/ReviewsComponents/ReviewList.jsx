import React from 'react';
import ReviewCard from './ReviewCard.jsx';

const ReviewList = (props) => {
  let shown = 2;
  let moreButton = '';
  if (props.reviews.length > 2) {
    moreButton = `<button onClick={(e) => props.update({ more: !props.more })}>{props.more ? 'LESS REVIEWS' : 'MORE REVIEWS'}</button>`;
  }
  let modal = document.getElementById('rmodal');
  window.onclick = (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  }
  return (
    <div className='reviewlist'>
      {props.reviews.length} reviews, sorted by X
      {props.reviews.map((review, i) => {
        if (props.more) {
          return <ReviewCard review={review} helpful={props.helpful} report={props.report} key={i} />
        } else if (i < shown) {
          return <ReviewCard review={review} helpful={props.helpful} report={props.report} key={i} />
        }
      })}
      {moreButton}
      <button onClick={(e) => {
        modal.style.display = 'block';
      }}>ADD A REVIEW +</button>
      <div id="rmodal" className="rmodal">
        <div className="rmodal-content">
          <span className="rclose" onClick={(e) => {
            modal.style.display = 'none';
          }}>&times;</span>
          <h5>Write Your Review</h5>
          <form>
          Summary:<br></br>
          <input type='text' id='rsummary' defaultValue='About the ' autoFocus required></input><br></br>
          Rating: 
          <select id='rrating'>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </select><br></br>
          Review body:<br></br>
          <input type='textarea' id='rbody' rows='4' placeholder='Tell everyone about your experience...' required></input><br></br>
          <input type='checkbox' id='rrecommend'></input> Recommended <br></br>
          Name:<br></br>
          <input type='text' id='ruser' placeholder='Username...'></input><br></br>
          Email:<br></br>
          <input type='text' id='remail' placeholder='Email...'></input><br></br>
          Images:<br></br>

          Characteristics:<br></br>
          
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewList;