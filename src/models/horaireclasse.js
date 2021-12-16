import ServiceCRUD from "../services/crud";
import ClasseVoiture from "./classevoiture";
import Destination from "./destination";
import Horaire from "./horaire";

export class HoraireClasse{
    service_save = new ServiceCRUD();
    static service = new ServiceCRUD();

    selfReturn(){
        return new HoraireClasse(
            this.id,this.montant_voyage,
            this.horaire,this.classe,
            this.destination
        )
    }

    setMontant(montant_voyage){
        this.montant_voyage = montant_voyage;
        this.selfReturn();
    }

    setHoraire(horaire){
        this.horaire = horaire;
        return this.selfReturn();
    }

    setDestination(destination){
        this.destination = destination;
        return this.selfReturn();
    }

    setClasse(classe){
        this.classe = classe;
        return this.selfReturn();
    }

    ///////////////////////////modelisation des donnees a transferer vers l'api/////////////////////////////

    getData(){
        return {
            id: this.id,
            montant_voyage: this.montant_voyage,
            classe: this.classe.id,
            destination: this.destination.id,
            horaire: this.horaire.id,
        }
    }

    ///////////////////////////utilisation du serviceCRUD/////////////////////////////

    async save(){
        return await this.service_save.post("api/horaireclasses/",this.getData());
    }

    async update(){
        return await this.service_save.put("api/horaireclasses/",this.getData,this.id);
    }

        /////////////////////////methode static////////////////////////////////////
    
    static async getDestination(classepk){
        let destinations = await this.service.getSingle("client/destinations/",classepk);
        let all_destinations = [];
        destinations.map(
            destination => {
                let single_destination = new Destination(destination.destination.id,destination.destination.depart,destination.destination.arrive);
                all_destinations.push(single_destination);
            }
        );
        return all_destinations;
    }

    static async getHoraire(destinationpk){
        let horaires = await this.service.getSingle("client/horaires/",destinationpk)
        let all_horaires = []
        horaires.map(
            horaire => {
                let single_horaire = new HoraireClasse(horaire.id,0,horaire.horaire,null,null);
                all_horaires.push(single_horaire);
            }
        )
        return all_horaires;
    }

    static async filterHoraireClasseByDestination(destinationpk){
        let horaires = await this.service.getSingle("api/filterhoraireclassbydestination/",destinationpk)
        let all_horaires = []
        horaires.map(
            horaire => {
                let single_horaire = new HoraireClasse(horaire.id,horaire.montant_voyage,horaire.horaire,horaire.classe,horaire.destination);
                all_horaires.push(single_horaire);
            }
        )
        return all_horaires;
    }
            //////////appel methode get pour obtenir un seul classe//////////////
    static async get(pk){
        let horaireclasse = await this.service.getSingle("api/horaireclasses/",pk);
        let horaire = await Horaire.get(horaireclasse.horaire);
        let classevoiture = await ClasseVoiture.get(horaireclasse.classe);
        let destination = await Destination.get(horaireclasse.destination);
        return new HoraireClasse(horaireclasse.id,horaireclasse.montant_voyage,horaire,classevoiture,destination);
    }

            //////////appel methode get pour obtenir tous les classes////////////
    static async getMany(){
        return this.service.getMany("api/horaireclasses/");
    }   

    ///////////////////////////constructeur classe/////////////////////////////
 
    constructor(id,montant_voyage,
            horaire = new Horaire(),
            classe = new ClasseVoiture(),
            destination = new Destination()){
        
        this.id = id;
        this.montant_voyage = montant_voyage;
        this.horaire = horaire;
        this.destination = destination;
        this.classe = classe;
    }
}

export default HoraireClasse