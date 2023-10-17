import React from 'react'
import '../scss/signforwish_modal.scss'

const SignForWish = ({name, handleRegisterForWishClose, isOpen}) => {
  
    setTimeout(() => {
        handleRegisterForWishClose()
    }, 4000)
    
    const handleCloseBtn = () => {
        handleRegisterForWishClose()
    }

  return (
      <div className={`modal_sign_wish ${isOpen ? 'open' : ''}`}>
          <div className='modal_sign_content'>
              <p>Please, sign in, if You want to add <br/> {name} to Your wish list!</p>
              <button onClick={handleCloseBtn}>Close</button>
          </div>
      </div>

  )
}

export default SignForWish