import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Cart from "./pages/Cart";

function App() {



  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          path: '/',
          element: <Home />
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
