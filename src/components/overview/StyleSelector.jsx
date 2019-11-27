import React from 'react';

const StyleSelector = props => {
  let selectedStyle = props.styles[props.selectedStyleInd]
  const onClick = (e) => {
    props.clickStyleHandler(Number(e.target.id))
  }
  // check-circle
  return(
      <div className="row overview-component">
        <div className="col-sm-12">(STYLE SELECTOR)
        <p>${props.styles[props.selectedStyleInd].original_price}</p>
        <p>STYLE > {selectedStyle.name}</p>
        </div>

      {
      props.styles.map((style, i) => {
        return (
          <div className="col-sm-3">
            <i className="checkmark fa fa-check-circle fa-2x"
                  hidden={i===props.selectedStyleInd ? false: true}>
            </i>
            <img id={i} onClick={onClick} src={style.photos[0].thumbnail_url} className="img-fluid"></img>
          </div>)
      })
      
      }
      </div>

  )
}

export default StyleSelector;