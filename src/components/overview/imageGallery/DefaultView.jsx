import React from 'react'

class DefaultView extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.currentPhotoIndex === 0) {
      document.getElementsByClassName("photo-nav-left").item(0).classList.add("hidden");
    }
  }
  
  render() {
    return (
      <div className="container">
        (Default View)
      <div className="row default-view">
        {/* thumbnails */}
      <div className="col-2">
        {
        this.props.photos.map((photo, i) => {
          return (<div key={i}><img className="default-view-tb" src={photo.thumbnail_url}></img></div>)
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