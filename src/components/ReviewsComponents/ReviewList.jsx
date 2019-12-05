import React from 'react';
import ReviewCard from './ReviewCard.jsx';

const ReviewList = (props) => {
  // console.log(props);
  let moreButton = '';
  if (props.state.reviews.length > 2) {
    moreButton = (<button onClick={(e) => props.update({ more: !props.state.more })}>{props.state.more ? 'LESS REVIEWS' : 'MORE REVIEWS'}</button>);
  }
  let currentReviews = (props.state.reviews.length);
  window.onscroll = (e) => {
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight && props.state.more && props.total !== currentReviews) {
      props.update({ page: props.state.page + 1 }, true);
    }
  };
  window.onclick = (e) => {
    if (e.target === document.getElementById('rmodal')) {
      document.getElementById('rmodal').style.display = 'none';
    }
  };
  let christics = [];
  let createChars = (char, meaning) => {
    let index;
    let radios = document.getElementsByName(char);
    if (radios) {
      for (let i = 0; i < radios.length; ++i) {
        if (radios[i].checked) {
          index = Number(radios[i].value) - 1;
        }
      }
    }
    christics.push(
      <div id={char + '-char'}>
        {char}: <div id={char + '-indicator'}>{index !== undefined ? meaning[index] : 'None selected'}</div>
        <input type='radio' name={char} value='1' required onChange={(e) => props.force()}></input>
        <label htmlFor='1'>1</label>
        <input type='radio' name={char} value='2' onChange={(e) => props.force()}></input>
        <label htmlFor='2'>2</label>
        <input type='radio' name={char} value='3' onChange={(e) => props.force()}></input>
        <label htmlFor='3'>3</label>
        <input type='radio' name={char} value='4' onChange={(e) => props.force()}></input>
        <label htmlFor='4'>4</label>
        <input type='radio' name={char} value='5' onChange={(e) => props.force()}></input>
        <label htmlFor='5'>5</label>
        <div id='size1'>{meaning[0]}</div>
        <div id='size5'>{meaning[4]}</div>
      </div>
    );
  }
  if (props.state.meta.characteristics.hasOwnProperty('Size')) {
    createChars('Size', ['A size too small', '1/2 a size too small', 'Perfect', '1/2 a size too big', 'A size too big'])
  }
  if (props.state.meta.characteristics.hasOwnProperty('Length')) {
    createChars('Length', ['Runs short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long']);
  }
  if (props.state.meta.characteristics.hasOwnProperty('Width')) {
    createChars('Width', ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide']);
  }
  if (props.state.meta.characteristics.hasOwnProperty('Fit')) {
    createChars('Fit', ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long']);
  }
  if (props.state.meta.characteristics.hasOwnProperty('Comfort')) {
    createChars('Comfort', ['Uncomfortable', 'Slightly uncomfortable', 'Okay', 'Comfortable', 'Perfect']);
  }
  if (props.state.meta.characteristics.hasOwnProperty('Quality')) {
    createChars('Quality', ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect']);
  }
  let charsLeft = 50;
  return (
    <div className='reviewlist'>
      <div id='infoSort'>{props.total} reviews, sorted by 
        <select id='sortSelect' onChange={(e) => {
          let select = document.getElementById("sortSelect");
          // let strUser = select.options[select.selectedIndex].value;
          props.update({ reviews: [], page: 1, sort: select.options[select.selectedIndex].value }, true);
        }}>
          <option defaultValue value='helpful'>helpfulness</option>
          <option value='newest'>newest</option>
          <option value='relevant'>relevance</option>
        </select>
      </div>
      {props.state.reviews.map((review, i) => {
        if (props.state.more) {
          return <ReviewCard review={review} helpful={props.helpful} report={props.report} key={i} />
        } else if (i < 2) {
          return <ReviewCard review={review} helpful={props.helpful} report={props.report} key={i} />
        }
      })}
      {moreButton}
      <button onClick={(e) => {
        document.getElementById('rmodal').style.display = 'block';
      }}>ADD A REVIEW +</button>
      <div id="rmodal" className="rmodal">
        <div className="rmodal-content">
          <span className="rclose" onClick={(e) => {
            document.getElementById('rmodal').style.display = 'none';
          }}>&times;</span>
          <h5>Write Your Review</h5>
          <form onSubmit={(e) => {
            e.preventDefault();
            let valid = true;
            let review = {};
            let rating = document.getElementsByName('rrating');
            if (rating) {
              for (let i = 0; i < rating.length; ++i) {
                if (rating[i].checked) {
                  review.rating = Number(rating[i].value);
                }
              }
            }
            review.summary = document.getElementById('rsummary').value;
            review.body = document.getElementById('rbody').value;
            let reco = document.getElementsByName('rrecommend');
            if (reco) {
              for (let i = 0; i < reco.length; ++i) {
                if (reco[i].checked) {
                  review.recommend = Boolean(reco[i].value);
                }
              }
            }
            review.name = document.getElementById('ruser').value;
            review.email = document.getElementById('remail').value;
            review.photos = [];
            review.characteristics = {};
            for (let key in props.state.meta.characteristics) {
              let chrating = document.getElementsByName(key);
              for (let i = 0; i < chrating.length; ++i) {
                if (chrating[i].checked) {
                  let strKey = props.state.meta.characteristics[key].id.toString();
                  review.characteristics[strKey] = Number(chrating[i].value);
                }
              }
            }

            console.log(review);
            props.submit(review);
            document.getElementById('rmodal').style.display = 'none';
          }}>
            Rating:
            <input type='radio' name='rrating' value='1' required></input>
            <label htmlFor='1'>1</label>
            <input type='radio' name='rrating' value='2'></input>
            <label htmlFor='2'>2</label>
            <input type='radio' name='rrating' value='3'></input>
            <label htmlFor='3'>3</label>
            <input type='radio' name='rrating' value='4'></input>
            <label htmlFor='4'>4</label>
            <input type='radio' name='rrating' value='5'></input>
            <label htmlFor='5'>5</label><br></br>
            Recommended: <input type='radio' name='rrecommend' value='true' required></input>
            <label htmlFor='yes'>Yes</label>
            <input type='radio' name='rrecommend' value='false'></input>
            <label htmlFor='no'>No</label><br></br>
            Characteristics:<br></br>
            <div id='christics'>{christics}</div>
            Summary:<br></br>
            <input type='text' id='rsummary' style={{ width: '15em' }} defaultValue={'About the ' + props.pname} maxLength='60' autoFocus required></input><br></br>
            Review body:<br></br>
            <textarea id='rbody' rows='4' minLength='50' maxLength='1000' required onChange={(e) => {
              charsLeft = 50 - document.getElementById('rbody').value.length;
              if (charsLeft < 0) {
                charsLeft = 0;
              }
              props.update({ charsLeft });
            }} placeholder="Why did or didn't you like the product?"></textarea><br></br>
            {props.state.charsLeft ? 'Minimum required characters left: ' + props.state.charsLeft : 'Minimum reached'}<br></br>
            Nickname:<br></br>
            <input type='text' id='ruser' style={{ width: '15em' }} placeholder='Example: jackson11!' required></input><br></br>
            Email:<br></br>
            <input type='text' id='remail' style={{ width: '15em' }} placeholder='Example: jackson11@email.com' required pattern='[^@\s]+@[^@\s]+\.[^@\s]+'></input><br></br>
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