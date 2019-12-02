import React from 'react';

class ExpandedView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseX: 0,
      mouseY: 0
    }
    this.expandedMainPhotoClick = this.expandedMainPhotoClick.bind(this);
    this.getCoords = this.getCoords.bind(this);
  }
  expandedMainPhotoClick(e) {
    let zoomOverlay = document.getElementById('zoom-overlay');
    zoomOverlay.style.display='block'
    // set backgroun-image to current image
    console.log(zoomOverlay.style)
    let bgUrl = this.props.photos[this.props.currentPhotoIndex].url
    // show zoomed imaged
    zoomOverlay.style.backgroundImage = `url(${bgUrl})`
    console.log('hi', zoomOverlay.style.backgroundImage)
    // update state with mouse coordinates
    // center image on the scaled coordinates
  }

  hideZoom(e) {
    console.log('hi')
    e.target.style.display='none'
  }

  getCoords(e) {
    // console.log('x: ', e.clientX)
    this.setState({ mouseX: e.clientX, mouseY: e.clientY })
  }

  render() {
    return (
      <div>
      {/* zoomed image overlay */}
      <div id="zoom-overlay" onMouseMove={this.getCoords} onClick={this.hideZoom}>

      </div>
      {/* expanded view */}
      <div id="expanded-view" className="overview-component">
      <div className="container expanded-view-container">
        {/* main photo */}
        <div className="row">
          <div className="col-sm-12 d-flex align-items-center justify-content-center">
            <div>
              <img onClick={this.expandedMainPhotoClick} 
                    className="expanded-view-photo" src={this.props.photos[this.props.currentPhotoIndex].url}>
              </img>
            </div>
            <div onClick={this.props.photoNavHandler} className="photo-nav-left">Left</div>
            <div onClick={this.props.photoNavHandler} className="photo-nav-right">Right</div>
          </div>
        </div>
        {/* thumbnails */}
        <div className="row">
          <div className="col-sm-12 d-flex align-items-center justify-content-center">
            {
            this.props.photos.map(photo => {
              let tbSelected = photo.originalIndex === this.props.currentPhotoIndex ? " expanded-tb-selected " : null
              return (
                <div className={tbSelected}>
                  <div className="expanded-view-tb-div">
                    <img id={photo.originalIndex} onClick={this.props.tbClick} className="expanded-view-tb" src={photo.thumbnail_url}></img>
                  </div>
                </div>
              )
            })
            }
          </div>
        </div>
      </div>
      </div>
      </div>
    )
  }
}

export default ExpandedView