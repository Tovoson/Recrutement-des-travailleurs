import React, { useEffect, useState } from 'react'
import './login.scss'
import { Link, useNavigate } from 'react-router-dom'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../lib/firebase'
import { doc, setDoc } from "firebase/firestore"; 
import { useUserStore } from '../../lib/userStore';
import Form from './Form';
import Accueil_admin from '../affichage_mode_admin/Accueil_admin';

const Logins = () => {
    const [loading, setLoading] = useState(false);
    const {currentUser, isLoading, fetchUserInfo} = useUserStore();
    // const navigate = useNavigate()
    // const user = false

    useEffect(() =>{
        const unSub = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('Utilisateur connecté : ', user.uid);
                fetchUserInfo(user?.uid); // Peut-être que cette ligne cause des problèmes
            } else {
                console.log('Aucun utilisateur connecté');
                fetchUserInfo(null);
            }
        });

        return () =>{
            unSub();
        }

    }, [fetchUserInfo]);

    // useEffect(() => {
    //     if (currentUser) {
    //         console.log('Redirection vers /admin');
    //         navigate('/admin');
    //     }
    // }, [currentUser, navigate]);

    const handleLogin = async (e) =>{
        e.preventDefault();
        setLoading(true);

        // Prendre les données vient des formulaires
        const formData = new FormData(e.target);
        const {email, password} = Object.fromEntries(formData);
        
        try {
            
            const res = await signInWithEmailAndPassword(auth, email, password)

            console.log("Logging avec succès")

        } catch (error) {
            console.log(error + "Il y a un erreur");
        }finally{
            setLoading(false);
        }
    }

    console.log(currentUser);

    if (isLoading){
        return <div className="loading">Loading...</div>
    } 

    // if (currentUser) {
    //     return null;
    // }


    return (
        <>{ currentUser ? <Accueil_admin/> : <Form handleLogin = {handleLogin} loading={loading}/> }   
       </>
    )
}

export default Logins
