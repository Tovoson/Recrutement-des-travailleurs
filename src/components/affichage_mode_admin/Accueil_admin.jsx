import React from 'react'
import data from '../../utils/data'
import './_admin.scss'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faArchive, faAdd} from '@fortawesome/free-solid-svg-icons';


const Accueil_admin = () => {
    return (
        <div className="ad-wrapper">
            <div className="ad-container">
                <div className="button_add">
                    <Link className = "" to = "../ajout">
                        <button className="but_1">
                            <FontAwesomeIcon icon={faAdd} className='bt_archive'/> Nouveau publication
                        </button>
                    </Link>
                </div>
                {
                    data.map((item) =>(
                        <div key={item.id} className='conteneur'>
                            <h1> {item.titre}</h1>
                            <p> {item.description}</p>
                            <span className='flexEnd secondaryText'> {item.date_publication}</span>

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
                    ))
                }
                
            </div>
        </div>
    )
}

export default Accueil_admin