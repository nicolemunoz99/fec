import React from 'react'
import StyleSelector from './StyleSelector.jsx'
import styles from './sampleData/productStyles.js'
import ImageGallery from './imageGallery/ImageGallery.jsx'

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
      <div className="container-fluid">
        <div className="row">
          <div className="col-7">
            <ImageGallery />
          </div>
          <div className="col-5">
            <StyleSelector selectedStyleInd={this.state.selectedStyleInd} clickStyleHandler={this.clickStyleHandler} styles={this.state.styles}/>
          </div>
        </div>
      </div>
    )
  }
}

export default Overview