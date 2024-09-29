import React, { useEffect, useState } from 'react'
import './_admin.scss'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAdd} from '@fortawesome/free-solid-svg-icons';
import { useUserStore } from '../../lib/userStore';
import { auth, db } from '../../lib/firebase';
import Affichage from './Affichage';
import { collection, query, orderBy, limit, getDocs, where } from 'firebase/firestore';


const Accueil_admin = () => {
    const {currentUser} = useUserStore();
    const [latestPost, setLatestPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (!currentUser) {
            setLoading(false); // Si l'utilisateur n'est pas connecté, sortir
            return;
        }

        const recupererDernierePublication = async () => {
          try {
            // Requête Firestore pour récupérer la dernière publication non archivée
            const q = query(
                collection(db, "publications"),
                where("isArchive", "==", false),// Filtrer pour ne pas inclure les publications archivées
                where("id_user", "==", currentUser.id),
                orderBy("date_publication", "desc"), 
                limit(1)
            );
    
            const querySnapshot = await getDocs(q);
    
            if (!querySnapshot.empty) {
              // Récupère la première publication dans le snapshot
              const publication = querySnapshot.docs[0].data();
              setLatestPost(publication); // Met à jour l'état avec la dernière publication
            }
          } catch (error) {
            console.log("Erreur lors de la récupération de la dernière publication : ", error);
          } finally {
            setLoading(false);
          }
        };
    
        if (currentUser) {
            recupererDernierePublication();
        }
      }, [currentUser]);

      if (loading) {
        return <div>Chargement...</div>;
      }
    //   console.log("Dernier publication "+latestPost)

    return (
        <div className="ad-wrapper">
            <div className="ad-container">
                <div className="button_add">
                    <Link className = "" to = "../ajout">
                        <button className="but_1">
                            <FontAwesomeIcon icon={faAdd} className='bt_archive'/> Nouveau publication
                        </button>
                    </Link>
                    <button onClick={() =>auth.signOut()}>Log out</button>
                </div>
                {latestPost ? <Affichage latestPost = {latestPost}/> : "Aucune publication disponible"}
            </div>
        </div>
    )
}

export default Accueil_admin