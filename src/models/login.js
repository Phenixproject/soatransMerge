import React, { useEffect, useState } from 'react';
import TopBarLogin from '../TopBarLogin/topbarlogin';
import './login.css';
import Utilisateur from '../../models/utilisateur';
import {useHistory} from 'react-router-dom';
import Auth from '../../auth/auth';

function Login() {
    const [message,setMessage] = useState("") ;
    const history = new useHistory();
    const [login,setLogin] = useState({
        'telephone':'',
        'mdp':'',
    });

    const handleClickLogin = async (e)=>{
        e.preventDefault();  
        let profil = await Utilisateur.login(login);
        console.log(profil);
        if(profil.id){
            localStorage.setItem('id',profil.id);
            await Auth.getToken({username:profil.username,password:login.mdp});
            history.push('/profil')
        }else{
            setMessage(profil.raison);
        }
    }

    return (
        <div>
            <TopBarLogin />
            <div className="wrapperFormLogin">
                <form className="form">
                    <h2>Authentification</h2>
                    <div className="formItem"> 
                        <label>Numéro CIN:</label>
                        <input 
                            type="text"
                            value={login.CIN}
                            onChange={(e)=> setLogin({
                                ...login,
                                telephone: e.target.value
                            })}
                        />
                    </div>
                    <div className="formItem">
                        <label>Mot de passe:</label>
                        <input 
                            type="password"
                            value={login.mdp}
                            onChange={(e)=> setLogin({
                                ...login,
                                mdp: e.target.value
                            })}
                        />
                    </div>
                    <button onClick={handleClickLogin}>Se connecter</button>
                    <p>{message}</p>
                </form>
            </div>
        </div>
    );
}

export default Login;