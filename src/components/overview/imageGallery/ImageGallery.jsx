import React from 'react';
import DefaultView from './DefaultView.jsx'

class ImageGallery extends React.Component {


  render() {
    return (
      <div className="row overview-component">
        <div className="col-sm-12">(IMAGE GALLERY)</div>
        <div className="col-sm-12"><DefaultView selectedStyle={this.props.selectedStyle}/></div>
      </div>
    )
  }
}

export default ImageGallery