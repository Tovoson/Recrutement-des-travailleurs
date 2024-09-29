import { Link } from 'react-router-dom' 
 
 const Form = ({handleLogin, loading}) =>{
    return (
        <div className="l-container">
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <input required type="email" placeholder='email' name='email'/>
                    <input required type="password" placeholder='password' name='password'/>
                    <button className='.buttons' disabled = {loading}>{ loading ? "Loading" : "Login"}</button>
                    <p>Il y a un erreur</p>
                    <span>Vous n'avez pas encore un compte <br />
                    <Link className = "link" to = "../register">Créer un compte</Link>
                    </span>
                </form>
            </div>
    )
}

export default Form