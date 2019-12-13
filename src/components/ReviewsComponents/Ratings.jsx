import React from 'react';
import StarRating from '../overview/StarRating.jsx';

const Ratings = (props) => {
  // console.log(props);
  let averageRating = 0;
  let totalRatings = 0;
  let highest = 0;
  if (props.state.reviews.length && props.state.meta.ratings) {
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
          <input type='range' min='1' max='5' id={char} defaultValue={props.state.meta.characteristics[char].value} disabled={true} step='0.1' className='slider'></input>
          <div className='bottom-meaning'>
            <div>{meaning[0]}</div>
            <div>{meaning[1]}</div>
            <div style={{ textAlign: 'right' }}>{meaning[2]}</div>
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
    console.log('bye', props.state.meta, props.state.reviews  )
    return (
      <div className='ratings text-sub' data-selector='ratings'>
        <span className='ratingStars'>
          <StarRating rating={averageRating} />
        </span>
        <div className='rating'>{Math.floor(averageRating * 10) / 10}</div>
        
        <div className='recos'>{Math.ceil((props.state.meta.recommended['1'] / totalRatings) * 100)}% of reviews recommend this product</div>
        <div className='rbreakdown'>
          <div className='rlabels'>
            <div className='text-button rlabel' id='fivestars' data-selector='5star-filter' onClick={(e) => ratingFilter(e.target.id)}>5 stars</div>
            <div className='text-button rlabel' id='fourstars' data-selector='4star-filter' onClick={(e) => ratingFilter(e.target.id)}>4 stars</div>
            <div className='text-button rlabel' id='threestars' data-selector='3star-filter' onClick={(e) => ratingFilter(e.target.id)}>3 stars</div>
            <div className='text-button rlabel' id='twostars' data-selector='2star-filter' onClick={(e) => ratingFilter(e.target.id)}>2 stars</div>
            <div className='text-button rlabel' id='onestar' data-selector='1star-filter' onClick={(e) => ratingFilter(e.target.id)}>1 star</div>
          </div>
          <div className='rprogress'>
            <div className="progress">
              <div className="progress-bar" role="progressbar" style={{ width: five + '%' }} aria-valuenow={five} aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div className="progress">
              <div className="progress-bar" role="progressbar" style={{ width: four + '%' }} aria-valuenow={four} aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div className="progress">
              <div className="progress-bar" role="progressbar" style={{ width: three + '%' }} aria-valuenow={three} aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div className="progress">
              <div className="progress-bar" role="progressbar" style={{ width: two + '%' }} aria-valuenow={two} aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div className="progress">
              <div className="progress-bar" role="progressbar" style={{ width: one + '%' }} aria-valuenow={one} aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
        </div>
        <div className='char-sliders'>
          {charSliders}
        </div>
      </div>
    );
  } else {
    return (<div className='ratings'>
      <em>No ratings to display</em>
    </div>);
  }
}



export default Ratings;