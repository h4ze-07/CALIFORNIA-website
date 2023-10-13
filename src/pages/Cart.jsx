import  {useEffect, useState} from 'react'
import '../scss/cart.scss'
import {useNavigate} from 'react-router-dom';
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
        <div className='container'>
          <div className='cart_text text_centre'>
            <h2>List:</h2>
          </div>
          <ModalCart isOpen={isModalOpen} closeModal={closeModal} handleDelete={handleDelete}
                     product={productToDelete}/>
          {cart.length === 0 ? <h3>Cart is empty!</h3> :
              <div className='list-wrap'>
                {cart.map(el => (
                    <div key={el.id} className='cart-card d-flex'>
                      <div className='cart-img'>
                        <img src={el.img} alt={el.name}/>
                      </div>
                      <div className='cart-right d-flex aline_centre'>
                        <div className='cart-right-text'>
                          <h3>{el.name}</h3>
                          <p>{el.description}</p>
                        </div>
                        <div className='cart-right-button'>
                          <button onClick={() => handleConfirn(el.id, el.name)}>Delete</button>
                        </div>
                      </div>
                    </div>
                ))}
                <div className='total'>
                  <h4>Total price: ${price}</h4>
                </div>
              </div>}
          <div className='back text_centre'>
            <button onClick={handleContinueSearch}>Continue purchase</button>
          </div>
        </div>
      </section>
  )
}

export default Cart