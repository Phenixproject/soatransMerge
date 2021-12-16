
import { useState } from 'react';
import Client from '../../../../models/utilisateur';
const AddClient = () => {
    const [clientToAdd, setClientToAdd] = useState(new Client())

    async function handleAddClient(e) {
        /*const username_ = clientToAdd.firstName + clientToAdd.lastName;
        if (clientToAdd.sexe === "homme")
            setClientToAdd({ sexe: true });
        else if (clientToAdd.sexe === "femme")
            setClientToAdd({ sexe: false });
        setClientToAdd({ username: username_ });
        const clientToAdd = new Client(clientToAdd);
        clientToAdd.savewithoutPhoto().then(
            response => {
                console.log(response);
            }, error => {
                console.log(error);
            }
        );*/
        console.log(clientToAdd);
        let client = await clientToAdd.savewithoutPhoto();
        localStorage.setItem('idclient',client.id);
    }

    return(
        <><form className="formClient mt-4" >
        <div className="container">
            <h2>ajouter clients</h2> 
            <div className="form-group">
                <label>Nom</label>
                <input  class="form-control" 
                        placeholder="Nom" 
                        type="text"
                        value={clientToAdd.firstName}
                        onChange={(e) => (setClientToAdd(clientToAdd.setFirstName(e.target.value)))}/>
            </div>
            <div className="form-group">
                <label html>Prénom(s)</label>
                <input  class="form-control" 
                        placeholder="Prenom(s)" 
                        type="text"
                        value={clientToAdd.lastName}
                        onChange={(e) => (setClientToAdd(clientToAdd.setLastName(e.target.value)))}/>
            </div>
            <div className="form-group">
                <label>CIN</label>
                <input class="form-control" 
                    placeholder="CIN" 
                    value={clientToAdd.cin}
                    onChange={(e) => setClientToAdd(clientToAdd.setCIN(e.target.value))}
                    type="text"/>
            </div>
            <div className="form-group">
                <label>Téléphone</label>
                <input class="form-control" 
                    placeholder="Téléphone" 
                    value={clientToAdd.telephone}
                    onChange={(e) => setClientToAdd(clientToAdd.setTelephone(e.target.value))}
                    type="text"/>
            </div>
            <div className="form-group">
                <label>Adresse</label>
                <input class="form-control" 
                    placeholder="Adresse" 
                    value={clientToAdd.adresse}
                    onChange={(e) => setClientToAdd(clientToAdd.setAdresse(e.target.value))}
                    type="text"/>
            </div>

            <div className="form-group">
                <label>Homme</label>
                <input 
                    class="form-control"
                    name="sexe" 
                    value={clientToAdd.sexe}
                    onChange={(e)=>setClientToAdd(clientToAdd.setSexe(true))}
                    type="radio"
                    checked = "checked"
                    />
            </div>
            <div className="form-group">
                <label >Femme</label>
                <input 
                    class="form-control"
                    name="sexe" 
                    value={clientToAdd.sexe}
                    onChange={(e)=>setClientToAdd(clientToAdd.setSexe(false))}
                    type="radio"/>
            </div>
            <button className="btn btn-primary" type='button' onClick={(e) => handleAddClient(e)}>Ajouter</button>
            </div>
        </form></>
    )
}

export default AddClient;