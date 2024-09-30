import React, { useEffect, useState } from 'react'
import './accueil.scss'
import data from '../../utils/data'
import { collection, query, orderBy, limit, getDocs, where } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import moment from 'moment/moment';


const Public = () => {
    const [latestPost, setLatestPost] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
  
          const recupererDernierePublication = async () => {
            try {
              // Requête Firestore pour récupérer la dernière publication non archivée
              const q = query(
                  collection(db, "publications"),
                  where("isArchive", "==", false),// Filtrer pour ne pas inclure les publications archivées
                  orderBy("datePublication", "desc"),
                  limit(1)
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
      
            recupererDernierePublication();
          
        }, []);
  
        if (loading) {
          return <div>Chargement...</div>;
        }

        const post = latestPost[0]; // Récupère le premier élément

        if (!post) {
            return <div>Aucune publication trouvée.</div>;
        }


    return (
        <div className="a-wrapper">
            <div className="a-container">
                <div>
                    <h1> {post.titre}</h1>
                    <p dangerouslySetInnerHTML={{ __html: post.description }}/>
                    <span className='flexEnd secondaryText'> Publié {moment(post.date_publication).fromNow()}</span>
                </div>
            </div>
        </div>
    )
}

export default Public
