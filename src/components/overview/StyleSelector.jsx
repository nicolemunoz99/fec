import React from 'react';

class StyleSelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedSku: null, // size
      qtyOptions: null,
      selectedQty: null,
      activeDropdown: null
    }
    this.styleClick = this.styleClick.bind(this);
    this.selectSize = this.selectSize.bind(this);
    this.selectQty = this.selectQty.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.toggleSelector = this.toggleSelector.bind(this);
    this.handleOutsideDropdown = this.handleOutsideDropdown.bind(this);
  }
  
  // update selected style when clicking on thumnail
  styleClick(e) {
    this.props.clickStyleHandler(Number(e.target.id))
  }
  
  handleOutsideDropdown(e) {
    this.toggleSelector();
  }

  toggleSelector(e) {
    // if state.activeDropdown is defined
    if (this.state.activeDropdown) {
      // set state.activeSelector to null
      this.setState({ activeDropdown: null })
      // remove eventListener
      document.removeEventListener('click', this.handleOutsideDropdown)
     }
     // if state.activeDropdown isn't set
     else {
      // set state.activeSelector to the target dropdownName
      this.setState({
        activeDropdown: e.target.attributes.dropdownName.value
      })
      // add an event Listener to document
      document.addEventListener('click', this.handleOutsideDropdown)
     }
  }

  selectSize(e) {
    let selectedSku = e.target.id;
    // update state with selected size
    this.setState({ selectedSku: selectedSku}, () => {
      // update state with an array of possible quantity selections
      let qtyAvailable = this.props.selectedStyle.skus[selectedSku]
      let qtyOptions = [];
      for (let i = 1; i <= qtyAvailable; i++) {
        if (i > 15) { break; } // show a max of 15 available
        qtyOptions.push(i);
      }
      this.setState({ qtyOptions: qtyOptions })
      this.setState({ selectedQty: 1 }) // default is 1
    })
  }

  selectQty(e) {
    let selectedQty = e.target.id;
    this.setState({ selectedQty: selectedQty }, () => {
    });
    // hide quantity options
    document.getElementById('qtySelector').style.display='none';
  }

  addToCart(e) {
    // if no size selected
    if (!this.state.selectedSku) {
      // expand size selector and prompt user to select size
      document.getElementById('selectorMain-size').click()
    }
  }

  
  render() {
    return(
      <div className="row overview-component">
        {/* // Style Selector */}
        
          <div className="col-sm-12">
            <p>${this.props.selectedStyle.original_price}</p>
            <p>STYLE > {this.props.selectedStyle.name}</p>
          
            <div className="row style-thumbnails-container">
            {
            this.props.styles.map((style, i) => {
              let checkmarkClass = style.style_id===this.props.selectedStyle.style_id ? "checkmark fa fa-check-circle fa-2x" : "hidden"
              return (
                <div key={i} className="col-sm-3">
                  <i className={checkmarkClass}></i>
                  <img id={style.style_id} onClick={this.styleClick} src={style.photos[0].thumbnail_url} className="style-tb img-fluid"></img>
                </div>)
            })
            }
            </div>
          </div>

          {/* Add To Cart */}
          <div className="col-sm-12 mt-1 mb-4 d-flex justify-content-center">
            {/* size selector */}      
            <div className="col-sm-6 selector-container checkout-item ">
              <div className="col-sm-12">
                <div id="selectorMain" dropdownName="sku" onClick={this.toggleSelector} className="selector justify-content-center">
                  {/* set default value based on whether or not style is in stock */}
                  {Object.keys(this.props.selectedStyle.skus).length === 0 ?
                  <span className="disabled ml-2 mr-2">Out of Stock</span> :
                  <span className="ml-2 mr-2">{this.state.selectedSku ? "size " + this.state.selectedSku : "Select Size" }</span>
                  }
                </div>
                <div className="selector-options">
                  { this.state.activeDropdown === 'sku' ? 
                    <div ref={node => {this.node = node}}>
                        {Object.keys(this.props.selectedStyle.skus).map((sku, i) => {
                        return (
                          <div key={i} onClick={this.selectSize} id={sku} className="selector d-flex justify-content-center">
                            {sku}
                          </div>
                        )
                      })}
                    </div> : null
                  }
                </div>
              </div>
            </div>

            {/* quantity selector */}
            <div className="col-sm-3 selector-container checkout-item">
              <div className="col-sm-12"><span className="pr-2">Quantity:</span> 
                <div id="selectorMain" dropdownName="qty" onClick={this.toggleSelector} className="selector d-flex align-items-center justify-content-center">
                  {/* set default value based on whether or not size has been selected */}
                  <span className="ml-2 mr-2">{ this.state.selectedQty ? this.state.selectedQty : '-' }</span> 
                </div>
                <div id="qtySelector" className="selector-options" >
                { this.state.activeDropdown === 'qty' ?
                    <div ref={node => {this.node = node}}>
                      {this.state.qtyOptions.map((qty, i) => {
                        return (
                          <div key={i} onClick={this.selectQty} id={qty} className="selector d-flex align-items-center justify-content-center">
                            {qty}
                          </div>
                        )
                      })}
                    </div> : null
                }
                </div>
              </div>
            </div>
          </div>      
          <div className="col-sm-12 mb-3 d-flex align-items-center justify-content-center">
            <div><button onClick={this.addToCart}>Add to cart</button></div>
          </div>
      </div>
    )
  }
}

export default StyleSelector;