import { place } from './place'
import Reservation, {Reservation as Res} from "../../models/reservation";
import {useEffect} from "react";
import ModalReservation from "../Home/modal/modalReservation";
import { useState } from 'react/cjs/react.development';
import Personnel from '../../models/personnel';
import Client from '../../models/utilisateur';


function Premium({voiture, horaireclasse, tabReserve, dateCreated}){
    let date = new Date().toISOString().slice(0, 10);
    const colors = document.querySelectorAll('#color');
    const btnReserver = document.getElementById('reserver');
    let tabPlace = [];
    let tabPlaceOf= [];
    let i = 0;
    let tabreserved=document.querySelectorAll("#color");
    const [showModal, setShowModal] = useState(false);
    const closeModalHandler = () =>{
        setShowModal(false);
    }

    const [object, setObject] = useState({})

    
    useEffect(() => {
        colors.forEach(element => {
            element.style.background = '#3ac218';
        });

        tabreserved.forEach(
            element => {
                element.disabled = false;
            }
        )

        colors.forEach(element => {
            if(element.disabled === false)
            element.style.background = '#3ac218';
            else
            element.style.background = '#efefef';
        });
        
        tabreserved.forEach(element => {
            tabReserve.forEach(element1 =>{
                if(parseInt(element.value) === parseInt(element1))
                    element.disabled=true;
            })
        });

        place.map(
            (place_) => {
                place_.etat = false;
            }
        )

        place.map(
            (place_) => {
                console.log(place_.value)
                console.log(place_.etat)
            }
        )

        colors.forEach(element => {
            if(element.disabled === false)
            element.style.background = '#3ac218';
            else
            element.style.background = '#efefef';
        });

    }, [tabReserve])

    const handleClickChoix = (j) => ()=>{
      if(place[j].etat === false){
          place[j].etat = true;
          tabPlace[j] = (place[j].value).toString();
          colors[j].style.background = '#F55454'
      }
      else{
          place[j].etat = false;
          delete tabPlace[j];
          colors[j].style.background = '#3ac218'
      }
      let e1 = false;
      place.forEach(element => {
          if(element.etat === true) {
              tabPlaceOf[i] = (element.value).toString();
              i++;
              e1 = true;
          }
          if(e1 === false) {
              tabPlaceOf.length = 0
          }
      });
      if(tabPlaceOf.length !== 0){
          btnReserver.disabled = false;
      }else{
          btnReserver.disabled = true;
      }
      console.log(tabPlace);
      console.log(tabPlaceOf);
    };

    const handleReserver = async (e)=>{
        e.preventDefault();
        let stringPlace = "";
        let tabPlace = [];
        let i = 0;
        let j = 1;
        place.forEach((element) =>{
            if(element.etat === true) {
                tabPlace[i] = (element.value).toString();
                i++;
            }
        })
        while (j <= tabPlace.length){
            if(j !== tabPlace.length){
                stringPlace += tabPlace[j-1] + ",";
                    j++
            }
            else {
                stringPlace += tabPlace[j-1]
                j++
            };  
        }
        let id = localStorage.getItem('horaireclasse')
        let horaireclasse_ = horaireclasse.find( horaire_ => horaire_.id === parseInt(id))
        let idPersonnel = parseInt(localStorage.getItem('idPersonnel'))
        let object_ = {
            idPersonnel : idPersonnel,
            date : date,
            horaireclasse : horaireclasse_,
            tabplace : tabPlace,
            stringPlace: stringPlace,
            voiture:voiture,
            dateCreated: dateCreated,
        }
        setObject(object_)
    }

    return (
        <div className="place">
            <form onSubmit={(e)=>{handleReserver(e)}} className="contenu">
                <div className="row ligne">
                    <div className="col-2 text-center"></div>
                    <div className="col-2"></div>
                    <div className="col-2 text-center">
                        <button type="button" className="btn-place" id="color" value="1" onClick={handleClickChoix(0)}>1</button>
                    </div>
                    <div className="col-2 text-center">
                        <button type="button" className="btn-place" id="color" value="2" onClick={handleClickChoix(1)}>2</button>
                    </div>
                </div>
                <div className="row ligne">
                    <div className="col-2 text-center">
                        <button type="button" className="btn-place" id="color" value="3" onClick={handleClickChoix(2)}>3</button>
                    </div>
                    <div className="col-2 text-center">
                        <button type="button" className="btn-place" id="color" value="4" onClick={handleClickChoix(3)}>4</button>
                    </div>
                    <div className="col-2 text-center">
                        <button type="button" className="btn-place" id="color" value="5" onClick={handleClickChoix(4)}>5</button>
                    </div>
                    <div className="col-2 text-center">
                        <button type="button" className="btn-place" id="color" value="6" onClick={handleClickChoix(5)}>6</button>
                    </div>
                </div>
                <div className="row ligne">
                    <div className="col-2 text-center">
                        <button type="button" className="btn-place" id="color" value="7" onClick={handleClickChoix(6)}>7</button>
                    </div>
                    <div className="col-2 text-center">
                        <button type="button" className="btn-place" id="color" value="8" onClick={handleClickChoix(7)}>8</button>
                    </div>
                    <div className="col-2"></div>
                    <div className="col-2 text-center">
                        <button type="button" className="btn-place" id="color" value="9" onClick={handleClickChoix(8)}>9</button>
                    </div>
                </div>
                <div className="row ligne">
                    <div className="col-2 text-center">
                        <button type="button" className="btn-place" id="color" value="10" onClick={handleClickChoix(9)}>10</button>
                    </div>
                    <div className="col-2 text-center">
                        <button type="button" className="btn-place" id="color" value="11" onClick={handleClickChoix(10)}>11</button>
                    </div>
                    <div className="col-2"></div>
                    <div className="col-2 text-center">
                        <button type="button" className="btn-place" id="color" value="12" onClick={handleClickChoix(11)}>12</button>
                    </div>
                </div>
                <div className="row ligne">
                    <div className="col-2 text-center">
                        <button type="button" className="btn-place" id="color" value="13" onClick={handleClickChoix(12)}>13</button>
                    </div>
                    <div className="col-2 text-center">
                        <button type="button" className="btn-place" id="color" value="14" onClick={handleClickChoix(13)}>14</button>
                    </div>
                    <div className="col-2 text-center">
                        <button type="button" className="btn-place" id="color" value="15" onClick={handleClickChoix(14)}>15</button>
                    </div>
                    <div className="col-2 text-center">
                        <button type="button" className="btn-place" id="color" value="16" onClick={handleClickChoix(15)}>16</button>
                    </div>
                </div>
               {showModal ? <div onClick={closeModalHandler} className="Modal"></div> : null}
                <button id="reserver" className="btn btn-primary col-6" onClick={() => setShowModal(true)}>
                     Reserver
                </button>
                <ModalReservation show={showModal} object={object} close={closeModalHandler} />
            </form>
        </div>
    )
}

export default Premium  