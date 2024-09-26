import { useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.scss'
import Accueil from './components/accueil/Accueil'
import Logins from './components/login/Login';
import Ajout from './components/ajout/Ajout';
import Layout from './components/layout/Layout';
import Accueil_admin from './components/affichage_mode_admin/Accueil_admin';
import Archive_page from './components/archive/Archive_page';

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
          path:"/admin",
          element: <Accueil_admin/>
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
    {
      path: "/archive",
      element: <Archive_page/>,
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
