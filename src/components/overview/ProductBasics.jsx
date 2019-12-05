import React from 'react';


// get number of reviews from GET to /reviews/:product_id/meta and summing
// all property values within the ratings property

const ProductBasics = props => {
  return (
      <div className="row">
        
        <div className="col-sm-12 overview-component mt-2 mb-2">
          **** Reviews
        </div>
        <div className="col-sm-12">
          <p>Category: {props.productInfo.category}</p>
          <h2>{props.productInfo.name}</h2>
          <p>{props.productInfo.description ?
              props.productInfo.description : null}
          </p>
          <p>
          <a target="NONE" href="http://facebook.com" className="social-icon fab fa-facebook fa-1x px-2"></a>
          <a target="NONE" href="http://twitter.com" className="social-icon fab fa-twitter fa-1x px-2"></a>
          <a target="NONE" href="http://pinterest.com" className="social-icon fab fa-pinterest fa-1x px-2"></a>
          </p> 
        </div>
      </div>
   )
}

export default ProductBasics