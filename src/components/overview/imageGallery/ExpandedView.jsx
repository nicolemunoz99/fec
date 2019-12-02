import React from 'react';

const ExpandedView = props => {

  // expandedMainPhotoClick(e) {
  //   // show zoomed imaged
  //   // update state with mouse coordinates
  //   // center image on the scaled coordinates
  // }

  return (
    // main photo
    <div id="expanded-view" className="overview-component">
    <div className="container expanded-view-container">
      <div className="row">
        <div className="col-sm-12 d-flex align-items-center justify-content-center">
          <div>
            <img onClick="expandedMainPhotoClick" className="expanded-view-photo" src={props.photos[props.currentPhotoIndex].url}></img>
          </div>
          <div onClick={props.photoNavHandler} className="photo-nav-left">Left</div>
          <div onClick={props.photoNavHandler} className="photo-nav-right">Right</div>
        </div>
      </div>
      {/* thumbnails */}
      <div className="row">
        <div className="col-sm-12 d-flex align-items-center justify-content-center">
          {
          props.photos.map(photo => {
            let tbSelected = photo.originalIndex === props.currentPhotoIndex ? " expanded-tb-selected " : null
            return (
              <div className={tbSelected}>
                <div className="expanded-view-tb-div">
                  <img id={photo.originalIndex} onClick={props.tbClick} className="expanded-view-tb" src={photo.thumbnail_url}></img>
                </div>
              </div>
            )
          })
          }
        </div>
      </div>
    </div>
    </div>
  )
}

export default ExpandedView