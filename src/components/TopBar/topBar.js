import React from 'react';
import "./topBar.scss";
import Logo from "./Images/Logo 2.png";

function topBar() {
    return (
        <div className="topbar">
            <div className="topLeft ml-3">
            <img src={Logo} alt="Logo" />
            </div>
            <div className="topRight mr-3">
                <button className="btn btn-primary mr-2 ">Se connecter</button>
                <button className="btn btn-primary ">Se deconnecter</button>
            </div>
        </div>
    )
}

export default topBar;