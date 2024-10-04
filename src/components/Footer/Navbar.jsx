import React from 'react'
import './footer.scss'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useUserStore } from '../../lib/userStore';
import LogoutButton from '../btn/BtnLogOut';

const Navbar = () => {
     const {currentUser} = useUserStore();

    return (
        <div className="n-wrapper">
            <div className="n-container">
                <div className="logo">
                    <span>Positive Agency</span>
                    <div className="circle"></div>
                </div>
                <div className="navs">
                    
                    {currentUser ? " ": 
                        (<>
                            {/* <Link to="./">Accueil</Link> 
                            <Link to="./login">Mon compte</Link> */}
                        </>
                        )
                    }

                    { currentUser ?
                        (<div className="avatar">
                            <FontAwesomeIcon icon={faUserCircle} size="2x" />
                            <span>{currentUser.username}</span> 
                        </div>)
                        : ""
                    }
                </div>
            </div>
           { 
            currentUser ?
            (<div className="nav-admin">
                <div className="navs-data">
                    <Link to="./admin" className='nav_data'>Admin</Link>
                    <Link to="./ajout" className='nav_data'>Nouvelle publication</Link>
                    <Link to="./archive" className='nav_data'>Liste des archives</Link>
                </div>
                <Link className="link" to="./">
                    <LogoutButton/>
                </Link>
            </div>)
            : ""
            }
        </div>
    )
}

export default Navbar
