import ServiceCRUD from "../services/crud";

export class Local{
    service_save = new ServiceCRUD();
    static service = new ServiceCRUD();

    selfReturn(){
        return new Local(this.id,this.local);
    }

    setLocal(local){
        this.local = local;
        return this.selfReturn();
    }

    getData(){
        return {
            id: this.id,
            local: this.local,
        }
    }

    async save(){
        return await this.service_save.post("api/locaux/",this.getData());
    }

    async update(){
        return await this.service_save.put("api/locaux/",this.getData(),this.id);
    }

    static async get(pk){
        let local = await this.service.getSingle("api/locaux/",pk);
    }

    static async getMany(){
        let locaux = await this.service.getMany("api/locaux/");
        let all_locaux = []
        locaux.map(
            local => {
                let single_local = new Local(local.id,local.local);
                all_locaux.push(single_local);
            }
        );
        return all_locaux;
    }

    constructor(id,local){
        this.id = id;
        this.local = local;
    }
}

export default Local