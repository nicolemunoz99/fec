import React from 'react';

class ExpandedView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseX: 0,
      mouseY: 0,
      zoomWidth: 0,
      zoomHeight: 0
    }
    this.expandedMainPhotoClick = this.expandedMainPhotoClick.bind(this);
    this.getCoords = this.getCoords.bind(this);
  }
  // hide zoom-overlay when clicking on zoomed photo
  hideZoom(e) {
    e.target.style.display='none'
  }

  expandedMainPhotoClick(e) {
    // show zoom overlay
    let zoomOverlay = document.getElementById('zoom-overlay');
    zoomOverlay.style.display='block'
    // show zoomed imaged by setting current photo as background
    let bgUrl = this.props.photos[this.props.currentPhotoIndex].url
    zoomOverlay.style.backgroundImage = `url(${bgUrl})`;
  }



  getCoords(e) {   
    // update state with mouse coordinates
    this.setState({ mouseX: e.clientX, mouseY: e.clientY }, () => {
      // center background image on the scaled coordinates
      let xPos = 100 * this.state.mouseX/window.innerWidth // percentage of window width
      let yPos = 100 * this.state.mouseY/window.innerHeight
      let zoomOverlay = document.getElementById('zoom-overlay');
      zoomOverlay.style.backgroundPosition = `${xPos}% ${yPos}% `
    })    
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
            <div onClick={this.props.photoNavHandler} className="photo-nav-left">
              <i class="far fa-arrow-alt-circle-left fa-2x nav-bg"></i>
            </div>
            <div onClick={this.props.photoNavHandler} className="photo-nav-right">
              <i class="far fa-arrow-alt-circle-right fa-2x nav-bg"></i>
            </div>
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