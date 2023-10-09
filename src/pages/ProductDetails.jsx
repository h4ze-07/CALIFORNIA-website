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
        <div>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>Ціна: ${product.price}</p>
          
        </div>
      ) : (
        <p>Завантаження...</p>
      )}
    </div>
  );
}

export default ProductDetails;
