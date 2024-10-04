import React, { useEffect, useState } from 'react'
import './ajout.scss'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { db } from '../../lib/firebase';
import { useUserStore } from '../../lib/userStore';
import { doc, setDoc, collection } from 'firebase/firestore';
import moment from 'moment/moment';
import { useNavigate, useLocation } from 'react-router-dom';
import { modifierPublication } from '../../lib/fonction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loading } from '../modale/Loading';


const Ajout = () => {
    const [value, setValue] = useState('');
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false); // Pour gérer l'état de chargement
    const {currentUser} = useUserStore();
    const [datePublication, setDatePublication] = useState(null);
    const navigate = useNavigate()
    const { state } = useLocation(); // Récupère les données passées via la navigation
    
    const id_publication = state?.id_publication || null;
    const titreActuel = state?.titreActuel || '';
    const descriptionActuelle = state?.descriptionActuelle || '';

    const [nouveauTitre, setNouveauTitre] = useState(titreActuel);
    const [newDescription, setNewDescription] = useState(descriptionActuelle);

    useEffect(() => {

        if (!currentUser) {
          navigate('../login')
          return;
        }
    
    }, [currentUser]);

    const handleSubmit = async (e) =>{

        e.preventDefault()

        if (!title || !value) {
            return;
        }

        setLoading(true);

        const id_user = currentUser.id; // Obtenir l'ID de l'utilisateur connecté
        const datePublication = new Date();

        try {
            
            const docRef = doc(collection(db, "publications"));

            await setDoc(docRef, {
                id_user: id_user, // Utilise l'ID de l'utilisateur
                titre: title,
                description: value,
                datePublication: moment(Date().now).format("YYYY-MM-DD HH:mm:ss"),
                isArchive : false,
              });

            setDatePublication(datePublication);
            toast.success("Publication réussie !");
            setTitle('');
            setValue('');
            navigate('/admin')


        } catch (error) {
            console.error("Erreur lors de l'ajout de la publication : ", error);
        }finally{
            setLoading(false);
        }
    }

    const handleModification = (e) =>{
        e.preventDefault()
        setLoading(true);
        modifierPublication(id_publication, nouveauTitre, newDescription);
        toast.success("Modification réussie !");

        setTimeout(() => {
            navigate('../admin');
        }, 2000);

    
        
    }
  
    if (loading) {
    return <Loading/>;
    }
    return (
        <div className="a-wrapper">
            <div className="a-container">
                {}
                <ToastContainer position="top-right" autoClose={2000}/>
                <div className="title">
                    <input type="text" placeholder='Titre' value={ nouveauTitre ? nouveauTitre : title} onChange={ id_publication ? (e) => setNouveauTitre(e.target.value) : (e) => setTitle(e.target.value)}/>
                </div>
                <div className="content">
                    <ReactQuill className='editeur' theme="snow" value={ nouveauTitre ? newDescription : value} onChange={ id_publication ? setNewDescription : setValue} />
                </div>
                <div className="button">
                    <button onClick={ id_publication ? handleModification : handleSubmit} disabled={loading} >
                        <FontAwesomeIcon icon={ nouveauTitre ? faEdit : faPaperPlane} />
                        <span>
                        {nouveauTitre 
                            ? (loading ? "Modification..." : "Modifier")
                            : (loading ? "Publication..." : "Publier")}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Ajout
