import React from 'react';

class StyleSelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedSku: null, // size
      qtyOptions: null,
      selectedQty: null
    }
    this.styleClick = this.styleClick.bind(this);
    this.selectSize = this.selectSize.bind(this);
    this.toggleSelector = this.toggleSelector.bind(this);
    this.selectQty = this.selectQty.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }
  
  // update selected style when clicking on thumnail
  styleClick(e) {
    this.props.clickStyleHandler(Number(e.target.id))
  }
  
 
  toggleSelector(e) {
    let selectorName = e.target.attributes.selectorName.value;
    let selectorElement = document.getElementById(selectorName)   
    console.log('selectorName', selectorName)
    console.log('selectorElement', selectorElement) 
    // expand given selector
    if (selectorElement.style.display === '' || selectorElement.style.display === 'none') { 
      e.target.classList.add('disabled')
      selectorElement.style.display='block';
    // close given selector
    } else {
      e.target.classList.remove('disabled')
      selectorElement.style.display='none';
    }
  }

  selectSize(e) {
    console.log(e.target)
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
    // hide all size options
    document.getElementById('sizeSelector').style.display = 'none';
    // remove disabled style
    document.getElementById('selectorMain-size').classList.remove('disabled')
  }

  selectQty(e) {
    let selectedQty = e.target.id;
    this.setState({ selectedQty: selectedQty }, () => {
      console.log(this.state)
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
          <div className="col-sm-12 checkout d-flex align-items-center justify-content-center">
            {/* size selector */}
            <div className="col-sm-6 selector-container checkout-item ">
              <div className="col-sm-12">
              <div id="selectorMain-size" selectorName="sizeSelector" onClick={this.toggleSelector} className="selector d-flex align-items-center justify-content-center">
                {/* set default value based on whether or not style is in stock */}
                {Object.keys(this.props.selectedStyle.skus).length === 0 ?
                <span className="disabled ml-2 mr-2">Out of Stock</span> :
                <span className="ml-2 mr-2">{this.state.selectedSku ? "size " + this.state.selectedSku : "Select Size" }</span>
                }
              </div>
              <div id="sizeSelector" className="selector-options">
              { 
                Object.keys(this.props.selectedStyle.skus).map((sku, i) => {
                  return (
                    <div onClick={this.selectSize} id={sku} className="selector d-flex align-items-center justify-content-center">
                      {sku}
                    </div>
                  )
                })
              }
              </div>
              </div>
            </div>

            {/* quantity selector */}
            <div className="col-sm-3 selector-container checkout-item ">
              <div className="col-sm-12"> Quantity:
              <div id="selectorMain-qty" selectorName="qtySelector" onClick={this.toggleSelector} className="selector d-flex align-items-center justify-content-center">
                {/* set default value based on whether or not size has been selected */}
                <span className="ml-2 mr-2">{ this.state.selectedQty ? this.state.selectedQty : '-' }</span> 
              </div>
              <div id="qtySelector" className="selector-options">
              { this.state.qtyOptions ?
                this.state.qtyOptions.map((qty, i) => {
                  return (
                    <div onClick={this.selectQty} id={qty} className="selector d-flex align-items-center justify-content-center">
                      {qty}
                    </div>
                  )
                }) :
                null
              }
              </div>
              </div>
            </div>
            </div>      
            <div className="col-sm-12 d-flex align-items-center justify-content-center">
            <div><button onClick={this.addToCart}>Add to cart</button></div>
          </div>
      </div>
    )
  }
}

export default StyleSelector;