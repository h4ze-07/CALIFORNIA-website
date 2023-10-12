import '../scss/product_details.scss'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DB_URL } from '../firebase';

function ProductDetails({addToCart}) {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

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

  const handleAddToCart = (product) => {
    addToCart(product);
    navigate('/cart');
  }

  return (
    <div className='product_description'>
      
      {product ? (
        <div className='description_card container d-flex'>
          <div className='description_img'>
            <img src={product.img} alt="img" />
          </div>
          <div className='description_text'>
            <h2 className=''>{product.name}</h2>
            <p className=''>{product.description}</p>
            <h3 className=''>Price: $ {product.price}</h3>
            <button onClick={() => {handleAddToCart(product)}}>Add to cart</button>
          </div>
        </div>
      ) : (
        <p className=''>Loading...</p>
      )}
    </div>
  );
}

export default ProductDetails;
