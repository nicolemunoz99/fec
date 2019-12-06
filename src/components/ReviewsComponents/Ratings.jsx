import React from 'react';

const Ratings = (props) => {
  // console.log(props);
  let averageRating = 1;
  let totalRatings = 0;
  let highest = 0;
  for (let key in props.meta.ratings) {
    averageRating += key * props.meta.ratings[key]
    totalRatings += props.meta.ratings[key];
    if (props.meta.ratings[key] > highest) {
      highest = props.meta.ratings[key];
    }
  }
  averageRating /= totalRatings;
  let one = ((props.meta.ratings[1] / highest) * 100);
  let two = ((props.meta.ratings[2] / highest) * 100);
  let three = ((props.meta.ratings[3] / highest) * 100);
  let four = ((props.meta.ratings[4] / highest) * 100);
  let five = ((props.meta.ratings[5] / highest) * 100);
  let ratingFilter = (id) => {
    if (props.state.starFilters.includes(id)) {
      props.state.starFilters.splice(props.state.starFilters.indexOf(id), 1);
      props.update({ starFilters: props.state.starFilters });
    } else {
      props.update({ more: true, starFilters: props.state.starFilters.concat(id) });
    }
  }
  return (
    <div className='ratings'>
      <div className='rating'>{averageRating.toFixed(1)}</div>
      <div className='ratingStars'>stars coming soon™</div>
      <div className='recos'>{Math.ceil((props.meta.recommended['1'] / totalRatings) * 100)}% of reviews recommend this product</div>
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
    </div>
  );
}



export default Ratings;