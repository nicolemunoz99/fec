import React from 'react';


// get number of reviews from GET to /reviews/:product_id/meta and summing
// all property values within the ratings property

const ProductBasics = props => {
  return (
      <div className="row overview-component">
        
        <div className="col-sm-12 overview-component">
          **** Reviews
        </div>
        <div className="col-sm-12">
          <p>Category: {props.productInfo.category}</p>
          <h2>{props.productInfo.name}</h2>
          <p>{props.productInfo.description ?
              props.productInfo.description : null}
          </p>
          <p>
          <a target="NONE" href="http://facebook.com" className="fab fa-facebook fa-2x px-2"></a>
          <a target="NONE" href="http://twitter.com" className="fab fa-twitter fa-2x px-2"></a>
          <a target="NONE" href="http://pinterest.com" className="fab fa-pinterest fa-2x px-2"></a>
          </p> 
        </div>
      </div>
   )
}

export default ProductBasics