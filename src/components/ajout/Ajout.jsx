import React, { useState } from 'react'
import './ajout.scss'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { db } from '../../lib/firebase';
import { useUserStore } from '../../lib/userStore';
import { doc, setDoc, collection } from 'firebase/firestore';
import dayjs from 'dayjs'; // Import dayjs
import relativeTime from 'dayjs/plugin/relativeTime'; // Import du plugin relative time
import 'dayjs/locale/fr';

    dayjs.extend(relativeTime);
    dayjs.locale('fr');

const Ajout = () => {
    const [value, setValue] = useState('');
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false); // Pour gérer l'état de chargement
    const [error, setError] = useState(null);
    const {currentUser} = useUserStore();
    const [datePublication, setDatePublication] = useState(null);
    


    const handleSubmit = async (e) =>{
        e.preventDefault()

        if (!title || !value) {
            setError("Le titre et la description ne peuvent pas être vides.");
            return;
        }

        setLoading(true);
        setError(null);

        const id_user = currentUser.id; // Obtenir l'ID de l'utilisateur connecté
        const datePublication = new Date();

        try {
            
            const docRef = doc(collection(db, "publications"));

            await setDoc(docRef, {
                id_user: currentUser.id, // Utilise l'ID de l'utilisateur
                titre: title,
                description: value,
                datePublication: new Date(),
                isArchive : false,
              });

            console.log(title)
            console.log(value)
            console.log(datePublication)
            console.log("idUser : "+ id_user)

            setDatePublication(datePublication);

            // Réinitialiser les champs après l'ajout
            setTitle('');
            setValue('');
            console.log("Publication ajoutée avec succès !");

        } catch (error) {
            console.error("Erreur lors de l'ajout de la publication : ", error);
            setError("Une erreur est survenue. Veuillez réessayer.");
        }finally{
            setLoading(false);
        }
    }

    return (
        <div className="a-wrapper">
            <div className="a-container">
                <div className="title">
                    <input type="text" placeholder='Titre' value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className="content">
                    <ReactQuill className='editeur' theme="snow" value={value} onChange={setValue} />
                </div>
                <div className="button">
                    <button onClick={handleSubmit} disabled={loading} >
                        <FontAwesomeIcon icon={faPaperPlane} />
                        <span>
                        {loading ? "Publication..." : "Publier"}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Ajout
