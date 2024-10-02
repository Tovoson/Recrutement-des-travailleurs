import React, { useEffect, useState } from 'react'
import './archive.scss'
import ArchiveList from './ArchiveListe';
import ArchiveSearch from './ArchiveRecherche';
import { useUserStore } from '../../lib/userStore';
import { useNavigate } from 'react-router-dom';
import { Loading, Pubvide } from '../modale/Loading';
import { recuperationDonnees } from '../../lib/fonction';

function Archive() {
    const [loadPost, setLoadPost] = useState([]);
    const {currentUser} = useUserStore();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    if (!currentUser) {
        navigate('../login');
    }

    useEffect(() => {

        if (!currentUser) {
          navigate('../login')
          return;
        }
  
          const recupererPubArchive = async () => {
            const isArchive = true
            try {
              
              const posts = await recuperationDonnees(isArchive, currentUser.id);
              setLoadPost(posts);
  
            } catch (error) {
              console.log("Erreur lors de la récupération des publications archivées: ", error);
            } finally {
              setLoading(false);
            }
          };
      
          if (currentUser) {
            recupererPubArchive();
          }
  
        }, [currentUser]);
  
        if (loading) {
          return <Loading/>;
        }

        console.log(currentUser.id)
        console.log("lenth :"+loadPost.length)
        

    return (
        <div className="archive-page">
          <div className="container">
            
              <h1>Archives</h1>
              <div className="form">
                <ArchiveSearch onSearch={() => {}} />           
              </div>
              <div className="cont_vide">
                { loadPost && loadPost.length > 0 
                  ? <ArchiveList loadPost={loadPost} />
                  : (
                    <>
                    <Pubvide/>
                    
                    </>
                    )
                }
              </div>
          </div>
            
        </div>
    )
}

export default Archive
