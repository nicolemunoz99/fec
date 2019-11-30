import React from 'react';
import DefaultView from './DefaultView.jsx'

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPhotoIndex: 0, // default is first image
      tbDisplayed: this.calcTbDisplayed(0)
    }
    this.rightClick = this.rightClick.bind(this);
    this.leftClick = this.leftClick.bind(this);
  }
// default view: main image navigation
  rightClick(e) {
    let newPhotoIndex = this.state.currentPhotoIndex + 1;
    this.setState({
      currentPhotoIndex: newPhotoIndex
    }, () => {
      this.photoNavHandler(newPhotoIndex);
    })
  }

  leftClick(e) {
    let newPhotoIndex = this.state.currentPhotoIndex - 1;
    this.setState({
      currentPhotoIndex: newPhotoIndex
    }, () => {
      this.photoNavHandler(newPhotoIndex);
    })
  }

  photoNavHandler(index) {
    // hide/show nav button on main image when appropriate
    if (index === 0) {
      document.getElementsByClassName("photo-nav-left").item(0).classList.add("hidden")
    }
    else if (index === this.props.photos.length - 1) { 
      document.getElementsByClassName("photo-nav-right").item(0).classList.add("hidden")
    }
    else {
      document.getElementsByClassName("photo-nav-left").item(0).classList.remove("hidden")
      document.getElementsByClassName("photo-nav-right").item(0).classList.remove("hidden")
    }
    // thumbnail stuff
    let topOriginalInd = this.state.tbDisplayed[0].originalIndex;
    // original index of thumb at BOTTOM
    let bottomOriginalInd = this.state.tbDisplayed[this.state.tbDisplayed.length - 1].originalIndex;
    // update state.tbDisplayed when currentPhotoInd > bottomOriginalInd OR currentPhotoInd < topOriginalInd
    
    if (this.state.currentPhotoIndex >= bottomOriginalInd || this.state.currentPhotoIndex < topOriginalInd) {
      let newTbDisplayed = this.calcTbDisplayed(this.state.currentPhotoIndex);
      this.setState ({
        tbDisplayed: newTbDisplayed
      })
    }
  }

//default view: thumbnail navigation
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


  render() {
    return (
      <div className="row overview-component">
        <div className="col-sm-12">(IMAGE GALLERY)</div>
        <DefaultView 
                currentPhotoIndex={this.state.currentPhotoIndex}
                photos={this.props.photos}
                rightClick={this.rightClick}
                leftClick={this.leftClick} 
                thumbnails={this.state.tbDisplayed} />
      </div>
    )
  }
}

export default ImageGallery