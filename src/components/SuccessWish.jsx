import React from 'react'
import '../scss/successwish_modal.scss'

const SuccessWish = ({name, handleSuccessWishClose, isOpen}) => {

    setTimeout(() => {
        handleSuccessWishClose()
    }, 4000)

    const handleCloseBtn = () => {
        handleSuccessWishClose()
    }

    return (
        <div className={`modal_success_wish ${isOpen ? 'open' : ''}`}>
            <div className='modal_success_content'>
                <p>{name} is successfully added to Your wishes!</p>
                <button onClick={handleCloseBtn}>Close</button>
            </div>
        </div>

    )
}

export default SuccessWish