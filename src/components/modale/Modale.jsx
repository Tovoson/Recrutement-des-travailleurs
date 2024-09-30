import React from 'react'
import './modale.scss'


const Modale = ({supprimerPost, closeModal}) => {

    return (
        <> 
            <div className="modal">
            <div className="modal-content">
                <h2>Confirmer la suppression</h2>
                <p>Êtes-vous sûr de vouloir supprimer cette publication ?</p>
                <div className="modal-buttons">
                <button onClick={supprimerPost}>Confirmer</button>
                <button onClick={closeModal}>Annuler</button>
                </div>
            </div>
            </div>
            
        </> 
    )
}

export default Modale
