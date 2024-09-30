import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../../lib/firebase';
import './btn.scss'

const LogoutButton = () => {
    return (
        <button onClick={() =>auth.signOut()} className='btn_out'>
            <span>Déconnexion</span><FontAwesomeIcon icon={faSignOutAlt} />
        </button>
    );
};

export default LogoutButton