import React from 'react'
import './archive.scss'
// import archivesData from '../../utils/dataArray'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faUndo } from '@fortawesome/free-solid-svg-icons';


function ArchiveList({archives}) {
    return (
        <div className="archive-list">
            {archives .map((archive, index) => (
                <div key={index} className="archive-item">
                <h3>{archive.titre}</h3>
                <p>{archive.description}</p>
                <small>Date : {archive.date_publication}</small>
                <div className="actions">
                    <button><FontAwesomeIcon icon={faUndo} />Restaurer</button>
                    <button><FontAwesomeIcon icon={faTrash} />Supprimer définitivement</button>
                </div>
                </div>
            ))}
        </div>
    )
}

export default ArchiveList
