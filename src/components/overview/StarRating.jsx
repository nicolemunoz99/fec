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
    let filled = Math.floor(rating);
    let empty = 5 - Math.ceil(rating)
    let quarter = Math.floor((rating - filled) * 4);
    if (quarter === 0) { empty++ }
    let stars = []; 
    let typeCount = {filled, quarter, empty}
    for (let starType in typeCount) {
      for (let i = 0; i < typeCount[starType]; i++) {
        if (starType === 'quarter') {
          stars.push(typeCount[starType] + starType);
          break;
        }
        stars.push(starType);
      }
    }
    return stars;
  }

  starFilename(starType) {
    return `icons/star_${starType}.png`
  }

  render() {
    return (   
  <div className="avg-star-rating"> 
    {!this.state.stars ? null :
      this.state.stars.map((starType, i) => {
        return <img key={i} src={this.starFilename(starType)}></img>
      })
    }
  </div>
    )
  }
}

export default StarRating;