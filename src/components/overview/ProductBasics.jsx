import React from 'react';


// get number of reviews from GET to /reviews/:product_id/meta and summing
// all property values within the ratings property

const ProductBasics = props => {
  return (
      <div className="row overview-component">
        <div className="col-sm-12">
          <div className="col-sm-12 overview-component">
            **** Reviews
          </div>
          <p>Category: {props.productInfo.category}</p>
          <h2>{props.productInfo.name}</h2>
          <p>{props.productInfo.description ?
               props.productInfo.description : null}
          </p>
          <p>
          <a target="NONE" href="http://facebook.com" className="fa fa-facebook"></a>
          <a target="NONE" href="http://twitter.com" className="fa fa-twitter"></a>
          <a target="NONE" href="http://pinterest.com" className="fa fa-pinterest"></a>
          </p> 
        </div>
      </div>
   )
}

export default ProductBasics