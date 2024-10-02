import Header from './../Footer/Header'
import Footer from './../Footer/Footer'
import { Outlet } from 'react-router-dom'
import Navbar from '../Footer/Navbar'

const Layout = () =>{
    return( 
      <div>
        <Navbar/>
        <Header/>
        <Outlet/>
        <Footer/>
      </div>
    )
  }

  export default Layout