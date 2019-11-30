import React from 'react';
import DefaultView from './DefaultView.jsx'

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPhotoIndex: 0 // default is first image
    }
    this.rightClick = this.rightClick.bind(this);
    this.leftClick = this.leftClick.bind(this);
  }

  rightClick(e) {
    let newPhotoIndex = this.state.currentPhotoIndex + 1;
    this.photoNavHandler(newPhotoIndex);
    this.setState({
      currentPhotoIndex: newPhotoIndex
    })
  }

  leftClick(e) {
    let newPhotoIndex = this.state.currentPhotoIndex - 1;
    this.photoNavHandler(newPhotoIndex);
    this.setState({
      currentPhotoIndex: newPhotoIndex
    })
  }

  photoNavHandler(index) {
    if (index === 0) {
      document.getElementsByClassName("photo-nav-left").item(0).hidden = true
    }
    else if (index === this.props.photos.length - 1) { 
      console.log('last photo')
      document.getElementsByClassName("photo-nav-right").item(0).hidden = true
    }
    else {
      document.getElementsByClassName("photo-nav-left").item(0).hidden = false
      document.getElementsByClassName("photo-nav-right").item(0).hidden = false
    }
  }


  render() {
    return (
      <div className="row overview-component">
        <div className="col-sm-12">(IMAGE GALLERY)</div>
        <DefaultView 
                currentPhotoIndex={this.state.currentPhotoIndex}
                photos={this.props.photos}
                rightClick={this.rightClick}
                leftClick={this.leftClick} />
        
      </div>
    )
  }
}

export default ImageGallery