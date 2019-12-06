import React from 'react';
import Overview from './overview/Overview.jsx'
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allProducts: null,
      searchTerm: null
    }
    this.onChangeProducts = this.onChangeProducts.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.searchProducts = this.searchProducts.bind(this);
  };

  componentDidMount() {
    this.getProducts();
  }

  onChangeProducts(e) {
    this.setState({ searchTerm: e.target.value }, () => {
      let results;
      if (this.state.searchTerm.length && this.state.searchTerm.length % 2 === 0) {
        results = this.searchProducts(this.state.searchTerm);
      }
      console.log(results)
    })
  }


 getProducts() {
    let promises = [];
    for (let i = 1; i< 500; i++) {
      promises.push(fetch(`http://3.134.102.30/products/list/?page=${i}&count=50`)
      .then(res => res.json())
      );
    }
    Promise.all(promises)
      .then(products => {
        products = products.flat();
        this.setState({allProducts: products})
      })
  }

  searchProducts(searchTerm) {
    console.log(this.state.allProducts)
    let results = this.state.allProducts.filter(product => {
      return product.name.indexOf(searchTerm) !== -1
    })
    return results;    
  }


  render() {
    return (
      <div>
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-sm-12">
            <div>
              <input onChange={this.onChangeProducts} placeholder="Search for products"></input>
              <button onClick={this.submitSearch}><i className="material-icons">search</i></button>
            </div>
            <div className="col-sm-8 selector-container">
            
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
