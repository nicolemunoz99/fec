import React from 'react';
import DefaultView from './DefaultView.jsx'

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPhotoIndex: 0, // default is first image
      tbDisplayed: this.calcTbDisplayed(0)
    }
    this.photoNavHandler = this.photoNavHandler.bind(this);
  }

  photoNavHandler(e, index) {
    if (e) {
      // update state.currentPhotoIndex
      let clickedNav = e.target.className
      if (clickedNav === "photo-nav-right") { // right nav button was clicked
        var newPhotoIndex = this.state.currentPhotoIndex + 1;
      } else { // left nav button was clicked
        var newPhotoIndex = this.state.currentPhotoIndex - 1;
      }
    } else {
      var newPhotoIndex = index
    }
    this.setState({
      currentPhotoIndex: newPhotoIndex
    }, () => {
      // hide/show nav button on main image when appropriate
      if (newPhotoIndex === 0) {
        document.getElementsByClassName("photo-nav-left").item(0).classList.add("hidden")
      }
      else if (newPhotoIndex === this.props.photos.length - 1) {
        document.getElementsByClassName("photo-nav-right").item(0).classList.add("hidden")
      }
      else {
        document.getElementsByClassName("photo-nav-left").item(0).classList.remove("hidden")
        document.getElementsByClassName("photo-nav-right").item(0).classList.remove("hidden")
      }
      // update displayed thumbnails when currentPhotoInd > bottomOriginalInd OR currentPhotoInd < topOriginalInd
      let topOriginalInd = this.state.tbDisplayed[0].originalIndex; // original index of thumb at TOP
      let bottomOriginalInd = this.state.tbDisplayed[this.state.tbDisplayed.length - 1].originalIndex; // original index of thumb at BOTTOM
      if (this.state.currentPhotoIndex >= bottomOriginalInd || this.state.currentPhotoIndex < topOriginalInd) {
        let newTbDisplayed = this.calcTbDisplayed(this.state.currentPhotoIndex);
        this.setState({ tbDisplayed: newTbDisplayed })
      }
    })
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
                photoNavHandler={this.photoNavHandler}
                thumbnails={this.state.tbDisplayed} />
      </div>
    )
  }
}

export default ImageGallery