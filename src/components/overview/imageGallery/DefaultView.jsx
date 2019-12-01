import React from 'react'

class DefaultView extends React.Component {
  constructor(props) {
    super(props);
    this.tbClick = this.tbClick.bind(this)
  }
  componentDidMount() {
    // hide left arrow upon load (first image is default)
    if (this.props.currentPhotoIndex === 0) {
      document.getElementsByClassName("photo-nav-left").item(0).classList.add("hidden");
    }
  }

  tbClick(e) {
    let clickedTbIndex = Number(e.target.id)
    this.props.photoNavHandler(null, clickedTbIndex);
  }
  
  render() {
    return (
      <div className="container">
        (Default View)
      <div className="row default-view">
        
        {/* thumbnails */}
        
          <div className="col-2 d-flex align-items-center justify-content-center">
            <div>
              <div className="row">
                <div className="col-12 d-flex align-items-center justify-content-center">
                <div onClick={this.props.tbNavHandler} className={this.props.photos.length>5 ? "tb-nav-up" : "hidden"}>UP</div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 d-flex align-items-center justify-content-center">
                  <div>
                    {
                      this.props.thumbnails.map((thumbnail, i) => {
                        let tbSelected = thumbnail.originalIndex === this.props.currentPhotoIndex ? " tb-selected " : null;
                        return (<div className={"tb-div " + tbSelected} key={i}><img id={thumbnail.originalIndex} onClick={this.tbClick} className={"default-view-tb"} src={thumbnail.thumbnail_url}></img></div>)
                      })
                    }
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 d-flex align-items-center justify-content-center">
                  <div onClick={this.props.tbNavHandler} className={this.props.photos.length>5 ? "tb-nav-down" : "hidden"}>DOWN</div>
                </div>
              </div>
            </div>
          </div>


        {/* main image */}
        <div className="col-10">
          {
            this.props.photos.map((photo, i) => {
              let photoClass = i === this.props.currentPhotoIndex ?
                "d-flex default-view-photo-container align-items-center justify-content-center" : "hidden";
              return (
                <div key={i} className={photoClass}>
                  <img className="default-view-photo img-fluid" src={photo.url}></img>
                </div>
              )
            })
          }
          <div onClick={this.props.photoNavHandler} className="photo-nav-left">Left</div>
          <div onClick={this.props.photoNavHandler} className="photo-nav-right">Right</div>
        </div>

      </div>
      </div>
    )
  
  }
}

export default DefaultView;