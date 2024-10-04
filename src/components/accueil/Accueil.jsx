import React, { useEffect, useState } from 'react'
import './accueil.scss'
import { collection, query, orderBy, limit, getDocs, where } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import moment from 'moment/moment';
import { Loading, Pubvide } from '../modale/Loading';
import data from '../../utils/data';


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

        // if (!post) {
        //     return <Pubvide/>;
        // }


    return (
      <>
        <div className="p-wrapper">
          <div className="cont">

              <div className="p-container">  
              <div className='titre'></div>
              <p>Nous sommes une agence spécialisée dans le recrutement de jeunes souhaitant travailler comme Au Pair à l'étranger, notamment en Europe (Suisse, Allemagne, Luxembourg, Autriche, Belgique, Liechtenstein)."
              Notre mission est d'aider les familles d'accueil à trouver une Au Pair de confiance pour les accompagner dans leur quotidien, tout en aidant les jeunes Au Pair à trouver des familles bienveillantes et accueillantes
              Nous offrons également des services pour aider les jeunes à trouver des emplois dans le domaine  travail à  volontaires ainsi que des formations professionnelles. Nous collaborons avec de nombreuses agences et entreprises à travers l'Europe.
              </p>
              {/* <span className='flexEnd secondaryText'> Publié {moment(data.date_publication).fromNow()}</span> */}
              
            </div>
            {/* 
            {
              !post ? <Pubvide/> : ''
            } */}
          </div>
        </div>
      </>
    )
}

export default Public
