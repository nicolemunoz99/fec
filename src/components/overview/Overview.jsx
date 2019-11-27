import React from 'react'
import StyleSelector from './StyleSelector.jsx'
import styles from './sampleData/productStyles.js'
import ImageGallery from './imageGallery/ImageGallery.jsx'
import ProductBasics from './ProductBasics.jsx'
import QA from '../QAComponents/Qa.jsx'
import Reviews from '../ReviewsComponents/Reviews.jsx'

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 5,
      styles: styles.results,
      selectedStyleInd: 0 // default is first style
    }
    this.clickStyleHandler = this.clickStyleHandler.bind(this)
  }

  clickStyleHandler (clickedStyleIndex) {
    this.setState({ selectedStyleInd: clickedStyleIndex })
  }


  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-7">
              <ImageGallery />
            </div>
            <div className="col-sm-5">
              <div className="row">
                <div className="col-sm-12">
                  <ProductBasics />
                </div>
                <div className="col-sm-12">
                  <StyleSelector selectedStyleInd={this.state.selectedStyleInd} clickStyleHandler={this.clickStyleHandler} styles={this.state.styles} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <QA productId={this.state.productId}/>
        </div>
        <div>
          <Reviews />
        </div>
      </div>
    )
  }
}

export default Overview