import ServiceCRUD from "../services/crud";

export class Role{
    service_save = new ServiceCRUD();
    static service = new ServiceCRUD();

    selfReturn(){
        return new Role(this.id,this.libelle_role)
    }

    setLibelleRole(libelle_role){
        this.libelle_role = libelle_role;
        return this.selfReturn();
    }

    getData(){
        return {
            id: this.id,
            libelle_role: this.libelle_role,
        }
    }

    async save(){
        return this.service_save.post("api/roles/",this.getData());
    }

    async update(){
        return this.service_save.put("api/roles/",this.getData(),this.id);
    }

    static async get(pk){
        let role = await this.service.getSingle("api/roles/",pk);
        return new Role(role.id,role.libelle_role);
    }

    static async getMany(){
        let roles = await this.service.getMany("api/roles/");
        let all_roles = [];
        roles.map(
            role => {
                let single_role = new Role(role.id,role.libelle_role);
                all_roles.push(single_role);
            }
        )
        return all_roles;
    }

    constructor(id,libelle_role){
        this.id = id;
        this.libelle_role = libelle_role;
    }
}

export default Role