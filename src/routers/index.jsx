import React, { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import GuestLayout from '../components/Layouts/GuestLayout'
import AppLayout from '../components/Layouts/AppLayout'

// Home
const Home = lazy(() => import('../pages/Home'))

// Authentication
const Login = lazy(() => import('../pages/Auth/Login'))

// Admin
const Dashboard = lazy(() => import('../pages/Admin/Dashboard'))
const Categories = lazy(() => import('../pages/Admin/Categories'))
const EditCategory = lazy(
  () => import('../pages/Admin/Categories/EditCategory')
)
const CreateCategory = lazy(
  () => import('../pages/Admin/Categories/CreateCategory')
)
const Brands = lazy(() => import('../pages/Admin/Brands'))
const CreateBrands = lazy(() => import('../pages/Admin/Brands/CreateBrands'))
const EditBrands = lazy(() => import('../pages/Admin/Brands/EditBrands'))
const Products = lazy(() => import('../pages/Admin/Products'))
const CreateProduct = lazy(
  () => import('../pages/Admin/Products/CreateProduct')
)
const EditProduct = lazy(() => import('../pages/Admin/Products/EditProduct'))
const Users = lazy(() => import('../pages/Admin/Users'))
const CreateUsers = lazy(() => import('../pages/Admin/Users/CreateUsers'))
const Sales = lazy(() => import('../pages/Admin/Sales'))
const Customers = lazy(() => import('../pages/Admin/Customers'))
const EditCustomers = lazy(
  () => import('../pages/Admin/Customers/EditCustomers')
)

// Error
const NotFound = lazy(() => import('../pages/Error/NotFound'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      }
    ]
  },
  {
    path: '/admin',
    element: <AppLayout />,
    children: [
      {
        path: 'dashboard', // Nota: No uses '/' aquí
        element: <Dashboard />
      },
      {
        path: 'categories',
        element: <Categories />
      },
      {
        path: 'categories/:id',
        element: <EditCategory />
      },
      {
        path: 'categories/create',
        element: <CreateCategory />
      },
      {
        path: 'brands',
        element: <Brands />
      },
      {
        path: 'brands/create',
        element: <CreateBrands />
      },
      {
        path: 'brands/:id',
        element: <EditBrands />
      },
      {
        path: 'products',
        element: <Products />
      },
      {
        path: 'products/create',
        element: <CreateProduct />
      },
      {
        path: 'products/:id',
        element: <EditProduct />
      },
      {
        path: 'sales',
        element: <Sales />
      },
      {
        path: 'customers',
        element: <Customers />
      },
      {
        path: 'customers/:id',
        element: <EditCustomers />
      },
      {
        path: 'users',
        element: <Users />
      },
      {
        path: 'users/create',
        element: <CreateUsers />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
])

export default router
