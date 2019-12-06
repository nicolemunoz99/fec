import React from 'react';
import Overview from './overview/Overview.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProduct: null
    }
    this.toggleSelector = this.toggleSelector.bind(this)
  };

  toggleSelector() {
    return
  }

  render() {
    return (
      <div>
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-sm-12">
            <div className="col-sm-6 selector-container">
              <div id="product" onClick={this.toggleSelector} className="selectorMain selector justify-content-center">
                Explore Products
              </div>
            </div>
          </div>
        </div>
      </div>
      <Overview />
      </div>
    )
  }
}


export default App;
