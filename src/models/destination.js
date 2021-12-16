import ServiceCRUD from "../services/crud";

export class Destination{
    service_save = new ServiceCRUD();
    static service = new ServiceCRUD();

    ///////////////////////////instance d'une nouvelle classe/////////////////////////////

    selfReturn(){
        return new Destination(this.id,this.depart,this.arrive);
    }

    //////////////////////////fonction de modification des attributs de la classe/////////////////////////////

    setDepart(depart){
        this.depart = depart;
        return this.selfReturn();
    }

    setArrive(arrive){
        this.arrive = arrive;
        return this.selfReturn();
    }

    ///////////////////////////modelisation des donnees a transferer vers l'api/////////////////////////////

    getData(){
        return {
            depart: this.depart,
            arrive: this.arrive,
        }
    }

    ///////////////////////////utilisation du serviceCRUD/////////////////////////////
        ///////////////sauvegrade des donnees////////////////////
    async save(){
        return await this.service_save.post("api/destinations/",this.getData());
    }
    
        ///////////////mise a jour des donnees///////////////////
    async update(){
        return await this.service_save.put("api/destinations/",this.getData(),this.id);
    }

        /////////////////////////methode static////////////////////////////////////
            //////////appel methode get pour obtenir un seul classe//////////////
    static async get(pk){
        let destination = await this.service.getSingle("api/destinations/",pk);
        return new Destination(destination.id,destination.depart,destination.arrive);
    }

            //////////appel methode get pour obtenir tous les classes////////////
    static async getMany(){
        let destinations = await this.service.getMany("api/destinations/");
        let all_destinations = []
        destinations.map(
            destination => {
                let single_destination = new Destination(destination.id, destination.depart,destination.arrive);
                all_destinations.push(single_destination);
            }
        )
        return all_destinations;
    }

            //////////effacer la classe///////////////////////////////////////////////////////
    static async delete(pk){
        await this.service.delete("api/destinations/",pk);
    }

    ///////////////////////////constructeur classe/////////////////////////////

    constructor(id,depart,arrive){
        this.id = id;
        this.depart = depart;
        this.arrive = arrive;
    }
}

export default Destination;