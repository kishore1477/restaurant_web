import React from 'react'
import Spinner from 'react-bootstrap/Spinner';
const Loader = () => {
  return (
    <div style={{display:"flex", alignItems:"center", justifyContent:"center", height:"100vh", }}>
    
 
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    </div>
  )
}

export default Loader


