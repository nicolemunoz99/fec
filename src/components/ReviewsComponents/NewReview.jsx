import React from 'react';
import StarRating from '../overview/StarRating.jsx';

const NewReview = (props) => {
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
      <div className='charContainer' key={char}>
        {char}: <div className='indicator'>{index !== undefined ? meaning[index] : 'None selected'}</div>
        <div className='char'>
          <div>
            <input type='radio' name={char} value='1' required onChange={(e) => props.force()}></input>
          </div>
          <div>
            <input type='radio' name={char} value='2' onChange={(e) => props.force()}></input>
          </div>
          <div>
            <input type='radio' name={char} value='3' onChange={(e) => props.force()}></input>
          </div>
          <div>
            <input type='radio' name={char} value='4' onChange={(e) => props.force()}></input>
          </div>
          <div>
            <input type='radio' name={char} value='5' onChange={(e) => props.force()}></input>
          </div>
        </div>
        <div className='char'>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
        </div>
        <div className='bottom-meaning'>
          <div>{meaning[0]}</div>
          <div>{meaning[4]}</div>
        </div>
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
  let rating = document.getElementsByName('rrating');
  if (rating) {
    for (let i = 0; i < rating.length; ++i) {
      if (rating[i].value == props.state.currentRating) {
        rating[i].checked = true;
      }
    }
  }
  return (
    <div id='rmodal' className='rmodal' data-selector='new-review-modal'>
      <div className='rmodal-content'>
        <span className='rclose' onClick={(e) => {
          document.getElementById('rmodal').style.display = 'none';
        }}>&times;</span>
        <h3>Write Your Review</h3>
        <h5>About the {props.pname}</h5>
        <form onSubmit={(e) => {
          e.preventDefault();
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
          <StarRating rating={props.state.currentRating} update={props.update} clickable={true} /><br></br>
          <input className='hidden' type='radio' name='rrating' value='1' required></input>
          <input className='hidden' type='radio' name='rrating' value='2'></input>
          <input className='hidden' type='radio' name='rrating' value='3'></input>
          <input className='hidden' type='radio' name='rrating' value='4'></input>
          <input className='hidden' type='radio' name='rrating' value='5'></input>
          <div className='rrecommend'>Recommended:
            <input className='radio' type='radio' name='rrecommend' value='true' required></input>
            <label htmlFor='yes'>Yes</label>
            <input className='radio' type='radio' name='rrecommend' value='false'></input>
            <label htmlFor='no'>No</label>
          </div>
          <div id='christics'>
            Characteristics:<br></br>
            {christics}
          </div>
          Summary:<br></br>
          <input type='text' id='rsummary' placeholder='Example: Best purchase ever!' maxLength='60' autoFocus required></input><br></br>
          <div className='body-container'>
            Review body:<br></br>
            <textarea id='rbody' rows='4' minLength='50' maxLength='1000' required onChange={(e) => {
              charsLeft = 50 - document.getElementById('rbody').value.length;
              if (charsLeft < 0) {
                charsLeft = 0;
              }
              props.update({ charsLeft });
            }} placeholder="Why did or didn't you like the product?"></textarea><br></br>
            {props.state.charsLeft ? 'Minimum required characters left: ' + props.state.charsLeft : 'Minimum reached'}
          </div>
          Nickname:<br></br>
          <input type='text' id='ruser' placeholder='Example: jackson11!' maxLength='16' required></input><br></br>
          Email:
          <div className='remailContainer'>
            <input type='text' id='remail' placeholder='Example: jackson11@email.com' required pattern='[^@\s]+@[^@\s]+\.[^@\s]+'></input><br></br>
            <em>For authentication reasons, you will not be emailed</em>
          </div>
          Images:<br></br>
          <div id='rimages'>
            <em>FUTURE FEATURE</em>
          </div>
          <button>SUBMIT REVIEW</button>
        </form>
      </div>
    </div>
  );
}

export default NewReview;