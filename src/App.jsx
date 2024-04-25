import "./App.css";
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import Root from "./routs/Root";
import Cart from "./pages/cart/Cart";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Products from "./pages/products/Products";
import NotFound from "./components/notFound/NotFound";
import About from "./components/about/About";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductDetailes from "./pages/productdetailes/ProductDetailes";
import Category from "./pages/category/Category";
import UserContextProvider, { UserContext } from "./context/User";
import ProtectedRoutes from "./auth/ProtectedRoutes";
import SendCode from "./pages/login/SendCode";
import ForgetPassword from "./pages/login/ForgetPassword";
import Profile from "./components/myProfile/Profile";
import Order from "./components/myProfile/Order";
import Info from "./components/myProfile/Info";
import Contact from './components/myProfile/Contact';
import CreatOrder from "./pages/cart/CreatOrder";
import CartContextProvider from "./context/CountCart";

const router = createBrowserRouter(  [
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
        children: [
          {
            path: "/profile/contact",
            element: <Contact />,
          },
          {
            path: "/profile",
            element: <Info />,
          },
          {
            path: "/profile/order",
            element: <Order />,
          },

        ]
      },
      
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/createorder",
        element: <CreatOrder />,
      },
      {
        path: "/products",
        element: <Products />
        
      },
      {
        path: "/category/:id",
        element:<ProtectedRoutes>
        <Category />
        </ProtectedRoutes>
      
      },
      {
        path: "/productdetailes/:id",
        element: <ProtectedRoutes>
        <ProductDetailes />

        </ProtectedRoutes>
          
      },
      {
        path: "/cart",
        element: <Cart />
         
      },
      {
        path: "/sendcode",
        element: <SendCode /> 

         
      },
      {
        path: "/forgetpassword",
        element: <ForgetPassword /> 

         
      },
      
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: 
            <Register />
       
      },
      {
        path: "/productdetailes/:id",
        element: <ProductDetailes />,
      },
      {
        path: "/category/:id",
        element: <Category />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
function App() {
  
  return (
    <>
      <UserContextProvider>
<CartContextProvider>
<RouterProvider router={router} />

</CartContextProvider>
      </UserContextProvider>
      

      <ToastContainer />

    </>
  );
}

export default App;
