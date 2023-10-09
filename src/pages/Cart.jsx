import React, { useEffect, useState } from 'react'
import '../styles/cart.css'

const Cart = ({cart, setCart}) => {

  const [price, setPrice] = useState(0);

  const priceCounter = (arr) => {
    let counter = 0;
    arr.map(el => counter += el.price)
    return counter
  }

  const handleDelete = (id) => {
    let newCart = cart.filter(el => el.id !== id)
    setCart(newCart)
  }

  useEffect(() => {
    setPrice(priceCounter(cart, price))
  }, [cart])

  return (
    <section className='cart'>
      <div>
        <h2>List:</h2>
        {cart.length === 0 ? <h3>Cart is empty!</h3> :
          <div className='list-wrap'>
            {cart.map(el => (
              <div key={el.id} className='cart-card'>
                <div className='cart-img'>
                  <img src={el.img} alt={el.name} />
                </div>
                <div className='cart-right'>
                    <h2>{el.name}</h2>
                    <p>{el.description}</p>
                    <button onClick={() => handleDelete(el.id)}>Delete from cart!</button>
                </div>
              </div>
            ))}
          </div>
        }

      </div>
      <div>
          <h2>Checkout</h2>
          <h3>Total price: ${price}</h3>
      </div>
    </section>
  )
}

export default Cart