import ServiceCRUD from "../services/crud";
import Horaire from "./horaire";
import Personnel from "./personnel";
import Client from "./utilisateur";
import Voiture from "./voiture";

export class Reservation{
    service_save = new ServiceCRUD();
    static service = new ServiceCRUD();

    selfReturn(){
        return new Reservation(
            this.id,this.avance_paye,
            this.position_place,this.date,
            this.utilisateur,this.voiture,
            this.horaireclasse,
            this.personnel,
        )
    }

    setMontantPaye(montant_paye){
        this.montant_paye = montant_paye;
        return this.selfReturn();
    }

    setAvancePaye(avance_paye){
        this.avance_paye = avance_paye;
        return this.selfReturn();
    }

    setPositionPlace(position_place){
        this.position_place = position_place;
        return this.selfReturn();
    }

    setDate(date){
        this.date = date;
        return this.date;
    }

    setUtilisateur(utilisateur){
        this.utilisateur = utilisateur;
        return this.selfReturn();
    }

    setVoiture(voiture){
        this.voiture = voiture;
        return this.selfReturn();
    }

    setHoraireClasse(horaireclasse){
        this.horaireclasse = horaireclasse;
        return this.selfReturn();
    }

    setPersonnel(personnel){
        this.personnel = personnel;
        return this.selfReturn();
    }

    getData(){
        return {
            id : this.id,
            montant_paye :this.montant_paye,
            avance_paye: this.avance_paye,
            date: this.date,
            position_place: this.position_place,
            utilisateur : this.utilisateur.id,
            voiture: this.voiture.id,
            horaireclasse: this.horaireclasse.id,
            personnel: this.personnel,
        }
    }

    async save(){
        return await this.service_save.post("api/reservations/",this.getData());
    }
    async update(){
        return await this.service_save.put("api/reservations/",this.getData(),this.id);
    }

    static async getCountReservation(classe){
        return await this.service.post("api/nombreclasse/",JSON.stringify({"classe":classe}));
    }

    static async getCountReservationDate(classe,date){
        return await this.service.post("api/nombreclassedate/",JSON.stringify({"classe":classe,'date':date}));
    }

    static async get(pk){
        let reservation = await this.service.getSingle("api/reservations/",pk);
        return new Reservation(reservation.id,
                    reservation.montant_paye,
                    reservation.avance_paye,
                    reservation.position_place,
                    reservation.date,
                    reservation.horaireclasse,
                    reservation.utilisateur,
                    reservation.voiture,
                    reservation.personnel);
    }

    static async getMany(){
        let reservations = await this.service.getMany("api/reservations/");
        let all_reservations = []
        reservations.map(
            reservation => {
                let single_reservation = new Reservation(reservation.id,
                    reservation.montant_paye,
                    reservation.avance_paye,
                    reservation.position_place,
                    reservation.date,
                    reservation.horaireclasse,
                    reservation.utilisateur,
                    reservation.voiture,
                    reservation.personnel);
                all_reservations.push(single_reservation);
            }
        )
        return all_reservations;
    }

    static async getReservationReporter(pk){
        let reservations = await this.service.getSingle("api/filterreservationreporterbydestination/",pk);
        let all_reservations = []
        reservations.map(
            reservation => {
                let single_reservation = new Reservation(reservation.id,
                    reservation.montant_paye,
                    reservation.avance_paye,
                    reservation.position_place,
                    reservation.date,
                    reservation.horaireclasse,
                    reservation.utilisateur,
                    reservation.voiture,
                    reservation.personnel);
                all_reservations.push(single_reservation);
            }
        )
        return all_reservations;
    }

    static async getReservationUnpaid(classe){
        let reservations = await this.service.post("api/reservationsimpayees/",{"classe": classe});
        let all_reservations = []
        reservations.map(
            reservation => {
                let single_reservation = new Reservation(reservation.id,
                    reservation.montant_paye,
                    reservation.avance_paye,
                    reservation.position_place,
                    reservation.date,
                    reservation.horaireclasse,
                    reservation.utilisateur,
                    reservation.voiture,
                    reservation.personnel);
                all_reservations.push(single_reservation);
            }
        )
        return all_reservations;
    }


    static async getReservationsParDate(){
        let reservations = await this.service.getMany("api/reservationsimpayees/");
        let all_reservations = []
        reservations.map(
            reservation => {
                let single_reservation = new Reservation(reservation.id,
                    reservation.montant_paye,
                    reservation.avance_paye,
                    reservation.position_place,
                    reservation.date,
                    reservation.horaireclasse,
                    reservation.utilisateur,
                    reservation.voiture,
                    reservation.personnel);
                all_reservations.push(single_reservation);
            }
        )
        return all_reservations;
    }

    static async getReservationJournalier(date){
        let reservations = await this.service.post('api/getreservationjournalier/',{date:date});
        let all_reservations = []
        reservations.map(
            reservation => {
                let single_reservation = new Reservation(reservation.id,
                    reservation.montant_paye,
                    reservation.avance_paye,
                    reservation.position_place,
                    reservation.date,
                    reservation.horaireclasse,
                    reservation.utilisateur,
                    reservation.voiture,
                    reservation.personnel);
                all_reservations.push(single_reservation);
            }
        )
        return all_reservations;
    }


    constructor(id,montant_paye,avance_paye,
                position_place = "1,5,2,8",date,
                horaireclasse = {montant_voyage:0},
                utilisateur,
                voiture, date_created, personnel){
        this.id = id;
        this.montant_paye = montant_paye;
        this.avance_paye = avance_paye;
        this.position_place = position_place;
        this.date = date;
        this.horaireclasse = horaireclasse;
        this.utilisateur = utilisateur;
        this.voiture = voiture;
        this.places = this.position_place.split(',');
        this.nombre_place = this.places.length;
        this.total_montant = this.nombre_place * this.horaireclasse.montant_voyage;
        this.date_created = date_created;
        this.personnel = personnel;
    }
}

export default Reservation