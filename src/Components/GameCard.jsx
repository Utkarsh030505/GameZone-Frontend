import React from 'react'

const GameCard = ({links,name,img}) => {
  return (
     <a className="box" href={links}>
          <img src={img} alt={name}/>
        </a>
   
  )
}

export default GameCard