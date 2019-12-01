import React from 'react';

class StyleSelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedSku: null, // size
      qtyOptions: null,
      selectedQty: null
    }
    this.onClick = this.onClick.bind(this);
    this.selectSize = this.selectSize.bind(this);
    this.selectQty = this.selectQty.bind(this);
  }
  
  // update selected style when clicking on thumnail
  onClick(e) {
    this.props.clickStyleHandler(Number(e.target.id))
   
    // if no stock available
    if (Object.keys(this.props.selectedStyle.skus).length === 0 ){
      // inactivate size-selector and set to "out of stock"

    }
  }

  // update state with selected size
  selectSize(e) {
    let selectedSku = e.target.value;
    this.setState({ selectedSku: selectedSku}, () => {
      // update state with an array of possible quantity selections
      let qtyAvailable = this.props.selectedStyle.skus[selectedSku]
      let qtyOptions = [];
      for (let i = 1; i <= qtyAvailable; i++) {
        if (i > 15) { break; }
        qtyOptions.push(i);
      }
      this.setState({ qtyOptions: qtyOptions })
    })
  }

  selectQty(e) {
    let selectedQty = e.target.value;
    this.setState({ selectedQty: selectedQty }, () => {
      console.log(this.state)
    });
  }


  
  render() {
    return(
      <div className="style-selector">
        {/* // Style Selector */}
        <div className="row overview-component">
          <div className="col-sm-12">
            <p>${this.props.selectedStyle.original_price}</p>
            <p>STYLE > {this.props.selectedStyle.name}</p>
          
            <div className="row style-thumbnails-container">
            {
            this.props.styles.map((style, i) => {
              let checkmarkClass = style.style_id===this.props.selectedStyle.style_id ? "checkmark fa fa-check-circle fa-2x" : "hidden"
              return (
                <div className="col-sm-3">
                  <i className={checkmarkClass}></i>
                  <img id={style.style_id} onClick={this.onClick} src={style.photos[0].thumbnail_url} className="img-fluid"></img>
                </div>)
            })
            }
            </div>
          </div>
          </div>
          
          <div className="row overview-component">
            {/* Add To Cart */}
          <div className="col-sm-12 checkout d-flex text-center">
            <div className="row checkout-container">
            <div className="checkout-item">
              {/* <div> */}
              <select onChange={this.selectSize} id="size-selector">
                  {/* set default value based on whether or not style is in stock */}
                  {Object.keys(this.props.selectedStyle.skus).length === 0 ?
                     <option disabled selected value="">Out of Stock</option> :
                    <option disabled selected value="">Select size</option>
                  }
                  
                  {
                    Object.keys(this.props.selectedStyle.skus).map((sku, i) => {
                      return <option key={i}>{sku}</option>
                    })
                  }
              </select>
              {/* </div> */}
            </div>
            <div className="checkout-item">
              {/* <div> */}
              Quantity: <select onChange={this.selectQty} id="quantity-selector" >
              {/* if qtyOptions is undefined (i.e., before size is selected), then only show diabled option */}
                { this.state.qtyOptions ? 
                  this.state.qtyOptions.map(qty => {
                      return <option key={qty} >{qty}</option>
                  }) : <option disabled selected value="">-</option>
                }
              </select>
              {/* </div> */}
            </div>
            <div className="checkout-item"><button>Add to cart</button></div>
            </div>
          </div>
          </div>
          </div>
    )
  }
}

export default StyleSelector;