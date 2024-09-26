import React, { useState } from 'react'
import './archive.scss'
import archivesData from '../../utils/dataArray'
import ArchiveList from './ArchiveListe';
import ArchiveSearch from './ArchiveRecherche';
import InfiniteScroll from 'react-infinite-scroll-component';

function Archive() {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentItems, setCurrentItems] = useState(archivesData.slice(0, 5));
    const [hasMore, setHasMore] = useState(true);

     // Charger plus d'éléments quand on atteint le bas de la page
    const fetchMoreData = () => {
        if (currentItems.length >= archivesData.length) {
        setHasMore(false); // Stopper quand il n'y a plus d'éléments
        return;
        }

        // Ajouter 10 éléments de plus
        setTimeout(() => {
            setCurrentItems(currentItems.concat(archivesData.slice(currentItems.length, currentItems.length + 10)));
        }, 2000); // Petite pause pour simuler le chargement
    }

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const searchedArchives = archivesData.filter(item =>
          item.title.toLowerCase().includes(term) || item.description.toLowerCase().includes(term)
        );
        setFilteredArchives(searchedArchives);
      };

    return (
        <div className="archive-page">
            <h1>Archives</h1>
            
            {/* Recherche */}
            <ArchiveSearch onSearch={handleSearch} />
            
            {/* Liste des archives avec scroll infini */}
            <InfiniteScroll
                dataLength={currentItems.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<h4>Chargement...</h4>}
                endMessage={<p style={{ textAlign: 'center' }}>C'est tout pour l'instant !</p>}
            >
                <ArchiveList archives={currentItems} />
            </InfiniteScroll>
        </div>
    )
}

export default Archive
