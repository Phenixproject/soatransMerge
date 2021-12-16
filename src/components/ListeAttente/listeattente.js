import React,{ useState,useEffect } from "react";
import ServiceCRUD from "../../services/crud";
import "./listeattente.scss";

function ListAttente(){

    const element = [
        {
            first_name: "RASOLONJATOVO",
            last_name: "Brice Herizo",
            date: "2021-06-02",
            numero: "8077 btn",
            horaire: "10h",
            classe: "VIP"
        },
        {
            first_name: "RASOLONJATOVO",
            last_name: "Brice Herizo",
            date: "2021-06-02",
            numero: "8077 btn",
            horaire: "10h",
            classe: "VIP"
        },
        {
            first_name: "RASOLONJATOVO",
            last_name: "Brice Herizo",
            date: "2021-06-02",
            numero: "8077 btn",
            horaire: "10h",
            classe: "VIP"
        },
        {
            first_name: "RASOLONJATOVO",
            last_name: "Brice Herizo",
            date: "2021-06-02",
            numero: "8077 btn",
            horaire: "10h",
            classe: "VIP"
        },
    ]

    const [reservations,setReservations] = useState([]);

    const service = new ServiceCRUD();

    useEffect(async ()=>{
        let reservation_ = await service.getMany('api/reservations/');
        setReservations(reservation_);
        console.log(reservation_);
    },[])

    return (
        <div className="container reservation">
            {
                reservations.map(
                    (single) => {
                        return (
                            <div className="card">
                                <div className="container inside-card">
                                    <div className="container">
                                        <p>{single.first_name}</p>
                                        <p>{single.last_name}</p>
                                        <p>Reservation reporté {single.date} Vehicule : {single.numero} {single.horaire} {single.classe}</p>
                                    </div>
                                    <div className="options">
                                        <div class="dropdown">
                                            <button class="btn btn-info" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                                                    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                                                </svg>
                                            </button>
                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <a class="dropdown-item" href="#">Modifier</a>
                                                <a class="dropdown-item" href="#">Supprimer</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="container outside-card">
                                    <p>06-02-2021 10h VIP</p>
                                </div>
                            </div>
                        );
                    }
                )
            }
        </div>   
    )
}

export default ListAttente;