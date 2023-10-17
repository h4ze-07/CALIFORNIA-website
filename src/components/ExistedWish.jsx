import React from 'react'

const ExistedWish = ({name, handleExistedWishClose}) => {

    setTimeout(() => {
        handleExistedWishClose()
    }, 3000)

    const handleCloseBtn = () => {
        handleExistedWishClose()
    }

  return (
    <div>
        <p>Ooops! Look's like {name} is currently exist in Your list!</p>
        <button onClick={handleCloseBtn}>Close</button>
    </div>
  )
}

export default ExistedWish