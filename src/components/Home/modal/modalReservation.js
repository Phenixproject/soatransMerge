import React,{useEffect, useState} from 'react'
import Client from '../../../models/utilisateur';
import './modalReservation.scss'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Reservation from '../../../models/reservation';
import AddClient from './addClient/AddClient';

function ModalReservation({ show, object }){
    const [boolajout,setBoolAjout] = useState(show?false:{})
    const [clients, setClient] = useState([])
    const [myOptions, setMyOptions] = useState([])  
    
    const [passwordConfirmation, setPasswordConfirmation] = useState()

    function affichageAjoutClient(e){
        if(boolajout === true){
            setBoolAjout(false);
        }else{
            setBoolAjout(true);
        }
    } 

    const getClient = async (clientName) => {
        let client_ = await Client.getClientWithName(clientName.target.value)
        setClient(client_.clients)
        setMyOptions(client_.names)
    }
    const handleAfficher = (e, client) => {
        e.preventDefault();
        let horaireClasse_ = object.horaireclasse
        console.log(horaireClasse_)
        let reservation = new Reservation(0, 
                                        horaireClasse_.montant_voyage*object.tabplace.length,0,
                                        object.stringPlace,
                                        object.date,
                                        object.horaireClasse,
                                        client,
                                        object.voiture,
                                        object.dateCreated,
                                        object.idPersonnel)
        console.log(reservation)
    }

    const checkPassword = () => {

    }

    return(
        <div
             className="ModalReservation "
            style={{
                transform: show ? "translate(-50%,-50%)" : "translate(-50%,-150%)",
                zIndex: show ? 11 : 0,
                opacity: show ? 1 : 0
            }}
        >
            <h1 className="col-12">Reservation</h1>
            <div className=" reservation col-12">
                <div className="rechercheUser">
                    <div className="rechercher col-12">
                        <Autocomplete
                            style={{ width: 550 }}
                            freeSolo
                            autoComplete
                            autoHighlight
                            options={myOptions}
                            renderInput={(params) => (
                              <TextField {...params}
                                onChange={getClient}
                                variant="outlined"
                                label="Recherche"
                              />
                            )}
                        />
                    </div>
                    {clients.map(
                        (client) => {
                            return (
                                <div type="btn" onClick={(e) => handleAfficher(e, client)}> 
                                    <p>{client.username}</p>
                                    <p>{client.telephone}</p>
                                </div>
                            )
                        }
                    )}
                    <span className="col-12 mb-4 mt-4"></span>
                    <button type="button" className="btn btn-dark" onClick={e=>{affichageAjoutClient(e)}}>Ajouter client</button> 
                        {boolajout === true? 
                        <AddClient />
                       :
                        <p></p>}
                    <span className="mt-4 mb-4"></span>
                    <div className="validation ">
                        <div className="paiement">
                            <label>Payé</label>
                            <input  className="mr-1 ml-1" type="checkbox" name="paiement" />
                        </div>
                        <div className="bouttonValider">
                            <button  type="button"  onClick={()=>{let r = localStorage.getItem('reservation');r = JSON.parse(r);console.log(r)}} className="btn btn-success ml-1">Valider</button>
                            <button className="btn btn-danger ml-1">Annuler</button>
                            <button className="btn btn-light ml-1"></button>
                        </div>
                        
                    </div>

                </div>
            </div>
        </div>

    )
}
export default ModalReservation;