import React from 'react';
import StarRatings from 'react-star-ratings';

const Ratings = (props) => {
  console.log(props);
  let averageRating = 1;
  let totalRatings = 0;
  let highest = 0;
  for (let key in props.state.meta.ratings) {
    averageRating += key * props.state.meta.ratings[key]
    totalRatings += props.state.meta.ratings[key];
    if (props.state.meta.ratings[key] > highest) {
      highest = props.state.meta.ratings[key];
    }
  }
  averageRating /= totalRatings;
  let one = ((props.state.meta.ratings[1] / highest) * 100);
  let two = ((props.state.meta.ratings[2] / highest) * 100);
  let three = ((props.state.meta.ratings[3] / highest) * 100);
  let four = ((props.state.meta.ratings[4] / highest) * 100);
  let five = ((props.state.meta.ratings[5] / highest) * 100);
  let ratingFilter = (id) => {
    if (props.state.starFilters.includes(id)) {
      props.state.starFilters.splice(props.state.starFilters.indexOf(id), 1);
      props.update({ starFilters: props.state.starFilters });
    } else {
      props.update({ more: true, starFilters: props.state.starFilters.concat(id) });
    }
  }
  let charSliders = [];
  let createSliders = (char, meaning) => {
    charSliders.push(
      <div className='slidercontainer' key={char}>
        {char}<br></br>
        <input type='range' min='1' max='5' id={char} defaultValue={props.state.meta.characteristics[char].value} disabled={true} step='0.1' class='slider'></input>
        <div className='bottom-meaning'>
          <div>{meaning[0]}</div>
          <div>{meaning[1]}</div>
          <div>{meaning[2]}</div>
        </div>
      </div>
    );
  }
  if (props.state.meta.characteristics.hasOwnProperty('Size')) {
    createSliders('Size', ['Too small', 'Perfect', 'Too big']);
  }
  if (props.state.meta.characteristics.hasOwnProperty('Length')) {
    createSliders('Length', ['Runs short', 'Perfect', 'Runs long']);
  }
  if (props.state.meta.characteristics.hasOwnProperty('Width')) {
    createSliders('Width', ['Too narrow', 'Perfect', 'Too wide']);
  }
  if (props.state.meta.characteristics.hasOwnProperty('Fit')) {
    createSliders('Fit', ['Runs tight', 'Perfect', 'Runs long']);
  }
  if (props.state.meta.characteristics.hasOwnProperty('Comfort')) {
    createSliders('Comfort', ['Uncomfy', 'Okay', 'Perfect']);
  }
  if (props.state.meta.characteristics.hasOwnProperty('Quality')) {
    createSliders('Quality', ['Poor', 'Expected', 'Perfect']);
  }
  return (
    <div className='ratings'>
      <div className='rating'>{averageRating.toFixed(1)}</div>
      <div className='ratingStars'>
      <StarRatings 
          rating={averageRating}
          starRatedColor='black'
          starDimension='1.2em'
          starSpacing='0.1em'
          starEmptyColor='#e9ecef' />
      </div>
      <div className='recos'>{Math.ceil((props.state.meta.recommended['1'] / totalRatings) * 100)}% of reviews recommend this product</div>
      <div className='rbreakdown'>
        <div className='text-button' id='fivestars' onClick={(e) => ratingFilter(e.target.id)}>5 stars</div>
        <div class="progress">
          <div class="progress-bar bg-success" role="progressbar" style={{ width: five + '%' }} aria-valuenow={five} aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <div className='text-button' id='fourstars' onClick={(e) => ratingFilter(e.target.id)}>4 stars</div>
        <div class="progress">
          <div class="progress-bar bg-success" role="progressbar" style={{ width: four + '%' }} aria-valuenow={four} aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <div className='text-button' id='threestars' onClick={(e) => ratingFilter(e.target.id)}>3 stars</div>
        <div class="progress">
          <div class="progress-bar bg-success" role="progressbar" style={{ width: three + '%' }} aria-valuenow={three} aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <div className='text-button' id='twostars' onClick={(e) => ratingFilter(e.target.id)}>2 stars</div>
        <div class="progress">
          <div class="progress-bar bg-success" role="progressbar" style={{ width: two + '%' }} aria-valuenow={two} aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <div className='text-button' id='onestar' onClick={(e) => ratingFilter(e.target.id)}>1 star</div>
        <div class="progress">
          <div class="progress-bar bg-success" role="progressbar" style={{ width: one + '%' }} aria-valuenow={one} aria-valuemin="0" aria-valuemax="100"></div>
        </div>
      </div>
      <div className='char-sliders'>
        {charSliders}
      </div>
    </div>
  );
}



export default Ratings;