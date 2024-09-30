import React, { useEffect, useState } from 'react'
import './_admin.scss'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAdd} from '@fortawesome/free-solid-svg-icons';
import { useUserStore } from '../../lib/userStore';
import { db } from '../../lib/firebase';
import Affichage from './Affichage';
import { collection, query, orderBy,getDocs, where } from 'firebase/firestore';
import LogoutButton from '../btn/BtnLogOut';


const Accueil_admin = () => {
    const {currentUser} = useUserStore();
    const [latestPost, setLatestPost] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {

      if (!currentUser) {
        navigate('../login')
        return;
      }

        const recupererDernierePublication = async () => {
          try {
            // Requête Firestore pour récupérer la dernière publication non archivée
            const q = query(
                collection(db, "publications"),
                where("isArchive", "==", false),// Filtrer pour ne pas inclure les publications archivées
                where("id_user", "==", currentUser.id),
                orderBy("datePublication", "desc"),
                // limit(2)
            );
    
            const querySnapshot = await getDocs(q);
    
            const posts = querySnapshot.docs.map(doc => ({
              id_publication: doc.id,
              ...doc.data(),
          }));

          setLatestPost(posts);

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

    return (
        <div className="ad-wrapper">
            <div className="ad-container">
                <div className="container_button">
                    <Link className = "" to = "../ajout">
                        <button className="but_1">
                            <FontAwesomeIcon icon={faAdd} className='bt_archive'/> Nouvelle publication
                        </button>
                    </Link> 
                    <Link className = "" to = "../archive">
                        archive
                    </Link> 
                  
                  <LogoutButton/>
                </div>
              {latestPost && latestPost.length > 0 ? (
                    <Affichage latestPost={latestPost} />
                ) : (
                  <div className="cont_vide">
                    <h3 className='pub_vide'>Aucune publication disponible</h3>
                  </div>
              )}
            </div>
        </div>
    )
}

export default Accueil_admin