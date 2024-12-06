import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import styles
import Home from './pages/Home';
import Products from './components/Products';
import Cart from './components/Cart';
import Nopage from './pages/Nopage';
import Layout from './components/Layout';
import ProductDetail from './components/ProductDetail';
import Signup from './components/ragistration/Signup';
import Login from './components/ragistration/Login';
import Dashboard from './components/Dashboard';
import Admindashboard from './pages/Admin/Admindashboard';
import AddProduct from './pages/Admin/AddProduct';
import UpdateProduct from './pages/Admin/UpdateProduct';
import ProtectedRouteForUser from '../src/ProtectedRoute/ProtectedRouteForUser'
import ProtectedRouteForAdmin from '../src/ProtectedRoute/ProtectedRouteForAdmin'
import CategoryPage from './pages/CategoryPage/CategoryPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/Products', element: <Products /> },
      { path: '/ProductDetail/:id', element: <ProductDetail /> },
      { path: '/Cart', element: <Cart /> },
      { path: '/signup', element: <Signup /> },
      { path: '/login', element: <Login /> },
      { path: '/category/:categoryname', element: <CategoryPage /> },
      {
        path: '/userdashboard', element: <ProtectedRouteForUser>
          <Dashboard />
        </ProtectedRouteForUser>
      },
      {
        path: '/admindashboard', element: <ProtectedRouteForAdmin>
          <Admindashboard />
        </ProtectedRouteForAdmin>
      },
      {
        path: '/addproduct', element: <ProtectedRouteForAdmin>
          <AddProduct />
        </ProtectedRouteForAdmin>
      },
      {
        path: '/updateproduct/:id', element: <ProtectedRouteForAdmin>
          <UpdateProduct />
        </ProtectedRouteForAdmin>
      },
      { path: '/*', element: <Nopage /> }
    ]
  }
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} />
    </>
  );
};

export default App;
