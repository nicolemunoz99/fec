import React from 'react'

class DefaultView extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.currentPhotoIndex === 0) {
      document.getElementsByClassName("photo-nav-left").item(0).hidden = true;
    }
  }
  
  render() {
    return (
      <div className="container">
      <div className="row">
      <div className="col-2">
        {/* thumbnails */}
        {
        this.props.photos.map((photo, i) => {
          return (<div key={i}><img className="default-view-tb" src={photo.thumbnail_url}></img></div>)
        })
        }
      </div>
      <div className="col-10">
        (Default View)
        {
          this.props.photos.map((photo, i) => {
            let photoClass = i === this.props.currentPhotoIndex ? "d-flex text-center" : "hidden"
            return (<div key={i} className={photoClass}>
              <img className="default-photo img-fluid" src={photo.url}></img>
              
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