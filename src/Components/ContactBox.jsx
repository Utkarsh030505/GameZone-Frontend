import React from 'react'

const ContactBox = ({name,svg,url,info}) => {
  return (
       <div className="box">
        <img src={svg} alt={name}/>
        <h3>{name}</h3>
        <a href={url}>{info}</a>
      </div>
  )
}

export default ContactBox