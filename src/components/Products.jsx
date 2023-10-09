import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { BsSuitHeart } from "react-icons/bs";

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import '../scss/products.scss'

import { FreeMode, Pagination } from 'swiper/modules';

const Products = ({swiperProducts, addToCart}) => {

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

  const handleCartButtonClick = (product) => {
    addToCart(product)
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
         pagination={{
           clickable: true,
         }}
         modules={[FreeMode, Pagination]}
         className="mySwiper"
         >
         <div className='items_box d-flex between'>
           <div className='box d-flex between'>
            {swiperProducts.length === 0 && <p>No any products</p>} 
                {swiperProducts.length > 0 && swiperProducts.map((product, id)=>( 
               <SwiperSlide key={id}>
               <article> 
                  <img src={product.img} alt="" /> 
                <a href="#">{product.name}</a> 
                 <p>{product.description}</p> 
              <h4> ${product.price}</h4> 
              <button onClick={() => handleCartButtonClick(product)}>
                Buy
              </button>
              <button> <BsSuitHeart/> </button> 
              <button >
                 
              <Link to={`/product/${product.id}`}>More info</Link>
                
                </button>
               </article> 
               </SwiperSlide>
             ))} 
          </div> 
        </div> 
        </Swiper>
      </div> 
    </section>
 </> )
}



export default Products