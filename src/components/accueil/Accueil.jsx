import React from 'react'
import './accueil.scss'
import data from '../../utils/data'

const Public = () => {
    return (
        <div className="a-wrapper">
            <div className="a-container">
                {
                    data.map((item) =>(
                        <div key={item.id}>
                            <h1> {item.titre}</h1>
                            <p> {item.description}</p>
                            <span className='flexEnd secondaryText'> {item.date_publication}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Public
