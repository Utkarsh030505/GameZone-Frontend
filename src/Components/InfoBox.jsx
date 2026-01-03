import React from 'react'

const InfoBox = ({name,img}) => {
  return (
    <div className="box">
        <img src={img} alt={name}/>
        <h3>{name}</h3>
      </div>
  )
}

export default InfoBox
