import React from 'react';
import axios from 'axios';
import Overview from './overview/Overview.jsx';
import defaultProduct from './defaultProduct.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allProducts: null,
      searchResults: null,
      searchTerm: '',
      showSearchResults: false,
      selectedProduct: defaultProduct
    }
    this.onChangeProducts = this.onChangeProducts.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.searchProducts = this.searchProducts.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.clickProduct = this.clickProduct.bind(this);
    this.findName = this.findName.bind(this);
    this.recordInteractions = this.recordInteractions.bind(this);
    this.clearSearchResults = this.clearSearchResults.bind(this)
  };

  componentDidMount() {
    this.getProducts();
    document.addEventListener('click', this.recordInteractions, false);
  }

  recordInteractions (e) {
    let widget = this.findName(e.target, 'data-widget');
    let element = this.findName(e.target, 'data-selector');
    let time = new Date();
    let interactions = {element, widget, time}
    // console.log('interactions: ', interactions)
    axios.post('http://3.134.102.30/interactions', interactions)
      .then(() => {
        // console.log('Interaction data sent')
      })
  }

  findName (el, type) {
    if (el.attributes[type]) {
      return el.attributes[type].value;
    }
    //had to add 'el.parentNode' condition bc of weird bug in q&a section when closing modals
    else if (el.parentNode && !Array.prototype.includes.call(document.children, el)) {
      return this.findName(el.parentNode, type);
    }
    else if (type === 'data-widget') {
      return 'app';
    }
    else {  //type is 'data-selector
      return 'null';
    }
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
      if (this.state.searchTerm.length && this.state.searchTerm.length > 2) {
        document.addEventListener('click', this.clearSearchResults);
        results = this.searchProducts(this.state.searchTerm);
        this.setState({ searchResults: results, showSearchResults: true })
      } else if (this.state.searchTerm.length === 0) {
        this.clearSearchResults();
      }
    })
  }

  clearSearchResults(e) {
    let searchBtn = document.getElementById("product-search-btn");
    if (e && (searchBtn === e.target || searchBtn.contains(e.target))) {
      return;
    }
    this.setState({ 
      showSearchResults: false,
      searchTerm: ''
    })
    document.removeEventListener('click', this.clearSearchResults);
  }

  searchProducts(searchTerm) {
    let results = this.state.allProducts.filter(product => {
      let name = product.name.toLowerCase();
      return name.indexOf(searchTerm.toLowerCase()) !== -1;
    })
    return results;    
  }

  submitSearch(e) {
    if (this.state.searchTerm.length > 0) {
      let results = this.searchProducts(this.state.searchTerm);
      this.setState({ searchResults: results, showSearchResults: true });
    }
  }

  clickProduct(e) {
    let selectedProduct = this.state.searchResults.filter(product => {
      return product.id === Number(e.target.id);
    })
    this.clearSearchResults();
    this.setState({
      selectedProduct: selectedProduct[0],
      searchTerm: ''
<<<<<<< HEAD
<<<<<<< HEAD
    }, () => { console.log(this.state.selectedProduct)})
=======
    }, () => {
      console.log(this.state.selectedProduct)
    })
>>>>>>> 610b8ac497a9604af00b99e900da3c6af74ff74d
=======
    }, () => { })
>>>>>>> 8134285ab3d1d9fbfb149a739c5a57b3c8b048dd
  }

  render() {
    return (
      <div>
      <div className="container-fluid">
        <div className="row mt-3 mb-3">
          <div className="col-sm-6 selector" data-widget="product-search">
          <div className="row no-gutters">
            <div className="col-12 product-search">
            <div className="row no-gutters">
              <div className="col-10">
              <input onChange={this.onChangeProducts} placeholder="Search for products" value={this.state.searchTerm}></input>
              </div>
              <div className="col-2">
              <button id="product-search-btn" onClick={this.submitSearch}><i className="inline-centered material-icons">search</i></button>
              
              </div>
              </div>
              {
              this.state.searchResults && this.state.showSearchResults ?               
                <div className="options overflow">
                {
                  this.state.searchResults.map((product, i) => {
                    return <div onClick={this.clickProduct} className="item d-flex align-items-center justify-content-center" key={i} id={product.id}>
                                {product.name}
                          </div>
                  })
                }
                </div>              
              : null
              }
            </div>
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
