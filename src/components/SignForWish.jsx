import React from 'react'

const SignForWish = ({name, handleRegisterForWishClose}) => {
  
    setTimeout(() => {
        handleRegisterForWishClose()
    }, 3000)
    
    const handleCloseBtn = () => {
        handleRegisterForWishClose()
    }

  return (
    <div>
        <p>Please, sign in, if You want to add <br/> {name} to Your wish list!</p>
        <button onClick={handleCloseBtn}>Close</button>
    </div>
  )
}

export default SignForWish