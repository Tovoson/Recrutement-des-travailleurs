import React, { useEffect, useState } from 'react'
import './login.scss'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../lib/firebase'
import { useUserStore } from '../../lib/userStore';
import Form from './Form';
import { Loading } from '../modale/Loading';
import { useNavigate } from 'react-router-dom';


const Logins = () => {
    const [loading, setLoading] = useState(false);
    const {currentUser, isLoading, fetchUserInfo} = useUserStore();
    const [isError, setIsError] = useState(false);
    
    const navigate = useNavigate()
    
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

    const handleLogin = async (e) =>{
        e.preventDefault();
        setLoading(true);

        // Prendre les données vient des formulaires
        const formData = new FormData(e.target);
        const {email, password} = Object.fromEntries(formData);
        
        try {
            
            await signInWithEmailAndPassword(auth, email, password)
            console.log("Logging avec succès")

        } catch (error) {
            setIsError(true)
            console.log(error + "Il y a un erreur");
        }finally{
            setLoading(false);
        }
    }

    setTimeout(() => {
        setIsError(false);
    }, 2000);
    console.log(currentUser);

    if (isLoading){
        return <Loading/>
    } 
    
    return (
        <>{ currentUser 
            ? navigate('../admin')
            : <Form handleLogin = {handleLogin} loading={loading} isError = {isError}/> }   
       </>
    )
}

export default Logins
