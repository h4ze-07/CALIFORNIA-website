import {useNavigate} from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import '../scss/checkoutModal.scss'


const CheckoutModal = ({isOpen, closeModal, setIsCheckoutModal, setCart}) => {

    const navigate = useNavigate()
    const handleCloseClick = () => {
        setIsCheckoutModal(false);
        navigate('/');
        setCart([]);
    }

    return (
        <div className={`checkout_modal_cart ${isOpen ? 'open' : ''}`}>
            <div className='checkout_modal_cart_content'>
                <div className="checkout_modal_cart_close" onClick={closeModal}>
                    <FaTimes />
                </div>
                <div className='checkout_modal_cart_text text_centre'>
                    <h2>Thank you for choosing our store to purchase your device!</h2>
                    <p>We hope to hear feedback from you! Always glad to see you!</p>
                    <button onClick={handleCloseClick}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default CheckoutModal;