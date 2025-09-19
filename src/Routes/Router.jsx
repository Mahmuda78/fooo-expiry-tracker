import React from 'react';
import { createBrowserRouter } from 'react-router';
import MainLayout from '../Layout/mainLayout';
import Register from '../Pages/register';

import Login from '../Pages/Login';
import Home from '../Componants/Home';
import AddFood from '../Componants/AddFood';

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children:[
      {index:true,
        element:<Home></Home>
      },
      {
        path:'/addFood',
        element:<AddFood></AddFood>
      }
    ]
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  }
]);

export default Router;
