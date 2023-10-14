import React from 'react'
import { Link } from 'react-router-dom'
import '../scss/notFound.scss'

const NotFound = () => {
  return (
      <section className='not_found'>
          <div className='container text_centre'>
              <div className='not_found_text'>
                  <h2>Ooops, something went wrong!</h2>
                  <p>
                      Please, return to our <Link to='/'>Main page</Link> or continue search for Your best gadget in <Link to='/catalog'>Catalog</Link>.
                  </p>
              </div>
          </div>
      </section>

  )
}

export default NotFound