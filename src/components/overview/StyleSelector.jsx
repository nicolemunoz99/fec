import React from 'react';

const StyleSelector = props => {
  let selectedStyle = props.styles[props.selectedStyleInd]
  const onClick = (e) => {
    props.clickStyleHandler(Number(e.target.id))
  }

  return(
    
      <div className="row justify-content-end">
        <div className="col-sm-12">StyleSelector</div>
        <div className="col-sm-12"> {selectedStyle.name}</div>
      {
      props.styles.map((style, i) => {
        return (
          <div className="col-sm-3">
            <span className="position-absolute" 
                  hidden={i===props.selectedStyleInd ? false: true}> checkmark
            </span>
            <img id={i} onClick={onClick} src={style.photos[0].thumbnail_url} className="img-fluid"></img>
          </div>)
      })
      }
      </div>
  )
}

export default StyleSelector;