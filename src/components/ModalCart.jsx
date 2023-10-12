import { FaTimes } from 'react-icons/fa';
import '../scss/modal_cart.scss';

const ModalCart = ({closeModal, handleDelete, product}) => {
  
  const modalConfirn = () => {
    handleDelete(product[0])
    closeModal()
  }

  return (
    <div>
        <div onClick={closeModal}>
            <FaTimes />
        </div>
        <p>Are You sure, that You want to delete {product[1]} from cart list?</p>
        <div>
            <button onClick={modalConfirn}>Delete!</button>
            <button onClick={closeModal}>Keep it!</button>
        </div>
    </div>
  )
}

export default ModalCart