import React from 'react';

// returns undefined if there is no rating

class StarRating extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stars: null
    }
    this.starTypes = this.calcStarTypes(this.props.rating)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.rating !== this.props.rating) {
      let stars = this.calcStarTypes(this.props.rating)
      this.setState({ stars: stars })
    }
  }

  calcStarTypes(rating) {
    if (!rating) { return }
    let star_filled = Math.floor(rating);
    let star_0quarter = 5 - Math.ceil(rating)
    let quarter = Math.floor((rating - star_filled) * 4);
    let stars = []; 
    let typeCount = {star_filled, quarter, star_0quarter}
    for (let starType in typeCount) {
      for (let i = 0; i < typeCount[starType]; i++) {
        if (starType === 'quarter') {
          stars.push('star_' + typeCount[starType] + starType);
          break;
        }
        stars.push(starType);
      }
    }
    return stars;
  }

  starFilename(starType) {
    return `icons/${starType}.png`
  }

  render() {
    return (   
  <span> 
    {!this.state.stars ? null :
      this.state.stars.map((starType, i) => {
        return <img className="star-rating" key={i} src={this.starFilename(starType)}></img>
      })
    }
  </span>
    )
  }
}

export default StarRating;