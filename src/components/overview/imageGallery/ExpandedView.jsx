import React from 'react';

const ExpandedView = props => {


  return (
    <div className="container expanded-view-container">
      <div className="row">
        <div className="col-sm-12 d-flex align-items-center justify-content-center">
          <div>
            <img className="expanded-view-photo" src={props.photos[props.currentPhotoIndex].url}></img>
          </div>
        </div>
      </div>
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
  )
}

export default ExpandedView