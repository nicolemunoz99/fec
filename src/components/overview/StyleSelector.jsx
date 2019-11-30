import React from 'react';

const StyleSelector = props => {
  const onClick = (e) => {
    props.clickStyleHandler(Number(e.target.id))
  }

  // check-circle
  return(
      <div className="row overview-component">
        <div className="col-sm-12">(STYLE SELECTOR)
        <p>${props.selectedStyle.original_price}</p>
        <p>STYLE > {props.selectedStyle.name}</p>
        </div>

      {
      props.styles.map((style, i) => {
        let checkmarkClass = style.style_id===props.selectedStyle.style_id ? "checkmark fa fa-check-circle fa-2x" : "hidden"
        return (
          <div className="col-sm-3">
            <i className={checkmarkClass}></i>
            <img id={style.style_id} onClick={onClick} src={style.photos[0].thumbnail_url} className="img-fluid"></img>
          </div>)
      })
      
      }
      </div>

  )
}

export default StyleSelector;