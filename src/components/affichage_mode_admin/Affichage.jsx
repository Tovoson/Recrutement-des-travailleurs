import { faEdit, faTrash, faArchive, faAdd} from '@fortawesome/free-solid-svg-icons';

const Affichage = ({latestPost}) =>{

    return(<>
        
            <div className='conteneur'>
                <h1> {latestPost.titre}</h1>
                <p> {latestPost.description}</p>
                <span className='flexEnd secondaryText'> {new Date(latestPost.date_publication.seconds * 1000).toLocaleString()}</span>

                <div className="but_cont">
                    <button>
                        <FontAwesomeIcon icon={faEdit} className='bt_edit'/>
                    </button>
                    <button className="buttons">
                        <FontAwesomeIcon icon={faTrash} className='bt_suppr'/>
                    </button>
                    <button className="buttons">
                        <FontAwesomeIcon icon={faArchive} className='bt_archive'/>
                    </button>
                </div>

            </div>
                
    </>)
}

export default Affichage;