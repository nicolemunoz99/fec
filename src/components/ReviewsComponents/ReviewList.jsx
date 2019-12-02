import React from 'react';
import ReviewCard from './ReviewCard.jsx';

const ReviewList = (props) => {
  console.log(props);
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

  let getChristics = (chars) => {
    let christics = '';
    if (chars.hasOwnProperty('Size')) {
      let sizeMeaning = ['A size too small', '1/2 a size too small', 'Perfect', '1/2 a size too big', 'A size too big'];
      let index;
      let radios = document.getElementsByName('size');
      if (radios) {
        for (let i = 0; i < radios.length; ++i) {
          if (radios[i].checked) {
            index = radios[i].value + 1;
          }
        }
      }
      christics += `<div id='size-indicator'>${index ? sizeMeaning[index] : 'None selected'}</div>Size<input type='radio' name='size' value='1'></input><label htmlFor='1'>1</label><input type='radio' name='size' value='2'></input><label htmlFor='2'>2</label><input type='radio' name='size' value='3'></input><label htmlFor='3'>3</label><input type='radio' name='size' value='4'></input><label htmlFor='4'>4</label><input type='radio' name='size' value='5'></input><label htmlFor='5'>5</label><div id='size1'>${sizeMeaning[0]}</div><div id='size5'>${sizeMeaning[4]}</div>`;
    }
    // if (christics.length) {
  
    // }
    return christics;
  }

  return (
    <div className='reviewlist'>
      {props.reviews.length} reviews, sorted by X
      {props.reviews.map((review, i) => {
        if (props.more) {
          return <ReviewCard review={review} helpful={props.helpful} report={props.report} key={i} />
        } else if (i < 2) {
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
            Rating:
            <input type='radio' name='rrating' value='1'></input>
            <label htmlFor='1'>1</label>
            <input type='radio' name='rrating' value='2'></input>
            <label htmlFor='2'>2</label>
            <input type='radio' name='rrating' value='3'></input>
            <label htmlFor='3'>3</label>
            <input type='radio' name='rrating' value='4'></input>
            <label htmlFor='4'>4</label>
            <input type='radio' name='rrating' value='5'></input>
            <label htmlFor='5'>5</label><br></br>
            Recommended: <input type='radio' name='rrecommend' value='yes'></input>
            <label htmlFor='yes'>Yes</label>
            <input type='radio' name='rrecommend' value='no'></input>
            <label htmlFor='no'>No</label><br></br>
            Characteristics:<br></br>
            {getChristics(props.christics)}
            Summary:<br></br>
            <input type='text' id='rsummary' defaultValue={'About the' + props.pname} maxLength='60' autoFocus required></input><br></br>
            Review body:<br></br>
            <textarea id='rbody' rows='4' placeholder='Why did you like the product or not?' maxLength='1000' required></textarea><br></br>
            Nickname:<br></br>
            <input type='text' id='ruser' placeholder='Example: jackson11!'></input><br></br>
            Email:<br></br>
            <input type='text' id='remail' style={{ width: '15em' }} placeholder='Example: jackson11@email.com'></input><br></br>
            For authentication reasons, you will not be emailed <br></br>
            Images:<br></br>
            <em>FUTURE FEATURE</em><br></br>
            <button>Submit Review</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewList;