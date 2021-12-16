import React from 'react'
import "./Login.scss";
import TopBar from '../TopBar/topBar'

function Login() {
    return (
        <div>
            <TopBar/>
            <div className="containerLogin">
                <form className="form-signin form">
                    <h1 className="text-center">Authentification</h1>
                    <div className="form-group">
                        <label htmlFor="username">Nom d'utilisateur</label>
                        <input id="username" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Mot de passe</label>
                        <input id="password" className="form-control"/>
                    </div>
                    <button className="btn btn-login">Se connecter</button>
                </form>
            </div>
        </div>
        
    )
}

export default Login;
