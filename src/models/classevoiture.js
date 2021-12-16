import ServiceCRUD from "../services/crud";

export class ClasseVoiture{
    service_save = new ServiceCRUD();
    static service = new ServiceCRUD();

    ///////////////////////////instance d'une nouvelle classe/////////////////////////////

    selfReturn(){
        return new ClasseVoiture(this.id,this.classe);
    }
    
    //////////////////////////fonction de modification des attributs de la classe/////////////////////////////

    setClasse(classe){
        this.classe = classe;
        return this.selfReturn();
    }

    ///////////////////////////modelisation des donnees a transferer vers l'api/////////////////////////////

    getData(){
        return {
            classe: this.classe,
        }
    }

    ///////////////////////////utilisation du serviceCRUD/////////////////////////////
        ///////////////sauvegrade des donnees////////////////////
    async save(){
        return await this.service_save.post("api/classevoitures/",this.getData());
    }
        ///////////////mise a jour des donnees///////////////////
    async update(){
        return await this.service_save.put("api/classevoitures/",this.getData(),this.id);
    }

        /////////////////////////methode static////////////////////////////////////
            //////////appel methode get pour obtenir un seul classe//////////////
    static async get(pk){
        let classvoiture = await this.service.getSingle("api/classevoitures/",pk);
        return new ClasseVoiture(classvoiture.id,classvoiture.classe);
    }
    
            //////////appel methode get pour obtenir tous les classes////////////
    static async getMany(){
        let classevoitures = await this.service.getMany("api/classevoitures/");
        let all_classevoitures = []
        classevoitures.map(
            classevoiture => {
                let single_classevoiture = new ClasseVoiture(classevoiture.id, classevoiture.classe);
                all_classevoitures.push(single_classevoiture);
            }
        )
        return all_classevoitures;
    }
            //////////effacer la classe///////////////////////////////////////////////////////
    static async delete(pk){
        await this.service.delete("api/classevoitures/",pk);
    }

    ///////////////////////////constructeur classe/////////////////////////////

    constructor(id,classe){
        this.id = id;
        this.classe = classe;
    }
}

export default ClasseVoiture;