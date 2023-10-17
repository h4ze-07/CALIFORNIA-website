import Banner from "../components/Banner.jsx";
import Products from '../components/Products'
import BestSection from '../components/BestSection'
import Ideas from '../components/Ideas'
import Else from '../components/Else'
import ShopSection from "../components/ShopSection.jsx";
import { useEffect } from "react";

const Home = ({
    allProducts, 
    scrollToTop, 
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
    currentWishProduct}) => {

    useEffect(() => {
        scrollToTop()
    }, [])

    return (
        <>
            <Banner/>
            <ShopSection/>
            <Products swiperProducts={allProducts}
                      setCart={setCart} cart={cart} addToCart={addToCart} registerForWish={registerForWish} existedWish={existedWish} successWish={successWish}
                      handleRegisterForWishClose={handleRegisterForWishClose} handleExistedWishClose={handleExistedWishClose}
                      handleSuccessWishClose={handleSuccessWishClose} handleWishes={handleWishes}
                      currentWishProduct={currentWishProduct}/>
            <BestSection/>
            <Ideas/>
            <Else/>
        </>
    )
}

export default Home