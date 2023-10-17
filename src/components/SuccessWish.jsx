import React from 'react'

const SuccessWish = ({name, handleSuccessWishClose}) => {
  
    setTimeout(() => {
        handleSuccessWishClose()
    }, 3000)

    const handleCloseBtn = () => {
        handleSuccessWishClose()
    }

  return (
    <div>
        <p>{name} is successfully added to Your wishes!</p>
        <button onClick={handleCloseBtn}>Close</button>
    </div>
  )
}

export default SuccessWish