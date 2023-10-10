import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useState,useEffect } from "react";

import Root from "./components/Root";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Cart from "./pages/Cart";
import ProductDetails from './pages/ProductDetails'

import {DB_URL} from './firebase';

function App() {

  const [products, setProducts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterBrand, setFilterBrand] = useState('');
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product])
  }

  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${DB_URL}/products.json`);

        if (!response.ok) {
          throw new Error('Something went wrong!');
        }

        const responseData = await response.json();

        const loadedProducts = [];
        for (const key in responseData) {
          loadedProducts.push({
            id: key,
            name: responseData[key].name,
            price: responseData[key].price,
            description: responseData[key].description,
            img: responseData[key].img,
            category: responseData[key].category,
            brand: responseData[key].brand,
          });
        }

        // Фільтрація за категорією і/або брендом
        let filteredProducts = loadedProducts;

        if (filterCategory) {
          filteredProducts = filteredProducts.filter(
            (product) => product.category === filterCategory
          );
        }

        if (filterBrand) {
          filteredProducts = filteredProducts.filter(
            (product) => product.brand === filterBrand
          );
        }

        setProducts(filteredProducts);
        setIsLoading(false);
      } catch (error) {
        console.error('Помилка завантаження даних:', error);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [filterCategory, filterBrand]);

  const handleFilterCategoryChange = (category) => {
    setFilterCategory(category);
  };

  const handleFilterBrandChange = (brand) => {
    setFilterBrand(brand);
  };


  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          path: '/',
          element: <Home allProducts={products} addToCart={addToCart}/>
        },
        {
          path: '/catalog',
          element: <Catalog 
          isLoading={isLoading} 
          handleFilterBrandChange={handleFilterBrandChange} 
          handleFilterCategoryChange={handleFilterCategoryChange} 
          products={products} 
          addToCart={addToCart}/>
        },
        {
          path: '/cart',
          element: <Cart cart={cart} setCart={setCart} />
        },
        {
          path: '/product/:productId',
          element: <ProductDetails addToCart={addToCart} />,
          // loader: async ({params}) => {
          //   const {productId} = params;
          //   console.log(params)
          //   try {
          //     const res = await fetch(`${DB_URL}/products/${productId}`);

          //     if(!res.ok){
          //       throw new Error ('Failed to fetch product data')
          //     }

          //     const productData = await res.json();
          //     return productData;
          //   } catch (error) {
          //     console.error('Error fetching product data', error)
          //   }
          // }
          }
      ]
    }])

  return (
    <RouterProvider router={router} />
  )
}

export default App
