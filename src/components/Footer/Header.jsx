import React from 'react'
import './header.scss'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useUserStore } from '../../lib/userStore'
import { auth } from '../../lib/firebase'

const Header = () => {

    const [imageIndex, setImageIndex] = useState((0));
    const {currentUser} = useUserStore();


    const images = [
        'https://cache.magicmaman.com/data/photo/w1000_ci/5y/detester-jouer-avec-enfant.webp',
        'https://cache.magicmaman.com/data/photo/w1000_ci/1ju/poupee-enfant-developpement-empathie.webp',
        'https://www.elle.be/fr/wp-content/uploads/2014/05/kids-1-1-1507x1000.jpg.webp',
        'https://sf1.psychologies.com/wp-content/uploads/psycho/2012/03/Il-s-amuse-a-des-jeux-de-filles-2.png'
      ];

      useEffect(() => {
        const intervalId = setInterval(() => {
            setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // 3000 ms = 3 secondes
    
        // Nettoyer l'intervalle à la fin
        return () => clearInterval(intervalId);
      }, [images.length]);

      const headerStyle = {
        width: '100%',
        height: '200px', // Exemple de hauteur pour le header
        backgroundSize: 'cover',
        marginTop: '2px',
        backgroundPosition: 'center',
        backgroundImage: `url(${images[imageIndex]})`, // Image dynamique
        transition: 'background-image 1s ease-in-out' // Transition pour l'effet smooth
      };

    return (
        <div className="a-header" style={headerStyle}>
            <div className="a-container">
                <div className="circle">
                    <span>PA</span>
                </div>
                <div className="links">
                    <Link className="link" to="./login">Admin</Link>
                    { currentUser ? <Link className="link" to="./">
                    <button onClick={() =>auth.signOut()}>Log out</button>
                    </Link> : ""}
                </div>
            </div>
        </div>
    )
}

export default Header
