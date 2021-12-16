import React, { useState, useEffect } from 'react'
import "./Home.scss"
import Logo from './Images/Logo.png'
import TopBar from '../TopBar/topBar'
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import Personnel from '../../models/personnel';
import HoraireClasse from '../../models/horaireclasse';
import Voiture from '../../models/voiture';
import Premium from '../Premium/Premium';

function Home() {

    const [personnel, setPersonnel] = useState()
    const [horaireClasse, setHoraireClasses] = useState([])
    const [horaireclasse, setHoraireClasse] = useState({})
    const [voitures, setVoitures] = useState([])
    const [voiture, setVoiture] = useState()
    let   [iterationVoiture, setIterationVoiture] = useState(1)
    let   [actifTab, setActifTab] = useState(1)
    const [reservations, setReservation] = useState([])
    const [tabReserve,setTabReserve] = useState([]);
    const [clientList, setClientList] = useState([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect( async () => {
        let personnel_ = await Personnel.get(2)
        setPersonnel(personnel_)
        console.log(personnel_)
        let horaireClasse_ = await HoraireClasse.filterHoraireClasseByDestination(personnel_.destination);
        setHoraireClasses(horaireClasse_)
        console.log(horaireClasse_)
        setHoraireClasse(horaireClasse_[0]);
        console.log(horaireClasse_[0]);
        let v = await Voiture.getVoitureByHoraireClasse(horaireClasse_[0].id);
        setVoitures(v);
        setVoiture(v[0])
        let reservations_ = await v[0].getReservation()
        console.log(reservations_)
        setReservation(reservations_)
        parseReservation(reservations_)
    }, [])


    function getDate(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; 
        var yyyy = today.getFullYear();
      
    
        if(dd<10) 
        {
            dd='0'+dd;
        } 

        if(mm<10) 
        {
            mm='0'+mm;
        } 
        today = mm+'/'+dd+'/'+yyyy;
        return today
    }


    async function initReservation(v){
        const value = await v.getReservation()
        setReservation(value)
        console.log(value)
        return value;
    }


    async function voitureNext(){
        let v = voitures[actifTab]
        setVoiture(v)
        setActifTab(actifTab+1)
        let r = await initReservation(v)
        parseReservation(r);
    }


    async function voiturePrevious(e){
        e.preventDefault();
        let r = [];
        if(actifTab-1>0){
            let i = actifTab-1;
            let v = voitures[i-1]
            setActifTab(actifTab-1)
            setVoiture(v)
            r = await initReservation(v)
        }
        parseReservation(r);
    }


    const getHoraireClasse = async (hc) => {
        console.log(hc);
        localStorage.setItem('horaireclasse',hc.id);
        setHoraireClasse(hc);
        let v = await Voiture.getVoitureByHoraireClasse(hc.id);
        setVoitures(v);
    }


    const parseReservation = (r) => {
        const res = r;
          let i = 0;
          let t = [];
        res.map((one) => {
            (one.position_place).split(",").map((un) => {
                t[i] = un;
                i++;
            })
        })
        setTabReserve(t);
    }


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


    return (
        <div className="containerHome">
            <TopBar/>
            <div className="row">
                <div className="col-3 logo">
                    <img src={Logo} alt="Logo"/>
                </div>
                <div className="col-6 date">
                    <input type="date" value={getDate()} className="dateInput"/>
                </div>
                <div className="col-3">
                    
                </div>
            </div>
            <div className="row">
                <div className="col-3 heure-reservation">
                    <h2>Réservations</h2>
                    <div className="heure">
                        {horaireClasse?
                            horaireClasse.map((elt,key)=>(
                                <button onClick={()=>{getHoraireClasse(elt)}}className="btn-heure">
                                    <p style={{background: elt.classe.classe==="Vip" ? "rgb(233, 77, 77)": "rgb(19, 115, 170)"}}>{elt.horaire.heure}</p>
                                    <p>{elt.classe.classe}</p>
                                </button>
                            )):""
                        }
                    </div>
                </div>
                <div className="col-6">
                    <h2 className="title">Fiche de réservations {horaireclasse.destination?horaireclasse.destination.depart+" - "+horaireclasse.destination.arrive:""}</h2>
                    <div className="option row">
                        <div className="col-5">
                            <nav aria-label="...">
                                <ul class="pagination">
                                    <li class="page-item">
                                        <a class="page-link" href="" onClick={(e) => voiturePrevious(e)}><FaChevronLeft/></a>
                                    </li>
                                    {voitures.map(
                                        (voiture) => {
                                            return actifTab === iterationVoiture?(
                                                <li key={voiture.id+voiture.numero_voiture} class="page-item active">
                                                    <a class="page-link" href="#">{iterationVoiture++}<span class="sr-only">(current)</span></a>
                                                </li>
                                            ):(
                                                <li key={voiture.id+voiture.numero_voiture} class="page-item">
                                                    <a class="page-link" href="#">{iterationVoiture++}</a>
                                                </li>
                                            )
                                        }
                                    )}
                                    <li class="page-item">
                                        <a class="page-link" href="#" onClick={() => voitureNext()}><FaChevronRight/> </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="col-5">
                            <input type="text" className="form-control" placeholder="Rechercher un voyageur..."/>
                        </div>
                        <div className="col-2">
                            <button>N</button>
                            <button>N</button>
                        </div>
                    </div>
                    <div className="choixVoyage">
                        <label>CHOIX DE VOYAGE</label>
                        <select className="form-control">
                            <option>11h Premium</option>
                            <option>11h Premium</option>
                            <option>11h Premium</option>
                            <option>11h Premium</option>
                        </select>
                    </div>
                    <Premium reservations={reservations} voiture={voiture} horaireclasse={horaireClasse} tabReserve={tabReserve} dateCreated={ getDate() }/>
                    <div className="row">
                        <div className="col-6">
                            <input type="text" className="form-control"/>
                            <button>1</button>
                            <button>2</button>
                        </div>
                        <div className="col-6">
                            <input type="text" className="form-control"/>
                            <button>1</button>
                            <button>2</button>
                        </div>
                    </div>
                    <div className="btnManifold">
                        <button>Manifold</button>
                        <button>Voyageurs</button>
                    </div>
                </div>
                <div className="col-3">
                    <div className="container reservation">
                        {
                            element.map(
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
                </div>
            </div>
        </div>
    )
}

export default Home;
