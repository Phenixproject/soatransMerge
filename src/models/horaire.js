import ServiceCRUD from "../services/crud";

export class Horaire{
    service_save = new ServiceCRUD();
    static service = new ServiceCRUD();

    ///////////////////////////instance d'une nouvelle classe/////////////////////////////

    selfReturn(){
        return new Horaire(this.id,this.heure);
    }

    //////////////////////////fonction de modification des attributs de la classe/////////////////////////////

    setHeure(heure){
        this.heure = heure;
        return this.selfReturn();
    }

    ///////////////////////////modelisation des donnees a transferer vers l'api/////////////////////////////

    getData(){
        return {
            heure: this.heure
        }
    }

    ///////////////////////////utilisation du serviceCRUD/////////////////////////////
        ///////////////sauvegrade des donnees////////////////////
    async save(){
        return await this.service_save.post("api/horaires/",this.getData());
    }

        ///////////////mise a jour des donnees///////////////////    
    async update(){
        return await this.service_save.put("api/horaires/",this.getData(),this.id);
    }

        /////////////////////////methode static////////////////////////////////////
            //////////appel methode get pour obtenir un seul classe//////////////
    static async get(pk){
        let horaire = await this.service.getSingle("api/horaires/",pk);
        return new Horaire(horaire.id,horaire.heure);
    }

            //////////appel methode get pour obtenir tous les classes////////////
    static async getMany(){
        let horaires = await this.service.getMany("api/horaires/");
        let all_horaires = []
        horaires.map(
            horaire => {
                let single_horaire = new Horaire(horaire.id, horaire.heure);
                all_horaires.push(single_horaire);
            }
        )
        return all_horaires;
    }

            //////////effacer la classe///////////////////////////////////////////////////////
    static async delete(pk){
        await this.service.delete("api/horaires/",pk);
    }

    ///////////////////////////constructeur classe/////////////////////////////

    constructor(id,heure){
        this.id = id;
        this.heure = heure;
    }
}

export default Horaire;