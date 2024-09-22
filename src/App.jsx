import { useState } from 'react'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import './App.scss'
import Accueil from './components/accueil/Accueil'
import Logins from './components/login/Login';
import Ajout from './components/ajout/Ajout';
import Layout from './components/layout/Layout';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          path:"/",
          element: <Accueil/>
        },
        {
          path:"/ajout",
          element: <Ajout/>
        },

      ]
    },
    {
      path: "/login",
      element: <Logins/>,
    },
    {
      path: "/ajout",
      element: <Ajout/>,
    },
    {
      path: "/login",
      element: <Logins/>,
    },
  ]);

  return (
    <div className='App'>
      <div className="container">
        <RouterProvider router = {router}/>
      </div>
    </div>
  )
}
   


export default App
