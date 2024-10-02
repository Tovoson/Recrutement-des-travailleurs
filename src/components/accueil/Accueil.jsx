import React, { useEffect, useState } from 'react'
import './accueil.scss'
import { collection, query, orderBy, limit, getDocs, where } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import moment from 'moment/moment';
import { Loading, Pubvide } from '../modale/Loading';


const Public = () => {
    const [latestPost, setLatestPost] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
  

          const recupererDernierePublication = async () => {
            try {

              const isArch = false;
              // Requête Firestore pour récupérer la dernière publication non archivée
              const q = query(
                  collection(db, "publications"),
                  where("isArchive", "==", false),// Filtrer pour ne pas inclure les publications archivées
                  orderBy("datePublication", "desc"),
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
          return <Loading/>;
        }

        const post = latestPost[0]; // Récupère le premier élément

        if (!post) {
            return <Pubvide/>;
        }


    return (
      <>
        <div className="p-wrapper">
            <div className="p-container">  
              <div className='titre'> {post.titre}</div>
              <p dangerouslySetInnerHTML={{ __html: post.description }}/>
              <span className='flexEnd secondaryText'> Publié {moment(post.date_publication).fromNow()}</span>
              
            </div>
        </div>
      </>
    )
}

export default Public
