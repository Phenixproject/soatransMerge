import ServiceCRUD from "../services/crud";
import ClasseVoiture from "./classevoiture";
import Reservation from "./reservation";
import Client from "./utilisateur";

export class Voiture{
    service_save = new ServiceCRUD();
    static service = new ServiceCRUD();

    selfReturn(){
        return new Voiture(this.id,this.numero_voiture,this.etat_voiture,this.classe)
    }

    setNumeroVoiture(numero_voiture){
        this.numero_voiture = numero_voiture;
        return this.selfReturn();
    }

    setEtatVoiture(etat_voiture){
        this.etat_voiture = etat_voiture;
        return this.selfReturn();
    }

    setClasse(classe){
        this.classe = classe;
        return this.selfReturn();
    }

    async setReservation(){
        this.reservation = await this.getInitReservation();
    }

    getData(){
        return {
            numero_voiture: this.numero_voiture,
            etat_voiture: this.etat_voiture,
            classe : this.classe,
        }
    }

    async save(){
        return await this.service_save.post("api/voitures/",this.getData());
    }

    async update(){
        return await this.service_save.put("api/voitures/",this.getData(),this.id);
    }

    async delete(pk){
        await this.service_save.delete("api/voitures/", pk);
    }

    async getReservation(){
        let reservations = await this.service_save.getSingle("client/reservations/",this.id);
        let all_reservations = [];
        reservations.map(
            reservation => {
                let single_reservation = new Reservation(reservation.id,
                    reservation.montant_paye,
                    reservation.avance_paye,
                    reservation.position_place,
                    reservation.date,
                    reservation.horaireclasse,
                    reservation.utilisateur,
                    reservation.voiture)
                all_reservations.push(single_reservation);
            }
        )
        return all_reservations;
    }

    async manifold(){
        let reservations = await this.getReservation();
        let place = [];
        for(let i=0;i<=16;i++){
            place.push(undefined)
        }
        reservations.map(
            res => {
                console.log(res);
                let tab_place = res.position_place.split(',');
                tab_place.map(
                    tab => {
                        place[parseInt(tab)] = {
                            reservation: res
                        };
                    }
                )
            }
        )
        console.log(place);
        return place;
    }

    static async rechercheVoiture(idhoraireclasse,date){
        let voiture = await this.service.post("client/creategetvoiture/",{"horaireclasse":idhoraireclasse,"date":date});
        return new Voiture(voiture.id,voiture.numero_voiture,voiture.etat_voiture,new ClasseVoiture(voiture.classe.id,voiture.classe.classe));
    }

    static async get(pk){
        let voiture = await this.service.getSingle("api/voitures/",pk);
        return new Voiture(voiture.id,voiture.numero_voiture,voiture.etat_voiture,voiture.classe);
    }

    static async getMany(){
        let voitures = await this.service.getMany("api/voitures/");
        let all_voitures = [];
        voitures.map(
            async voiture => {
                let single_voiture = new Voiture(voiture.id,voiture.numero_voiture,voiture.etat_voiture,voiture.classe);
                all_voitures.push(single_voiture);
            }
        );
        return all_voitures;
    }

    static async createVoiture(horaireclasse,personnel){
        let voiture = new Voiture(0,"0",true,horaireclasse.classe);
        voiture.save();
        let fantome = await Client.getfantome();
        let reservation = new Reservation(0,0,0,"0","2021-01-02",horaireclasse,fantome,voiture,"2021-01-02",personnel);
        reservation.save();
    }

    static async getVoitureByHoraireClasse(pk){
        let voitures = await this.service.getSingle("api/filtervoiturebyhoraireclasse/",pk);
        let all_voitures = [];
        voitures.map(
            async voiture => {
                let single_voiture = new Voiture(voiture.id,voiture.numero_voiture,voiture.etat_voiture,voiture.classe);
                all_voitures.push(single_voiture);
            }
        );
        return all_voitures;
    }

    async getInitReservation(){
        let reservation = await this.service_save.getSingle("client/initreservation/",this.id);
        return new Reservation(reservation.id,
            reservation.montant_paye,
            reservation.avance_paye,
            reservation.position_place,
            reservation.date,
            reservation.horaireclasse,
            reservation.utilisateur,
            reservation.voiture);
    }

    static async filterWithClasse(c){
        const voitures = await this.getMany()
        let vclasse = []
        voitures.map(voiture=>{
            if(voiture.classe === c){
                vclasse.push(voiture)
            }
        })
        return vclasse;
    }

    static async getReservationByClass(classe){
        let voitures = await this.service.post('api/getallreservationsbyclass/',{classe:classe});
        let all_voitures = [];
        voitures.map(
            async voiture => {
                let single_voiture = new Voiture(voiture.id,voiture.numero_voiture,voiture.etat_voiture,voiture.classe);
                let r = await single_voiture.getInitReservation();
                single_voiture.setReservation(r);
                all_voitures.push(single_voiture);
            }
        );
        return all_voitures;
    }

    static async getPremium(){
        let premium = await this.filterWithClasse(2);
        premium.map(async (v)=>{await v.setReservation()});
        console.log(premium);
        return premium
    }

    static async getVip(){
        let vip = await this.filterWithClasse(1);
        vip.map(async (v)=>{await v.setReservation()});
        console.log(vip);
        return vip
    }

    constructor(id,numero_voiture,etat_voiture,classe=new ClasseVoiture()){
        this.id = id;
        this.numero_voiture = numero_voiture;
        this.etat_voiture = etat_voiture;
        this.classe = classe;
        this.reservation = null;
    }
}

export default Voiture;