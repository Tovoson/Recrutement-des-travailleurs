import { Link } from 'react-router-dom' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

 
 const Form = ({handleLogin, loading, isError}) =>{
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div className="l-container">
                <div className="titre">
                    <Link className="back" to='../'>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </Link>
                    <h1>Login</h1>
                </div>
                <form onSubmit={handleLogin}>
                    <input required type="email" placeholder='email' name='email'/>
                    <div className="pass_wd">
                        <input 
                            className='_in_psd'
                            required 
                            type={isPasswordVisible ? "text" : "password"} 
                            placeholder='password' 
                            name='password'
                        />
                        <FontAwesomeIcon 
                            icon={isPasswordVisible ? faEyeSlash : faEye} 
                            onClick={togglePasswordVisibility} 
                            className='pswd'                                
                        />
                    </div>
                    <button className='.buttons' disabled = {loading}>{ loading ? "Loading" : "Login"}</button>
                    {isError ? <p>Il y a un erreur</p> : ""}
                    <span>Vous n'avez pas encore un compte <br />
                    <Link className = "link" to = "../register">Créer un compte</Link>
                    </span>
                </form>
            </div>
    )
}

export default Form