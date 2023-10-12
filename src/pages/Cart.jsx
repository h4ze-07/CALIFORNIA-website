import React, { useEffect, useState } from 'react'
import '../styles/cart.css'
import { useNavigate } from 'react-router-dom';
import ModalCart from '../components/ModalCart';

const Cart = ({cart, setCart}) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState([]);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  const priceCounter = (arr) => {
    let counter = 0;
    arr.map(el => counter += el.price)
    return counter;
  }

  const handleConfirn = (id, name) => {
    setIsModalOpen(true);
    setProductToDelete([id, name])
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const handleDelete = (id) => {
    let newCart = cart.filter(el => el.id !== id);
    setCart(newCart);
  }

  useEffect(() => {
    setPrice(priceCounter(cart, price))
  }, [cart])

  const handleContinueSearch = () => {
    navigate('/catalog');
  }

  return (
    <section className='cart'>
      {isModalOpen && <ModalCart closeModal={closeModal} handleDelete={handleDelete} product={productToDelete} />}
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
                    <button onClick={() => handleConfirn(el.id, el.name)}>Delete from cart!</button>
                </div>
              </div>
            ))}
          </div>}
        <button onClick={handleContinueSearch}>Continue purchase</button>
      </div>
      <div>
          <h2>Checkout</h2>
          <h3>Total price: ${price}</h3>
      </div>
    </section>
  )
}

export default Cart