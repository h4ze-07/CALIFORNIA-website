import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useState,useEffect } from "react";
import { child, push, ref, set } from "firebase/database";
import { db } from './firebase';

import Root from "./components/Root";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Cart from "./pages/Cart";
import ProductDetails from './pages/ProductDetails'

import {DB_URL} from './firebase';
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Wishes from "./pages/Wishes";
import Orders from "./pages/Orders";

function App() {

  const [products, setProducts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterBrand, setFilterBrand] = useState('');
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [wishes, setWishes] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product) => {
    setCart([...cart, product]);
  }
  const addToWishes = (product) => {
    setWishes([...wishes, product]);
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



  const handleWishes = () => {
    const wish = {
        date: new Date().toLocaleString(),
        satus: 'New',
        uid: user ? user.userId : 'unsigned',
        items: wishes
    };
      console.log(wish)
    // 1. create order in DB
    const newWishKey = push(child(ref(db), 'wishes')).key;

    set(ref(db, 'wishes/' + newWishKey), wish)
    .then(() => {
       

        // 3. clear Cart
        // dispatch(cartActions.clear());
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
    });
    
    // 2. create order in users/:id.json
    if (user) { 
      set(ref(db, 'users/' + user.userId + '/wishes/' + newWishKey), wish)
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
    }
  }



  const handleOrders = () => {
    const orderToDb = {
        date: new Date().toLocaleString(),
        satus: 'New',
        uid: user ? user.userId : 'unsigned',
        items: cart
    };
    // 1. create order in DB
    const newOrderKey = push(child(ref(db), 'orders')).key;
    set(ref(db, 'orders/' + newOrderKey), orderToDb)
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
    });
    
    if (user) {
      set(ref(db, 'users/' + user.userId + '/orders/' + newOrderKey), orderToDb)
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
      });
    }
  }

  useEffect(() => {
    scrollToTop()
  }, [])

  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  // const handleCartToDb = () => {
  //   const updatingCart = {
  //     date: new Date().toLocaleString(),
  //     satus: 'Updating',
  //     uid: user.userId,
  //     items: cart,
  //   };

  //   set(ref(db, 'users/' + user.userId + '/cart/'), updatingCart)
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     console.log(errorMessage);
  //   });
  // }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root cartCounter={cart.length} />,
      children: [
        {
          path: '/',
          element: <Home handleWishes={handleWishes} addToWishes={addToWishes} allProducts={products} cart={cart} setCart={setCart} addToCart={addToCart} scrollToTop={scrollToTop}/>
        },
        {
          path: '/catalog',
          element: <Catalog 
          isLoading={isLoading} 
          handleFilterBrandChange={handleFilterBrandChange} 
          handleFilterCategoryChange={handleFilterCategoryChange} 
          products={products}
          cart={cart} 
          addToCart={addToCart}
          setCart={setCart}
          addToWishes={addToWishes}
          scrollToTop={scrollToTop}
          />
        },
        {
          path: '/catalog/:category',
          element: <Catalog
          isLoading={isLoading}
          handleFilterCategoryChange={handleFilterCategoryChange} 
          handleFilterBrandChange={handleFilterBrandChange}
          products={products}
          cart={cart} 
          addToCart={addToCart}
          setCart={setCart}
          scrollToTop={scrollToTop}
          />
        },
        {
          path: '/cart',
          element: <Cart cart={cart} setCart={setCart} handleOrders={handleOrders} scrollToTop={scrollToTop}/>
        },
        {
          path: '/wishes',
          element: <Wishes user={user} wishes={wishes} setWishes={setWishes}/>
        },
        {
          path: '/login',
          element: <Profile setUser={setUser} user={user} wishes={wishes}/>
        },
        {
          path: '/product/:productId',
          element: <ProductDetails cart={cart} addToCart={addToCart} setCart={setCart} scrollToTop={scrollToTop}/>,
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
          },
          {
            path: '/orders',
            element: <Orders DB_URL={DB_URL} user={user} />
          },
          {
            path: '*',
            element: <NotFound />
          }
      ]
    }])

  return (
    <RouterProvider router={router} />
  )
}

export default App
