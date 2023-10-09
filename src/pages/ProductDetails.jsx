import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DB_URL } from '../firebase';

function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`${DB_URL}/products/${productId}.json`); 
        if (!response.ok) {
          throw new Error('Не вдалось отримати дані продукту');
        }
        const data = await response.json();
        setProduct(data); 
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductDetails(); 

   
  }, [productId]); 

  return (
    <div style={{
      marginTop: '100px',
      fontSize: '25px'
    }}>
      
      {product ? (
        <div className="">
          <div className=''>
            <img src={product.img} alt="img" />
          </div>
          <div className=''>
            <h3 className="">{product.name}</h3>
            <p className="">{product.description}</p>
            <p className="">Ціна: ${product.price}</p>
            <button>Add to cart</button>
          </div>
        </div>
      ) : (
        <p className=''>Завантаження...</p>
      )}
    </div>
  );
}

export default ProductDetails;
