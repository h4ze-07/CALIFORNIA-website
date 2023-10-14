import {useEffect, useState} from 'react'
import '../scss/cart.scss'
import {useNavigate} from 'react-router-dom';
import ModalCart from '../components/ModalCart';

const CheckoutModal = ({setIsCheckoutModal, setCart}) => {

    const navigate = useNavigate()

    const handleCloseClick = () => {
        setIsCheckoutModal(false);
        navigate('/');
        setCart([]);
    }

    return (
        <>
            <h2>Thank you for choosing our store to purchase your device!</h2>
            <p>We hope to hear feedback from you! Always glad to see you!</p>
            <button onClick={handleCloseClick}>Close</button>
        </>
    )
}

const Cart = ({cart, setCart}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCheckoutModal, setIsCheckoutModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState([]);
    const [price, setPrice] = useState(0);
    const navigate = useNavigate();

    const priceCounter = (arr) => {
        let counter = 0;
        arr.map(el => counter += el.price * el.quantity);
        return counter;
    }

    const handleConfirn = (id, name) => {
        setIsModalOpen(true);
        setProductToDelete([id, name]);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const handleDelete = (id) => {
        let newCart = cart.filter(el => el.cartId !== id);
        setCart(newCart);
    }

    useEffect(() => {
        setPrice(priceCounter(cart, price));
    }, [cart])

    const handleContinueSearch = () => {
        navigate('/catalog');
    }

    const handleQuantityDecrease = (el) => {
        if (el.quantity === 1) {
            return false;
        } else {
            let newItems = cart.map(item => {
                if (item.cartId === el.cartId) {
                    return {...item, quantity: item.quantity - 1};
                }
                return item;
            })
            setCart(newItems);
        }
    }

    const handleQuantityIncrease = (el) => {
        let newItems = cart.map(item => {
            if (item.cartId === el.cartId) {
                return {...item, quantity: item.quantity + 1};
            }
            return item;
        })
        setCart(newItems);
    }

    const handleCheckoutClick = () => {
        setIsCheckoutModal(true);
    }

    return (
        <section className='cart'>
            <div className='container'>
                <div className='cart_text text_centre'>
                    <h2>List:</h2>
                </div>
                <ModalCart isOpen={isModalOpen} closeModal={closeModal} handleDelete={handleDelete}
                           product={productToDelete}/>
                {isCheckoutModal && <CheckoutModal setIsCheckoutModal={setIsCheckoutModal} setCart={setCart}/>}
                {cart.length === 0 ? <h3>Cart is empty!</h3> :
                    <div className='list-wrap'>
                        {cart.map(el => (
                            <div key={el.cartId} className='cart-card d-flex'>
                                <div className='cart-img'>
                                    <img src={el.allInfo.img} alt={el.allInfo.name}/>
                                </div>
                                <div className='cart-right d-flex aline_centre'>
                                    <div className='cart-right-text'>
                                        <h3>{el.allInfo.name}</h3>
                                        <p>
                                            <button onClick={() => handleQuantityDecrease(el)}>-</button>
                                            <span>{el.quantity}</span>
                                            <button onClick={() => handleQuantityIncrease(el)}>+</button>
                                        </p>
                                        <p>Price: {el.price * el.quantity}$</p>
                                    </div>
                                    <div className='cart-right-button'>
                                        <button onClick={() => handleConfirn(el.cartId, el.allInfo.name)}>Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className='total'>
                            <h4>Total price: ${price}</h4>
                            <button onClick={handleCheckoutClick}>Checkout</button>
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