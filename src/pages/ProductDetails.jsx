import '../scss/product_details.scss'
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {DB_URL} from '../firebase';
import { BsSuitHeart } from 'react-icons/bs';
import SuccessWish from '../components/SuccessWish';
import ExistedWish from '../components/ExistedWish';
import SignForWish from '../components/SignForWish';

function ProductDetails({cart, addToCart, setCart, scrollToTop, registerForWish, existedWish, successWish,
    handleRegisterForWishClose, handleExistedWishClose, handleSuccessWishClose, handleWishes
    }) {
    const {productId} = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`${DB_URL}/products/${productId}.json`);
                if (!response.ok) {
                    throw new Error('There is no information about this product');
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProductDetails();
    }, [productId]);

    const handleAddToCart = (product, productId) => {
        const testProduct = cart.find((item) => item.productId === productId);
        if (testProduct) {
            const updatedItems = cart.map((item) =>
                item.productId === productId
                    ? {...item, quantity: item.quantity + 1}
                    : item);
            setCart(updatedItems);
        } else {
            addToCart(
                {
                    cartId: cart.length === 0 ? 1 : cart[cart.length - 1].cartId + 1,
                    productId: productId,
                    quantity: 1,
                    price: product.price,
                    allInfo: product
                }
            )
        }
        navigate('/cart');
    }

    const handleWishesChange = (product, id) => {
        handleWishes(product, id)
        setIsModalOpen(true);
    }

    useEffect(() => {
        scrollToTop()
    }, [])

    return (
        <section className='product_details'>
            <div className='product_description'>
                {product ? (
                    <div className='description_card container d-flex'>
                        <div className='description_img'>
                            <img src={product.img} alt="img"/>
                        </div>
                        <div className='description_text'>
                            <h2 className=''>{product.name}</h2>
                            <p className=''>{product.description}</p>
                            <h3 className=''>Price: $ {product.price}</h3>
                            <button onClick={() => {
                                handleAddToCart(product, productId)
                            }}>Add to cart
                            </button>
                            <button onClick={() => handleWishesChange(product, productId)}><BsSuitHeart/></button>
                        </div>
                    </div>
                ) : (
                    <p className=''>Loading...</p>
                )}
            </div>
            <div className='product_back'>
                <Link to={'/catalog'}>Back to catalog</Link>
            </div>
            {successWish && <SuccessWish name={product.name} handleSuccessWishClose={handleSuccessWishClose}
                                         isOpen={isModalOpen}/>}
            {existedWish && <ExistedWish name={product.name} handleExistedWishClose={handleExistedWishClose} isOpen={isModalOpen}/>}
            {registerForWish && <SignForWish name={product.name} handleRegisterForWishClose={handleRegisterForWishClose} isOpen={isModalOpen}/>}
        </section>
    )
}

export default ProductDetails;
