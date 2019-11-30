import React from 'react'

class DefaultView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tbDisplayed: [0]
    }

  }

  componentDidMount() {
    if (this.props.currentPhotoIndex === 0) {
      document.getElementsByClassName("photo-nav-left").item(0).classList.add("hidden");
    }
  }

  // calculates an array of thumnails that will be visible upon render
  calcTbDisplayed (index) {
    let minIndex = index;
    let maxIndex = minIndex + 4;
    let wrapIndex = 0;
    let tbArray = [];
    for (let i = minIndex; i <= maxIndex; i++) {
      if (i < this.props.photos.length) {
        tbArray.push({originalIndex: i, thumbnail_url: this.props.photos[i].thumbnail_url})
      } else {
        tbArray.push({originalIndex: wrapIndex, thumbnail_url: this.props.photos[wrapIndex].thumbnail_url});
        wrapIndex++
      }
    }
    return tbArray;
  }

  // console.log("tb indices: ", this.calcTbDisplay(this.props.currentPhotoIndex))
  // console.log(this.props.currentPhotoIndex)
  
  render() {
    return (
      <div className="container">
        (Default View)
      <div className="row default-view">
          {/* thumbnails */}
          <div className="col-2">
            {
              this.calcTbDisplayed(this.props.currentPhotoIndex).map((thumbnail, i) => {
                let tbSelected = thumbnail.originalIndex === this.props.currentPhotoIndex ? " tb-selected " : null;
                return (<div key={i}><img className={"default-view-tb " + tbSelected} src={thumbnail.thumbnail_url}></img></div>)
              })
            }
          </div>
          {/* main image */}
          <div className="col-10">
            {
              this.props.photos.map((photo, i) => {
                let photoClass = i === this.props.currentPhotoIndex ? "d-flex photo-container align-items-center justify-content-center" : "hidden"
                return (<div key={i} className={photoClass}>
                  <img className="default-view-photo img-fluid" src={photo.url}></img>

                </div>)
              })
            }
            <div onClick={this.props.leftClick} className="photo-nav-left">Left</div>
          <div onClick={this.props.rightClick} className="photo-nav-right">Right</div>
          </div>
          
        </div>
      </div>
    )
  }
}

export default DefaultView;