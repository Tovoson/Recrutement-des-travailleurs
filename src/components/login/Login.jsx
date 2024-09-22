import React from 'react'
import './login.scss'
import { Link } from 'react-router-dom'

const Logins = () => {
    return (
            <div className="l-container">
                <h1>Login</h1>
                <form >
                    <input required type="text" placeholder='username'/>
                    <input required type="password" placeholder='password'/>
                    <button className='.buttons'>Login</button>
                    <p>Il y a un erreur</p>
                    <span>Vous n'avez pas encore un compte <br />
                    <Link className = "link" to = "">Créer un compte</Link>
                    </span>
                </form>
            </div>
        
    )
}

export default Logins
