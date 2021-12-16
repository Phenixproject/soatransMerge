import ServiceCRUD from "../services/crud";
import Personnel from "./personnel";
import Reservation from "./reservation";

export class Paiement{
    service_save = new ServiceCRUD();
    static service = new ServiceCRUD();

    selfReturn(){
        return new Paiement(this.id,this.date,
                this.montant,this.personnel,)
    }

    setDate(date){
        this.date = date;
        return this.selfReturn();
    }

    setMontant(montant){
        this.montant = montant;
        return this.selfReturn();
    }

    setPersonnel(personnel){
        this.personnel = personnel;
        return this.selfReturn();
    }

    setReservation(reservation){
        this.reservation = reservation;
        return this.selfReturn();
    }

    getData(){
        return {
            date: this.date,
            montant: this.montant,
            personnel: this.personnel.id,
            reservation: this.reservation.id,
        }
    }

    static async getSomme(id_personnel,classevoiture,datetime){
        return await this.service.post("api/sommepaiement/",{id:id_personnel,classe:classevoiture,
        date:datetime}); 
    }

    static async getSommeAll(classevoiture,datetime){
        return await this.service.post("api/sommepaiementall/",{classe:classevoiture,
        date:datetime}); 
    }

    async save(){
        return await this.service_save.post("api/paiements/",this.getData());
    }

    async update(){
        return await this.service_save.update("api/paiements/",this.getData,this.id);
    }

    static async get(pk){
        let paiement = await this.service.getSingle("api/paiements/",pk);
        return new Paiement(paiement.id, 
            paiement.date,
            paiement.montant,
            paiement.personnel,
            paiement.reservation);
    }

    static async getMany(){
        let paiements = await this.service.getMany("api/paiements/");
        let all_paiements = []
        paiements.map(
            paiement => {
                let single_paiement = new Paiement(paiement.id,
                    paiement.date,
                    paiement.montant,
                    paiement.personnel,
                    paiement.reservation)
                all_paiements.push(paiement);
            }
        )
        return all_paiements;
    }

    static async getReservationAvancees(pk,classe){
        let paiements = await this.service.post("api/reservationsavancees/",{"id":pk,"classe":classe});
        let all_paiements = []
        paiements.map(
            paiement => {
                let personnel = new Personnel(paiement.personnel.id,
                    paiement.personnel.username_personnel,
                    paiement.personnel.first_name_personne,
                    paiement.personnel.last_name_personnel,
                    paiement.personnel.matricule_personnel,
                    paiement.personnel.CIN_personnel,
                    paiement.personnel.telephone_personnel,
                    paiement.personnel.password_personnel,
                    paiement.personnel.statut_personnel,
                    paiement.personnel.photo,
                    paiement.personnel.local,
                    paiement.personnel.role);
                let reservation = new Reservation(paiement.reservation.id,
                    paiement.reservation.montant_paye,
                    paiement.reservation.avance_paye,
                    paiement.reservation.position_place,
                    paiement.reservation.date,
                    paiement.reservation.horaireclasse,
                    paiement.reservation.utilisateur,
                    paiement.reservation.voiture)
                let single_paiement = new Paiement(paiement.id,
                    paiement.date,
                    paiement.montant,
                    personnel,
                    reservation)
                all_paiements.push(single_paiement);
            }
        )
        return all_paiements;
    }


    static async getReservationPayer(pk,classe){
        let paiements = await this.service.post("api/reservationspayees/",{"id":pk,"classe":classe});
        let all_paiements = []
        paiements.map(
            paiement => {
                let personnel = new Personnel(paiement.personnel.id,
                    paiement.personnel.username_personnel,
                    paiement.personnel.first_name_personne,
                    paiement.personnel.last_name_personnel,
                    paiement.personnel.matricule_personnel,
                    paiement.personnel.CIN_personnel,
                    paiement.personnel.telephone_personnel,
                    paiement.personnel.password_personnel,
                    paiement.personnel.statut_personnel,
                    paiement.personnel.photo,
                    paiement.personnel.local,
                    paiement.personnel.role);
                let reservation = new Reservation(paiement.reservation.id,
                    paiement.reservation.montant_paye,
                    paiement.reservation.avance_paye,
                    paiement.reservation.position_place,
                    paiement.reservation.date,
                    paiement.reservation.horaireclasse,
                    paiement.reservation.utilisateur,
                    paiement.reservation.voiture)
                let single_paiement = new Paiement(paiement.id,
                    paiement.date,
                    paiement.montant,
                    personnel,
                    reservation)
                all_paiements.push(single_paiement);
            }
        )
        return all_paiements;
    }

    constructor(id,date,montant,personnel = new Personnel(),reservation = new Reservation()){
        this.id = id;
        this.montant = montant;
        this.date = date;
        this.personnel = personnel;
        this.reservation = reservation;
        this.nombre_place = this.reservation.position_place.split(',').length;
    }
}

export default Paiement