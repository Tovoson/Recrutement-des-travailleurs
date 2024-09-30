import { faEdit, faTrash, faArchive} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment/moment';
import './affichage.scss'
import Modale from '../modale/Modale';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { archivagePublication, supprimerPublication } from '../../lib/fonction';
import { toast, ToastContainer } from 'react-toastify';


const Affichage = ({latestPost}) =>{
    const [showModal, setShowModal] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const navigate = useNavigate()

    const openModal = (id_publication) => {
        setSelectedPostId(id_publication);
        setShowModal(true);
    };
    
    const closeModal = () => {
        setShowModal(false);
        setSelectedPostId(null);
    }

    const handleEditClick = (id_publication, titre, description) => {
        // Rediriger vers la page d'édition et passer les données via `state`
        navigate(`../ajout`, { 
            state: { 
                id_publication: id_publication,
                titreActuel: titre,
                descriptionActuelle: description
            }
        });

    };

    // Supprimer la publication
    const supprimerPost = async () => {
        supprimerPublication(selectedPostId)
        toast.success("Publication supprimée avec succès");
        closeModal();
    };

    const handleArchive = (id_publication) => {
        // navigate('../archive')
        archivagePublication(id_publication);
        toast.success("Publication archivée avec succès")  
    } 

    return(<>
        
            {latestPost.map((Post) =>(
                <div className='conteneur' key={Post.id_publication}>
                <ToastContainer position="top-right" autoClose={2000}/>
                <h2> {Post.titre}</h2>
                <p dangerouslySetInnerHTML={{ __html: Post.description }}/>
                <span className='flexEnd secondaryText'> Publié {moment(Post.date_publication).fromNow()}</span>

                <div className="but_cont" >
                    <button onClick={() => handleEditClick(Post.id_publication, Post.titre, Post.description)}>
                        <FontAwesomeIcon icon={faEdit} className='bt_edit' style={{color : "green"}}/> Modifier
                    </button>
                    <button className="buttons" onClick={() => openModal(Post.id_publication)}>
                        <FontAwesomeIcon icon={faTrash} className='bt_suppr'style={{color : "red"}}/> Supprimer
                    </button>
                    <button className="buttons" onClick={() => handleArchive(Post.id_publication)}>
                        <FontAwesomeIcon icon={faArchive} className='bt_archive'/> Archiver
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
                
    </>)
}

export default Affichage;