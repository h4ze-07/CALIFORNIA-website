import React from 'react'
import '../scss/existedwish_modal.scss'

const ExistedWish = ({name, handleExistedWishClose, isOpen}) => {

    setTimeout(() => {
        handleExistedWishClose()
    }, 4000)

    const handleCloseBtn = () => {
        handleExistedWishClose()
    }

  return (
      <div className={`modal_existed_wish ${isOpen ? 'open' : ''}`}>
          <div className='modal_existed_content'>
              <p>Ooops! Look's like {name} is currently exist in Your list!</p>
              <button onClick={handleCloseBtn}>Close</button>
          </div>
      </div>

  )
}

export default ExistedWish