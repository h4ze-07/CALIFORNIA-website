import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div style={{margin: '150px auto', textAlign: 'center'}}>
        <h1>Ooops, something went wrong!</h1>
        <p>
            Please, return to our <Link to='/'>Main page</Link> or continue search for Your best gadget in <Link to='/catalog'>Catalog</Link>.
        </p>
    </div>
  )
}

export default NotFound