import React from 'react'
import axios from 'axios'
import StyleSelector from './StyleSelector.jsx'
import styles from './sampleData/productStyles.js'
import productInfo from './sampleData/productInfo.js'
import ImageGallery from './imageGallery/ImageGallery.jsx'
import ProductBasics from './ProductBasics.jsx'
import QA from '../QAComponents/QA.jsx'
import Reviews from '../ReviewsComponents/Reviews.jsx'

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allProducts: null,
      productInfo: productInfo,
      styles: styles.results,
      selectedStyle: styles.results[0] // default is first style
    }
    this.clickStyleHandler = this.clickStyleHandler.bind(this)
  }

  componentDidMount() {
    // when user has previously visited site (i.e., sessionId at state or in localstorage)
    if (this.state.sessionId) { return; }
    let sessionId = localStorage.getItem('greenfieldSessionId');
    if (sessionId) {
      this.setState({ sessionId: sessionId });
    // when user is a new visitor
    } else {
      this.createSessionId()
    }
  }

  createSessionId() {
    let sessionId = Math.floor(Math.random() * 9999);;
    // checks if sessionId is a duplicate
    // if it is, then create a new one
    let checkForId = (id) => {
      axios.get('http://3.134.102.30/cart/' + id)
      .then(response => {
        // sessionId already exists, so make a new one
        sessionId = Math.floor(Math.random() * 9999);
        this.checkForId(sessionId);
      })
      .catch(error => {
        // session Id is unique, so
        this.setState({ sessionId: sessionId})
        localStorage.setItem('greenfieldSessionId', sessionId)
        return
      })
    }
    checkForId(sessionId)
  }

  clickStyleHandler (clickedStyleId) {
    let selectedStyle;
    this.state.styles.forEach(style => {
      if (style.style_id == clickedStyleId) {
        selectedStyle = style
      }
    })
    this.setState({ selectedStyle: selectedStyle })
  }

  render() {
    return (
      <div>
      {/* product selector   */}
      {/* <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-sm-4 selector-container">
            <div id="product" onClick={this.toggleSelector} className="selectorMain selector justify-content-center">
              <div className="ml-2">Explore Products</div>
            </div>
          </div>
          <div className="col-sm-8">

          </div>
        </div>
      </div> */}


        <div className="overview-main">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-7 vertical-center">
              <ImageGallery  style={this.state.selectedStyle} photos={this.state.selectedStyle.photos.map((photo, i) => {
                  return {originalIndex: i, thumbnail_url: photo.thumbnail_url, url: photo.url}
                }               
                  )}  />
            </div>
            <div className="col-sm-5">
              <div className="row">
                <div className="col-sm-12">
                  <ProductBasics productInfo={this.state.productInfo} />
                </div>
                <div className="col-sm-12">
                  <StyleSelector sessionId={this.state.sessionId}
                                  selectedStyle={this.state.selectedStyle}
                                  clickStyleHandler={this.clickStyleHandler}
                                  styles={this.state.styles} />
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        <div className="QA">
          <QA productId={this.state.productInfo.id}/>
        </div>
        <div className='reviews'>
          <Reviews productInfo={this.state.productInfo} />
        </div>
      </div>
    )
  }
}

export default Overview