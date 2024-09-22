import React from 'react'
import './footer.scss'

const Footer = () => {
    return (
        <div className="f-wrapper">
            <div className="f-container">
                <div className="contact">
                    <span className='primaryText'>Contactez nous:</span><br />
                    <span className='secondaryText'>Adresse : 123 rue de france</span>
                    <span className='secondaryText'>Téléphone : +2322333</span>
                    <span className='secondaryText'>Email : ...@gmail.com</span>
                    
                </div>
                <div className="img-lien">
                    <span className='primaryText'>Suivez-nous</span>
                    <div className="img-log">
                        <img src="./fb.png" alt="" />
                        <img src="./tw.png" alt="" />
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
