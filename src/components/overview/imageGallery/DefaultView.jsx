import React from 'react'

class DefaultView extends React.Component {
  constructor(props) {
    super(props);
  }

  forwardClick(e) {

  }

  componentDidMount() {
    console.log('mounty mount')
    if (this.props.currentPhotoIndex === 0) {
      document.getElementsByClassName("photo-nav-left").item(0).hidden = true
    }
    if (this.props.currentPhotoIndex === this.props.photos.length - 1) {
      document.getElementsByClassName("photo-nav-right").item(0).hidden = true
    }
  }

  // forwardClick() {
  //   let newIndex = this.props.
  // }
  
  render() {
    return (
      <div className="col-sm-12">
        <div className="slideshow">
        (Default View)
        {
          this.props.photos.map((photo, i) => {
            let hidden = i === this.props.currentPhotoIndex ? false : true;
            return <div hidden={hidden}>{<img id={i} className="img-fluid photo" src={photo.url}></img>}</div>
          })
        }
        <div onClick={this.props.leftClick} className="photo-nav-left">Left</div>
        <div onClick={this.props.rightClick} className="photo-nav-right">Right</div>
        </div>
      </div>
    )
  }
}

export default DefaultView;