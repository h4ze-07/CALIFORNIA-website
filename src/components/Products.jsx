import { BsSuitHeart } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import { Autoplay, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';

import { useState } from "react";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import '../scss/products.scss';
import ExistedWish from './ExistedWish';
import SignForWish from './SignForWish';
import SuccessWish from './SuccessWish';


const Products = ({
    swiperProducts,
    cart,
    setCart,
    addToCart,
    registerForWish,
    existedWish,
    successWish,
    handleRegisterForWishClose,
    handleExistedWishClose,
    handleSuccessWishClose,
    handleWishes,
    currentWishProduct
}) => {

    // const formattedProductsItem = swiperProducts.map((product) => {
    //   const formattedPrice = product.price.toLocaleString('en-US', {
    //     style: 'currency',
    //     currency: 'USD',
    //   });

    //   return {
    //     ...product,
    //     formattedPrice,
    //   };
    // });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const handleCartButtonClick = (product) => {
        const testProduct = cart.find((item) => item.productId === product.id);
        if (testProduct) {
            const updatedItems = cart.map((item) =>
                item.productId === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item);
            setCart(updatedItems);
        } else {
            addToCart(
                {
                    cartId: cart.length === 0 ? 1 : cart[cart.length - 1].cartId + 1,
                    productId: product.id,
                    quantity: 1,
                    price: product.price,
                    allInfo: product
                }
            )
        }
        navigate('/cart');
    }

    const handleWishesChange = (product) => {
        handleWishes(product)
        setIsModalOpen(true);
    }

    return (
        <>
            <section className='items'>
                <div className='container'>
                    <div className='items_text text_centre'>
                        <h3>Save on our most selled items.</h3>
                        <p>Our new Limited Edition Winter Design BESPOKE 4-Door Flex™</p>
                    </div>
                    <Swiper
                        slidesPerView={4}
                        spaceBetween={30}
                        freeMode={true}
                        autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
                        loop={true}
                        modules={[FreeMode, Autoplay]}
                        className="mySwiper"
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                            },
                            600: {
                                slidesPerView: 2,
                            },
                            840: {
                                slidesPerView: 3,
                            },
                            1044: {
                                slidesPerView: 4,
                            },
                        }}
                    >
                        <div className='items_box d-flex between'>
                            {swiperProducts.length === 0 && <p>No any products</p>}
                            {swiperProducts.length > 0 && swiperProducts.map((product, id) => (
                                <SwiperSlide key={id}>
                                    <article>
                                        <img src={product.img} alt="" />
                                        <h4>{product.name}</h4>
                                        <p> $ {product.price}</p>
                                        <button onClick={() => handleCartButtonClick(product)}>
                                            Add to Cart
                                        </button>
                                        <button onClick={() => handleWishesChange(product)}><BsSuitHeart /></button>
                                        <button>
                                            <Link to={`/product/${product.id}`}>More info</Link>
                                        </button>
                                    </article>
                                </SwiperSlide>
                            ))}

                        </div>
                    </Swiper>
                </div>
                {successWish &&
                    <SuccessWish name={currentWishProduct.name} handleSuccessWishClose={handleSuccessWishClose}
                        isOpen={isModalOpen} />}
                {existedWish &&
                    <ExistedWish name={currentWishProduct.name} handleExistedWishClose={handleExistedWishClose}
                        isOpen={isModalOpen} />}
                {registerForWish &&
                    <SignForWish name={currentWishProduct.name} handleRegisterForWishClose={handleRegisterForWishClose}
                        isOpen={isModalOpen} />}
            </section>
        </>)
}


export default Products