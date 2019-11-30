import React from 'react';
import DefaultView from './DefaultView.jsx'

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPhotoIndex: 0, // default is first image
      tbDisplayed: this.props.photos.slice(0, this.props.numThumbnails)
    }
    this.photoNavHandler = this.photoNavHandler.bind(this);
    this.tbNavHandler = this.tbNavHandler.bind(this);
  }

  tbNavHandler(e) {
    let clickedNav = e.target.className
    let newTopIndex
    // when thumnail nav-down clicked
    if (clickedNav === 'tb-nav-down') {
      // new top thumnail is original index of top displayed minus 1
      newTopIndex = this.state.tbDisplayed[0].originalIndex - 1;
    }
    // when thumnail nav-up clicked
    if (clickedNav === 'tb-nav-up') {
      // new top thumbnail is original index of top thumbnail plus 1
      newTopIndex = this.state.tbDisplayed[0].originalIndex + 1;
    }
    // update thumbnails displayed
    this.calcTbDisplayed(newTopIndex)
  }

  photoNavHandler(e, index) {
    if (e) { // photoNavHandler called when photo nav button clicked
      // update state.currentPhotoIndex
      let clickedNav = e.target.className
      if (clickedNav === 'photo-nav-right') { // right nav button was clicked
        var newPhotoIndex = this.state.currentPhotoIndex + 1;
      } else { // left nav button was clicked
        var newPhotoIndex = this.state.currentPhotoIndex - 1;
      }
    } else { // photoNavHandler called when thumbnail is clicked
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
        this.calcTbDisplayed(this.state.currentPhotoIndex); // update state.tbDisplayed
      }
    })
  }

// default view: thumbnail navigation
calcTbDisplayed (index) {
  let minIndex = index;
  let maxIndex = minIndex + this.props.numThumbnails -1;
  let wrapIndex = 0;
  let tbArray = [];
  for (let i = minIndex; i <= maxIndex; i++) {
    if (i >= 0 && i < this.props.photos.length) {
      tbArray.push(this.props.photos[i])
    } 
    if (i < 0) {
      tbArray.push(this.props.photos[this.props.photos.length + i])
    }
    if (i >= this.props.photos.length) {
      tbArray.push(this.props.photos[wrapIndex]);
      wrapIndex++
    }
  }
  this.setState({ tbDisplayed: tbArray })
}


  render() {
    return (
      <div className="row overview-component">
        <div className="col-sm-12">(IMAGE GALLERY)</div>
        <DefaultView 
                currentPhotoIndex={this.state.currentPhotoIndex}
                photos={this.props.photos}
                photoNavHandler={this.photoNavHandler}
                tbNavHandler={this.tbNavHandler}
                thumbnails={this.state.tbDisplayed} />
      </div>
    )
  }
}

export default ImageGallery