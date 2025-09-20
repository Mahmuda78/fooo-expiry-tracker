import React from 'react';
import { createBrowserRouter } from 'react-router';
import MainLayout from '../Layout/mainLayout';
import Register from '../Pages/register';

import Login from '../Pages/Login';
import FridgeTry from '../Pages/FridgeTry';
import Home from '../Componants/Home';
import AddFood from '../Componants/AddFood';
import Fridge from '../Componants/Fridge';
import FoodDetails from '../Pages/FoodDetails';

import MyItems from '../Pages/MyItems';


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
      },
      {
        path:'fridge',
       element:<Fridge></Fridge>,
       loader:()=>fetch('http://localhost:5000/foods')
        
      },
      {
        path:'/food/:id',
        loader:({params})=>fetch(`http://localhost:5000/foods/${params.id}`),
        element:<FoodDetails></FoodDetails>
        
      },
      {
        path:'my-items',
        element:<MyItems></MyItems>
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
  },
 
]);

export default Router;
