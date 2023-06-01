import { Navigate, createBrowserRouter } from "react-router-dom";
import UserLayout from "./layouts/UserLayout"; 
import GuestLayout from "./layouts/GuestLayout";
import Login from "./views/auth/login";
import NotFound from './views/NotFound.jsx'
import Products from './views/products.jsx'
import ProductForm from "./components/ProductForm";

console.log('connected user',localStorage.getItem('ACCESS_TOKEN'))

const routes = [
    {
        path: '/',
        element: <UserLayout />,
        children: [
             {
                path: '/',
                element: <Navigate to={'products'} />
            },
            {            
                path: 'products',
                element: <Products />
            },
            {
                path: 'products/new',
                element: <ProductForm key="newProduct" />
            },
            {
                path: 'products/:slug',
                element: <ProductForm key="updateProduct"/>
            }
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
              path: '/login',
              element: <Login/>
            }
          ]
    },
    {
        path: '*', 
        element: <NotFound />
    }
]

const router = createBrowserRouter(routes)

export default router;