import React, { useState } from 'react'
import './login.scss'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../lib/firebase'
import { doc, setDoc } from "firebase/firestore"; 

const Register = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) =>{
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const {username, email, password} = Object.fromEntries(formData);
        
        try {
            
            const res = await createUserWithEmailAndPassword(auth, email, password)
            
            await setDoc(doc(db, "users", res.user.uid), {
                username,
                password,
                id: res.user.uid
            });

            console.log("Tout passe très bien")
            navigate('../login');

        } catch (error) {
            console.log(error + "Il y a un erreur")
        }finally{
            setLoading(false);
        }
    }

    return (
            <div className="l-container">
                <h1>Register</h1>
                <form onSubmit={handleRegister}>
                    <input required type="text" placeholder='username'name='username'/>
                    <input required type="email" placeholder='email' name='email'/>
                    <input required type="password" placeholder='password' name='password'/>
                    <button className='.buttons' disabled = {loading}>{ loading ? "Loading" : "Register"}</button>
                    <p>Il y a un erreur</p>
                    <span>Vous avez déjà un compte <br />
                    <Link className = "link" to = "../login">Login</Link>
                    </span>
                </form>
            </div>
        
    )
}

export default Register
