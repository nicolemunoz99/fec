import React from 'react';
import Overview from './overview/Overview.jsx'
import defaultProduct from './defaultProduct.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allProducts: null,
      searchResults: null,
      searchTerm: null,
      showSearchResults: false,
      selectedProduct: defaultProduct
    }
    this.onChangeProducts = this.onChangeProducts.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.searchProducts = this.searchProducts.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.clickProduct = this.clickProduct.bind(this);
  };

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    let promises = [];
    for (let i = 1; i< 100; i++) {
      promises.push(fetch(`http://3.134.102.30/products/list/?page=${i}&count=50`)
        .then(res => res.json())
      );
    }
    Promise.all(promises)
      .then(products => {
        products = products.flat();
        this.setState({allProducts: products});
      })
  }
  
  onChangeProducts(e) {
    this.setState({ searchTerm: e.target.value }, () => {
      let results;
      if (this.state.searchTerm.length && this.state.searchTerm.length % 2 === 0) {
        results = this.searchProducts(this.state.searchTerm);
        this.setState({ searchResults: results, showSearchResults: true })
      } else if (this.state.searchTerm.length === 0) {
        this.setState({showSearchResults: false});
      }
    })
  }

  searchProducts(searchTerm) {
    let results = this.state.allProducts.filter(product => {
      let name = product.name.toLowerCase()
      return name.indexOf(searchTerm.toLowerCase()) !== -1;
    })
    return results;    
  }

  submitSearch(e) {
    let results = this.searchProducts(this.state.searchTerm);
    this.setState({ searchResults: results, showSearchResults: true })
  }

  clickProduct(e) {
    let selectedProduct = this.state.searchResults.filter(product => {
      return product.id === Number(e.target.id)
    })
    this.setState({selectedProduct: selectedProduct[0]})
    this.setState({showSearchResults: false})
  }

  render() {
    return (
      <div>
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-sm-6">
            <div>
              <input onChange={this.onChangeProducts} placeholder="Search for products"></input>
              <button onClick={this.submitSearch}><i className="material-icons">search</i></button>
            </div>
            <div className="col-sm-8 selector-container">
              {
              this.state.searchResults && this.state.showSearchResults ? <div id="searchResults" className="selector-options" >
                {
                  this.state.searchResults.map((product, i) => {
                    return <div onClick={this.clickProduct} className="selector d-flex align-items-center justify-content-center" key={i} id={product.id}>
                                {product.name}
                          </div>
                  })
                }
              </div> : null
              }
            </div>
          </div>
        </div>
      </div>
      <Overview productInfo={this.state.selectedProduct} />
      </div>
    )
  }
}


export default App;
