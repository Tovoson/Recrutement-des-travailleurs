import React, { useState } from 'react'
import './archive.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faUndo } from '@fortawesome/free-solid-svg-icons';
import Modale from '../modale/Modale';
import { toast, ToastContainer } from 'react-toastify';
import { restorationArchive, supprimerPublication } from '../../lib/fonction';


function ArchiveList({loadPost}) {

    const [showModal, setShowModal] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);

    const openModal = (id_publication) => {
        setSelectedPostId(id_publication);
        setShowModal(true);
    };
    
    const closeModal = () => {
        setShowModal(false);
        setSelectedPostId(null);
    }

    // Supprimer la publication archivée
    const supprimerPost = async () => {
        supprimerPublication(selectedPostId)
        toast.success("Publication supprimée avec succès");
        closeModal();
    };

    const republier = async (id_publication) => {
        restorationArchive(id_publication)
        toast.success("RePublication avec succès");
    };

    console.log("affichage 2"+ loadPost)

    return (
        <div className="archive-list">
            {loadPost .map((post, index) => (
                <div key={index} className="archive-item">
                <h3>{post.id_publication}</h3>
                <h3>{post.titre}</h3>
                <p dangerouslySetInnerHTML={{ __html: post.description }}/>
                <small>Date : {post.datePublication}</small>
                <div className="actions">
                    <button onClick={() => republier(post.id_publication)}>
                        <FontAwesomeIcon icon={faUndo} />Republier
                    </button>
                    <button onClick={() => openModal(post.id_publication)}>
                        <FontAwesomeIcon icon={faTrash} style={{color : 'red'}}/>Supprimer
                    </button>
                </div>
                </div>
            ))}
            {showModal && 
                <Modale 
                    supprimerPost = {supprimerPost} 
                    closeModal = {closeModal} 
                />
            }
            <ToastContainer position="top-right" autoClose={2000}/>
        </div>
    )
}

export default ArchiveList
