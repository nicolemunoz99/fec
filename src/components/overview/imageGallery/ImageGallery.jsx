import React from 'react';
import ExpandedView from './ExpandedView.jsx'

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPhotoIndex: 0, // default is first image
      tbIndices: [0,1,2,3,4] // default first 5 thumbnails
    }
    this.photoNavHandler = this.photoNavHandler.bind(this);
    this.tbNavHandler = this.tbNavHandler.bind(this);
    this.tbClick = this.tbClick.bind(this)
    this.mainPhotoClick = this.mainPhotoClick.bind(this);
    this.numThumbnails = 5;
  }
  componentDidMount() {
    // hide left arrow upon load (first image is default)
    if (this.state.currentPhotoIndex === 0) {
      document.getElementsByClassName("photo-nav-left").item(0).classList.add("hidden");
    }
  }

  tbNavHandler(e) {
    let clickedNav = e.target.parentElement.className
    let newTopIndex
    // when thumnail nav-down clicked
    if (clickedNav === 'tb-nav-down') {
      // new top thumnail is original index of top displayed minus 1
      newTopIndex = this.state.tbIndices[0] - 1;
    }
    // when thumnail nav-up clicked
    if (clickedNav === 'tb-nav-up') {
      // new top thumbnail is original index of top thumbnail plus 1
      newTopIndex = this.state.tbIndices[0] + 1;
    }
    // update thumbnails displayed
    this.calcTbDisplayed(newTopIndex)
  }

  photoNavHandler(e, index) {

    if (e) { // when photoNavHandler called upon photo nav button clicked
      // update state.currentPhotoIndex
      var clickedNav = e.target.parentElement
      if (clickedNav.classList.contains('photo-nav-right')) { // right nav button was clicked
        var newPhotoIndex = this.state.currentPhotoIndex + 1;
        if (newPhotoIndex >= this.props.photos.length) { newPhotoIndex = 0 }
      }
      if (clickedNav.classList.contains('photo-nav-left')) { // left nav button was clicked
        var newPhotoIndex = this.state.currentPhotoIndex - 1;
        if (newPhotoIndex < 0 ) { newPhotoIndex = this.props.photos.length - 1}
      }
    } else { // when photoNavHandler called upon thumbnail being clicked
      var newPhotoIndex = index
    }
    this.setState({
      currentPhotoIndex: newPhotoIndex
    }, () => {
      // hide/show nav button on main image when appropriate
      if (newPhotoIndex === 0) {
        document.getElementsByClassName("photo-nav-left").item(0).classList.add("hidden")
      }
      else if (newPhotoIndex === this.props.photos.length - 1) {
        document.getElementsByClassName("photo-nav-right").item(0).classList.add("hidden")
      }
      else {
        document.getElementsByClassName("photo-nav-left").item(0).classList.remove("hidden")
        document.getElementsByClassName("photo-nav-right").item(0).classList.remove("hidden")
      }
      // update displayed thumbnails when currentPhotoInd > bottomOriginalInd OR currentPhotoInd < topOriginalInd
      let topOriginalInd = this.state.tbIndices[0]; // original index of thumb at TOP
      let bottomOriginalInd = this.state.tbIndices[this.state.tbIndices.length - 1]; // original index of thumb at BOTTOM
      if (this.state.currentPhotoIndex >= bottomOriginalInd || this.state.currentPhotoIndex < topOriginalInd) {
        this.calcTbDisplayed(this.state.currentPhotoIndex); // update state.tbDisplayed
      }
    })
  }

// default view: thumbnail navigation
calcTbDisplayed (index) {
  let minIndex = index;
  let maxIndex = minIndex + this.numThumbnails - 1;
  let wrapIndex = 0;
  let tbIndices = [];
  for (let i = minIndex; i <= maxIndex; i++) {
    if (i >= 0 && i < this.props.photos.length) {
      tbIndices.push(i)
    } 
    if (i < 0) {
      tbIndices.push(this.props.photos.length + i)
    }
    if (i >= this.props.photos.length) {
      tbIndices.push(wrapIndex);
      wrapIndex++
    }
  }
  this.setState({ tbIndices: tbIndices })
}

tbClick(e) {
  let clickedTbIndex = Number(e.target.id);
  this.photoNavHandler(null, clickedTbIndex);
}

mainPhotoClick(e) {
  document.getElementById('gallery-overlay').style.display = 'block';
}

expandedClick(e) {
  document.getElementById('gallery-overlay').style.display='none';
}


  render() {

    return (
      <div>
      <div className="container">
      <div className="row default-view">
        
        {/* thumbnails */}
        <div className="col-2 d-flex align-items-center justify-content-center default-thumbnails">
          <div>
            <div className="row">
              <div className="col-12 d-flex align-items-center justify-content-center">
                <div onClick={this.tbNavHandler} className={this.props.photos.length>5 ? "tb-nav-up" : "hidden"}>
                  <i class="fas fa-chevron-circle-up nav-bg"></i>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 d-flex align-items-center justify-content-center">
                <div>
                  {
                    this.state.tbIndices.map((i, index) => {
                      let tbSelected = i === this.state.currentPhotoIndex ? " tb-selected " : null;
                      return (<div className={"tb-div " + tbSelected} key={index}>
                                  <img id={i} onClick={this.tbClick} className={"default-view-tb"} src={this.props.photos[i].thumbnail_url}></img>
                              </div>)
                    })
                  }
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 d-flex align-items-center justify-content-center">
                <div onClick={this.tbNavHandler} className={this.props.photos.length>5 ? "tb-nav-down" : "hidden"}>
                  <i class="fas fa-chevron-circle-down nav-bg"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* main image */}
        <div className="col-12">
          {
            this.props.photos.map((photo, i) => {
              let photoClass = i === this.state.currentPhotoIndex ?
                "d-flex default-view-photo-container align-items-center justify-content-center" : "hidden";
              return (
                <div key={i} className={photoClass}>
                  <img id="test" onClick={this.mainPhotoClick} className="default-view-photo img-fluid" src={photo.url}></img>
                </div>
              )
            })
          }
          <div onClick={this.photoNavHandler} className="photo-nav-left nav-offset">
            <i class="fas fa-chevron-circle-left nav-bg"></i>
          </div>
          <div onClick={this.photoNavHandler} className="photo-nav-right">
            <i class="fas fa-chevron-circle-right nav-bg"></i>
          </div>
        </div>

      </div>
      </div>
      {/* expanded view overlay */}
      <div id="gallery-overlay">
        <div className="close-expanded-view nav-bg" onClick={this.expandedClick}>
          <i class="fas fa-times-circle fa-2x"></i>
        </div>
        <ExpandedView tbClick={this.tbClick} 
                      photos={this.props.photos} 
                      currentPhotoIndex={this.state.currentPhotoIndex} 
                      photoNavHandler={this.photoNavHandler}/>
      </div>
      </div>
    )
  }
}

export default ImageGallery