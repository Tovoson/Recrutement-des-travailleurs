import React, { useState } from 'react'
import './ajout.scss'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';


const Ajout = () => {
    const [value, setValue] = useState('');
    console.log(value)

    return (
        <div className="a-wrapper">
            <div className="a-container">
                <div className="title">
                    <input type="text" placeholder='Titre'/>
                </div>
                <div className="content">
                    <ReactQuill className='editeur' theme="snow" value={value} onChange={setValue} />
                </div>
                <div className="button">
                    <button><FontAwesomeIcon icon={faPaperPlane} /> <span>Publier</span></button>
                </div>
            </div>
        </div>
    )
}

export default Ajout
