import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useState,useEffect } from "react";
import { child, push, ref, set } from "firebase/database";
import { db } from './firebase';
import {auth} from './firebase';

import Root from "./components/Root";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Cart from "./pages/Cart";
import ProductDetails from './pages/ProductDetails'

import {DB_URL} from './firebase';
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Wishes from "./components/Wishes.jsx";
import Orders from "./components/Orders.jsx";

function App() {

  const [products, setProducts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterBrand, setFilterBrand] = useState('');
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [user, setUser] = useState(null);

  const [registerForWish, setRegisterForWish] = useState(false);
  const [existedWish, setExistedWish] = useState(false);
  const [successWish, setSuccessWish] = useState(false);
  const [currentWishProduct, setCurrentWishProduct] = useState(null);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product) => {
    setCart([...cart, product]);
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
        setProducts(loadedProducts);
        setIsLoading(false);
      } catch (error) {
        console.error('Помилка завантаження даних:', error);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getUserFromDB = async (userId) => {
    const sendRequest = async () => {
        const response = await fetch(DB_URL + '/users/' + userId + '.json');

        if (!response.ok) {
            throw new Error('Cant get user from DB');
        }

        const data = await response.json();
        return data;
    }

    try {
        const userFromDB = await sendRequest();
        console.log(userFromDB);
        setUser({
            name: userFromDB.name,
            email: userFromDB.email,
            userId: userFromDB.uid,
            wishes: userFromDB.wishes || []
        });
    } catch (error) {
        console.log(error);
    }
}

useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
        if (authUser) {
            console.log(authUser);
            getUserFromDB(authUser.uid); // Передача userId
            console.log(authUser.uid)
        } else {
            console.log('no user');
        }
    });
}, []);


const handleSignOut = async () => {
  try {
    await auth.signOut();
    setUser(null);
  } catch (error) {
    console.error('Помилка виходу з облікового запису:', error);
  }
};


  ///////////////////////   WISHES    ///////////////////////

  const handleWishes = (product, id) => {
    if (id) {
      product = {...product, id: id}
      console.log(product);
    } else {
      product = product;
      console.log(product);
    }

    setCurrentWishProduct(product);

    if (user) {

      let testWish = [];

      const fetchWishes =  async () => {
        const response = await fetch(`${DB_URL}/users/${user.userId}/wishes.json`)
        const wishesData = await response.json()
        let loadedWishes = [];
        for (const key in wishesData) {
            loadedWishes.push(wishesData[key]);
        }
        testWish = loadedWishes;
        for (let i in testWish) {
          console.log(testWish[i].product.id);
          if (testWish[i].product.id === product.id) {
            setExistedWish(true)
            return false;
          }
        }
  
        const wish = {
          date: new Date().toLocaleString(),
          uid: user.userId,
          product: product
        }
  
        set(ref(db, 'users/' + user.userId + '/wishes/' + product.id), wish)
        .then(() => {
            setSuccessWish(true)
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
        });
      }
      fetchWishes()
    } else {
      setRegisterForWish(true);
    }
  }

  const handleSuccessWishClose = () => {
    setSuccessWish(false);
  }

  const handleExistedWishClose = () => {
    setExistedWish(false);
  }

  const handleRegisterForWishClose = () => {
    setRegisterForWish(false);
  }

  
  ///////////////////////   ORDERS    ///////////////////////


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


  ///////////////////////   SCROLL    ///////////////////////

  useEffect(() => {
    scrollToTop()
  }, [])

  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root cartCounter={cart.length} />,
      children: [
        {
          path: '/',
          element: <Home allProducts={products} cart={cart} setCart={setCart} addToCart={addToCart} scrollToTop={scrollToTop} registerForWish={registerForWish} existedWish={existedWish} successWish={successWish}
          handleRegisterForWishClose={handleRegisterForWishClose} handleExistedWishClose={handleExistedWishClose}
          handleSuccessWishClose={handleSuccessWishClose} handleWishes={handleWishes}
          currentWishProduct={currentWishProduct}/>
        },
        {
          path: '/catalog',
          element: <Catalog 
          isLoading={isLoading} 
          cart={cart} 
          addToCart={addToCart}
          setCart={setCart}
          scrollToTop={scrollToTop}
          registerForWish={registerForWish} existedWish={existedWish} successWish={successWish}
          handleRegisterForWishClose={handleRegisterForWishClose} handleExistedWishClose={handleExistedWishClose}
          handleSuccessWishClose={handleSuccessWishClose} handleWishes={handleWishes}
          currentWishProduct={currentWishProduct}
          />
        },
        {
          path: '/catalog/:category',
          element: <Catalog
          isLoading={isLoading}
          cart={cart} 
          addToCart={addToCart}
          setCart={setCart}
          scrollToTop={scrollToTop}
          registerForWish={registerForWish} existedWish={existedWish} successWish={successWish}
          handleRegisterForWishClose={handleRegisterForWishClose} handleExistedWishClose={handleExistedWishClose}
          handleSuccessWishClose={handleSuccessWishClose} handleWishes={handleWishes}
          currentWishProduct={currentWishProduct}
          />
        },
        {
          path: '/cart',
          element: <Cart cart={cart} setCart={setCart} handleOrders={handleOrders} scrollToTop={scrollToTop}/>
        },
        {
          path: '/wishes',
          element: <Wishes user={user} />
        },
        {
          path: '/login',
          element: <Profile handleSignOut={handleSignOut} setUser={setUser} user={user} scrollToTop={scrollToTop} />
        },
        {
          path: '/product/:productId',
          element: <ProductDetails cart={cart} addToCart={addToCart} setCart={setCart} scrollToTop={scrollToTop}
          registerForWish={registerForWish} existedWish={existedWish} successWish={successWish}
          handleRegisterForWishClose={handleRegisterForWishClose} handleExistedWishClose={handleExistedWishClose}
          handleSuccessWishClose={handleSuccessWishClose} handleWishes={handleWishes}
          />,
          },
          {
            path: '/orders',
            element: <Orders user={user} />
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
