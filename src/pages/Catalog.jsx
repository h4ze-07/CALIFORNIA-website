import {Link, useNavigate} from "react-router-dom"
import { useParams } from 'react-router-dom'; 

import "../scss/catalog.scss"


const Catalog = ({
          isLoading, 
          products, 
          cart, 
          setCart, 
          addToCart, 
          handleFilterBrandChange, 
          handleFilterCategoryChange,
          addToWishes
}) => {

    const navigate = useNavigate();
    const handleCartChange = (product) => {
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
      addToWishes(product)
      navigate('/wishes');
  }
    const { category } = useParams();
    console.log(category)

    const filteredProducts = products ? (
        products.filter((product) => {
          return category ? product.category === category : true;
        })
      ) : [];
      console.log(filteredProducts)

      const handleCategoryChange = (selectedCategory) => {
        // Встановлюємо нову категорію
        handleFilterCategoryChange(selectedCategory);
        // Оновлюємо URL шляху
        navigate(`/catalog/${selectedCategory}`);
    }


    return (
        <section className="catalog_page">
            <div className="container">
                <div className="catalog_text">
                    <h2 className="">Our Products</h2>
                    {/* category */}
                    <div className='filter'>
                        <button onClick={() => handleCategoryChange('smartphones')}>Phone</button>
                        <button onClick={() => handleCategoryChange('laptop')}>Laptop</button>
                        <button onClick={() => handleCategoryChange('watch')}>Watch</button>
                        <button onClick={() => handleCategoryChange('tablet')}>Tablet</button>
                        
                    </div>
                    {/* brand */}
                    <div className='filter'>
                        <button onClick={() => handleFilterBrandChange('apple')}>Apple</button>
                        <button onClick={() => handleFilterBrandChange('samsung')}>Samsung</button>
                        <button onClick={() => handleFilterBrandChange('lenovo')}>Lenovo</button>
                        <button onClick={() => handleFilterBrandChange('huawei')}>Huawei</button>
                    </div>

                </div>
                {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="catalog_box d-flex">
              {category ? ( 
                filteredProducts.map((product) => (
                    <div key={product.id} href={product.href} className="catalog_card">
                    <div className="catalog_card_img">
                      <img src={product.img}/>
                    </div>
                    <div className="catalog_card_text">
                      <h3>{product.name}</h3>
                      <p>$ {product.price}</p>
                      <button className="">
                        <Link to={`/product/${product.id}`}>More info</Link>
                      </button>
                      <button className="" onClick={() => handleCartChange(product)}>
                        Add to cart
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                // Виводьте всі товари
                products.map((product) => (
                  <div key={product.id} href={product.href} className="catalog_card">
                    <div className="catalog_card_img">
                      <img src={product.img}/>
                    </div>
                    <div className="catalog_card_text">
                      <h3>{product.name}</h3>
                      <p>$ {product.price}</p>
                      <button className="">
                        <Link to={`/product/${product.id}`}>More info</Link>
                      </button>
                      <button className="" onClick={() => handleCartChange(product)}>
                        Add to cart
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}


            </div>
        </section>
    )
}

export default Catalog