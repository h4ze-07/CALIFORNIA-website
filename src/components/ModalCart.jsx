import { FaTimes } from 'react-icons/fa';
import '../scss/modal_cart.scss';

const ModalCart = ({isOpen, closeModal, handleDelete, product}) => {

    const modalConfirn = () => {
        handleDelete(product[0])
        closeModal()
    }

    return (
        <div className={`modal_cart ${isOpen ? 'open' : ''}`}>
            <div className='modal_cart_content'>
                <div className="modal_cart_close" onClick={closeModal}>
                    <FaTimes />
                </div>
                <p>Are You sure, that You want to delete {product[1]} from cart list?</p>
                <div className='modal_cart_button'>
                    <button onClick={modalConfirn}>Delete!</button>
                    <button onClick={closeModal}>Keep it!</button>
                </div>
            </div>
        </div>
    )
}

export default ModalCart