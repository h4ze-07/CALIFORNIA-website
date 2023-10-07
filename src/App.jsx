import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useState,useEffect } from "react";

import Root from "./components/Root";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Cart from "./pages/Cart";
import OneProductItem from './pages/OneProductItem'

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
        },
        {
          path: '/product/:productId',
          element: <OneProductItem />,
          loader: async ({params}) => {
            console.log(params)
            const res = await fetch(`${DB_URL}/${params.productId}`);
            const data = await res.json();
            console.log(params.productId)
            console.log(data)
            return data
          }
          }
      ]
    }])

  return (
    <RouterProvider router={router} />
  )
}

export default App
