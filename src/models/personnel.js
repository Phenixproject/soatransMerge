import ServiceCRUD from "../services/crud";
import Role from "./role";

export class Personnel{
    service_save = new ServiceCRUD();
    static service = new ServiceCRUD();

    selfReturn(){
        return new Personnel(this.id,this.username,
            this.first_name,
            this.last_name,
            this.matricule,
            this.CIN,
            this.telephone,
            this.password,
            this.statut,
            this.photo,
            this.local,
            this.role,
            this.adresse,
            this.destination)
    }

    setUserName(username){
        this.username = username;
        return this.selfReturn();
    }

    setFirstName(first_name){
        this.first_name = first_name;
        this.username = this.first_name+" "+this.last_name;
        return this.selfReturn();
    }

    setLastName(last_name){
        this.last_name = last_name;
        this.username = this.first_name+" "+this.last_name;
        return this.selfReturn();
    }

    setMatricule(matricule){
        this.matricule = matricule;
        return this.selfReturn();
    }

    setCIN(CIN){
        this.CIN = CIN;
        return this.selfReturn();
    }

    setTelephone(telephone){
        this.telephone = telephone;
        return this.selfReturn();
    }

    setPassword(password){
        this.password = password;
        return this.selfReturn();
    }

    setStatut(statut){
        this.statut = statut;
        return this.selfReturn();
    }

    setLocal(local){
        this.local = local;
        return this.selfReturn();
    }

    setRole(role){
        this.role = role;
        return this.selfReturn();
    }

    setPhoto(photo){
        this.photo = photo;
        return this.selfReturn();
    }

    setAdresse(adresse){
        this.adresse = adresse;
        return this.selfReturn();
    }

    setDestination(destination){
        this.destination = destination;
        return this.selfReturn();
    }


    getDataWithoutPhoto(){
        console.log(this.local);
        if(this.password===undefined)
            return {
                username: this.username,
                first_name: this.first_name,
                last_name:this.last_name,
                matricule: this.matricule,
                CIN: this.CIN,
                telephone: this.telephone,
                password: 'a',
                statut: this.statut,
                local:this.local.id,
                role:this.role.id,
                adresse: this.adresse,
                destination: this.destination.id,
            }
        else
            return {
                username: this.username,
                first_name: this.first_name,
                last_name:this.last_name,
                matricule: this.matricule,
                CIN: this.CIN,
                telephone: this.telephone,
                password: this.password,
                statut: this.statut,
                local:this.local.id,
                role:this.role.id,
                adresse: this.adresse,
                destination: this.destination.id,
            }
    }

    getData(){
        return {
            username: this.username,
            first_name: this.first_name,
            last_name:this.last_name,
            matricule: this.matricule,
            CIN: this.CIN,
            telephone: this.telephone,
            password: this.password,
            statut: this.statut,
            photo : this.photo,
            local: this.local.id,
            role:this.role.id,
            adresse:this.adresse,
            destination:this.destination.id,
        }
    }

    getFormDataPhoto(){
        let formData = new FormData();
        formData.append('photo',this.photo);
        return formData;
    }

    getFormData(){
        let formData = new FormData();
        formData.append('username',this.username)
        formData.append('first_name',this.first_name)
        formData.append('last_name',this.last_name)
        formData.append('matricule',this.matricule)
        formData.append('CIN',this.CIN)
        formData.append('telephone',this.telephone)
        formData.append('password',this.password)
        formData.append('statut',this.statut)
        formData.append('photo',this.photo)
        formData.append('local',this.local.id)
        formData.append('role',this.role.id)
        formData.append('adresse',this.adresse)
        formData.append('destination',this.destination.id)
        return formData;
    }

    async save(){
        let personnel =  await this.service_save.post("api/creationpersonnels/",this.getFormData());
        let p = new Personnel(personnel.id,
            personnel.username,
            personnel.first_name,
            personnel.last_name,
            personnel.id,
            personnel.CIN,
            personnel.telephone,
            personnel.password,
            personnel.statut,
            personnel.photo,
            personnel.local,
            personnel.role,
            personnel.adresse,
            personnel.destination);
        p.update();
        return p;
    }

    async update(){
        console.log(this.getDataWithoutPhoto())
        let personnel = await this.service_save.put("api/personnels/",this.getDataWithoutPhoto(),this.id);
        if(this.photo.name){
            let photo = await this.service_save.put("api/personnelupdate/",this.getFormData(),this.id);
        }
        return personnel;
    }

    async delete(){
        await this.service_save.delete("api/personnels/",this.id);
    }

    static async get(pk){
        let personnel = await this.service.getSingle("api/personnels/",pk);
        return new Personnel(personnel.id,
                                personnel.username,
                                personnel.first_name,
                                personnel.last_name,
                                personnel.matricule,
                                personnel.CIN,
                                personnel.telephone,
                                personnel.password,
                                personnel.statut,
                                personnel.photo,
                                personnel.local,
                                personnel.role,
                                personnel.adresse,
                                personnel.destination);
    }

    static async getMany(){
        let personnels = await this.service.getMany("api/personnels/");
        let all_personnels = [];
        personnels.map(
            personnel => {
                let single_personnel = new Personnel(personnel.id,
                                        personnel.username,
                                        personnel.first_name,
                                        personnel.last_name,
                                        personnel.matricule,
                                        personnel.CIN,
                                        personnel.telephone,
                                        personnel.password,
                                        personnel.statut,
                                        personnel.photo,
                                        personnel.local,
                                        new Role(personnel.role.id,personnel.role.libelle_role),
                                        personnel.adresse,
                                        personnel.destination)
                all_personnels.push(single_personnel);
            }
        )
        console.log(all_personnels);
        return all_personnels;
    }

    static async recherchePersonnel(matricule){
        let personnels = await this.service.post("api/recherchepersonnels/",{'matricule':matricule});
        let all_personnels = [];
        personnels.map(
            personnel => {
                let single_personnel = new Personnel(personnel.id,
                                        personnel.username,
                                        personnel.first_name,
                                        personnel.last_name,
                                        personnel.matricule,
                                        personnel.CIN,
                                        personnel.telephone,
                                        personnel.password,
                                        personnel.statut,
                                        personnel.photo,
                                        personnel.local,
                                        personnel.role,
                                        personnel.adresse,
                                        personnel.destination)
                all_personnels.push(single_personnel);
            }
        )
        return all_personnels;
    }

    static async login(matricule,password){
        let personnel = await this.service.post("api/authentificationpersonnel/",
        JSON.stringify(
            {'matricule_personnel': matricule,
            'password_personnel': password}));
        return personnel;
    }

    constructor(id,username_personnel,
                first_name_personne,
                last_name_personnel,
                matricule_personnel="4567",
                CIN_personnel,
                telephone_personnel,
                password_personnel,
                statut_personnel=true,
                photo,
                local,
                role,
                adresse,
                destination){
        this.id = id;
        this.username = username_personnel;
        this.first_name = first_name_personne;
        this.last_name = last_name_personnel;
        this.matricule = matricule_personnel;
        this.CIN= CIN_personnel;
        this.telephone= telephone_personnel;
        this.password= password_personnel;
        this.statut= statut_personnel;
        this.photo = photo;
        this.local = local;
        this.role = role;
        this.adresse = adresse;
        this.destination = destination;
    }
}

export default Personnel