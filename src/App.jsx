import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useState,useEffect } from "react";

import Root from "./components/Root";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Cart from "./pages/Cart";

import {DB_URL} from './firebase';

function App() {

  const [products, setProducts] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
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
                brand: responseData[key]. brand,
              
            });
        }
        setProducts(loadedProducts);    
    }

    fetchProducts().catch((error) => {
        console.log(error);
    });
}, []);


console.log(products)
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          path: '/',
          element: <Home allProducts={products} />
        },
        {
          path: '/catalog',
          element: <Catalog />
        },
        {
          path: '/cart',
          element: <Cart />
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
