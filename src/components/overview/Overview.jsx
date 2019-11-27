import React from 'react'
import StyleSelector from './StyleSelector.jsx'
import productStyles from './sampleData/productStyles.js'

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 5,
      productStyles: productStyles.results
    }
  }

  


  render() {
    return (
      <div className="container">hi
        <StyleSelector />
      </div>
    )
  }
}

export default Overview