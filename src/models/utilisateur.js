import Reservation from "./reservation";
import ServiceCRUD from "../services/crud";

export class Client{
    service_save = new ServiceCRUD();
    static service = new ServiceCRUD();
    photo = ""

    ///////////////////////////instance d'une nouvelle classe/////////////////////////////

    selfReturn(){
        return new Client(this.id,this.username,this.last_name,
            this.first_name,this.CIN,
            this.telephone,
            this.statut,this.sexe,
            this.adresse, this.password, this.photo,this.temperature,this.reporter);
    }

    //////////////////////////fonction de modification des attributs de la classe/////////////////////////////

    setUserName(){
        this.username = this.first_name + " " + this.last_name;
        return this.selfReturn();
    }

    setLastName(lastname){
        this.last_name = lastname;
        this.setUserName();
        return this.selfReturn();
    }

    setFirstName(firstname){
        this.first_name = firstname;
        this.setUserName();
        return this.selfReturn();
    }

    setTelephone(telephone_utilisateur){
        this.telephone = telephone_utilisateur;
        return this.selfReturn();
    }

    setCIN(CIN){
        this.CIN = CIN;
        return this.selfReturn();
    }

    setStatutUtilisateur(statut){
        this.statut = statut;
        return this.selfReturn();
    }

    setSexe(sexe){
        this.sexe = sexe;
        return this.selfReturn();
    }

    setAdresse(adresse){
        this.adresse = adresse;
        return this.selfReturn();
    }

    setPassword(password){
        this.password = password;
        return this.selfReturn();
    }

    setPhoto(photo){
        this.photo = photo;
        return this.selfReturn();
    }

    setTemperature(temperature){
        this.temperature = temperature;
        return this.selfReturn();
    }

    setReporter(reporter){
        this.reporter = reporter;
        return this.selfReturn();
    }

    ///////////////////////////modelisation des donnees a transferer vers l'api/////////////////////////////

    getDataWithoutPhoto(){
        return {
            id : this.id,
            username: this.username,
            first_name: this.first_name,
            last_name: this.last_name,
            CIN: this.CIN,
            telephone: this.telephone,
            statut: this.statut,
            temperature: this.temperature,
            reporter: this.reporter,
            adresse: this.adresse,
            sexe: this.sexe,
        }
    }

    getDataWithoutPhotoWithPassword(){
        return {
            id : this.id,
            username: this.username,
            first_name: this.first_name,
            last_name: this.last_name,
            CIN: this.CIN,
            telephone: this.telephone,
            statut: this.statut,
            adresse: this.adresse,
            sexe: this.sexe,
            temperature: this.temperature,
            reporter: this.reporter,
            password: this.password,
        }
    }

    getData(){
        return {
            id : this.id,
            username: this.username,
            first_name: this.first_name,
            last_name: this.last_name,
            CIN: this.CIN,
            telephone: this.telephone,
            statut: this.statut,
            adresse: this.adresse,
            sexe: this.sexe,
            temperature: this.temperature,
            reporter: this.reporter,
            photo: this.photo,
        }
    }

    getDataWithPassword(){
        return {
            id : this.id,
            username: this.username,
            first_name: this.first_name,
            last_name: this.last_name,
            CIN: this.CIN,
            telephone: this.telephone,
            statut: this.statut,
            adresse: this.adresse,
            sexe: this.sexe,
            photo: this.photo,
            temperature: this.temperature,
            reporter: this.reporter,
            password: this.password,
        }
    }

    getFormDataPhoto(){
        let formData = new FormData();
        formData.append('photo',this.photo,this.first_name+"_"+this.last_name+".jpg");
        return formData;
    }

    getFormData(){
        let formData = new FormData();
        formData.append('username',this.username);
        formData.append('last_name',this.last_name);
        formData.append('first_name', this.first_name);
        formData.append('CIN', this.CIN);
        formData.append('telephone', this.telephone_utilisateur);
        formData.append('sexe', this.sexe);
        formData.append('adresse', this.adresse);
        formData.append('statut', this.statut_utilisateur);
        formData.append('temperature', this.temperature);
        formData.append('reporter', this.reporter);
        formData.append('photo', this.photo, this.last_name+"_"+this.first_name+".jpg");
        return formData;
    }

    ///////////////////////////utilisation du serviceCRUD/////////////////////////////
        ///////////////sauvegarde des donnees////////////////////
    async save(){
        return await this.service_save.post("client/creationclients",this.getFormData());
    }

    async savewithoutPhoto(){
        return await this.service_save.post("client/",this.getDataWithoutPhotoWithPassword());
    }

    async getReservation(){
        let reservations = await this.service_save.getSingle("client/getreservationsclient/",this.id);
        console.log(reservations);
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
                    reservation.voiture);
                all_reservations.push(single_reservation);
            }
        )
        return all_reservations;
    }

    async getfantome(){
        let customer = await this.service_save.getMany("api/getfantome/");
        let cust = new Client(customer.id,customer.username,customer.last_name,
            customer.first_name,customer.CIN,
            customer.telephone,
            customer.statut,customer.sexe,
            customer.adresse, customer.password, customer.photo,
            customer.temperature,customer.reporter)
        return cust;

    }

    static async getClientWithName(firstName){
        let allName = []
        let customers = []
        await this.service.post("client/allClientname/", {'firstname' : firstName}).then(
            (responses) => {
                for (let i = 0; i < (responses?responses:[]).length; i++) {
                    let customer = new Client(
                        responses[i].id,
                        responses[i].username,
                        responses[i].last_name,
                        responses[i].first_name,
                        responses[i].CIN,
                        responses[i].telephone,
                        responses[i].statut,
                        responses[i].sexe,
                        responses[i].adresse,
                        responses[i].password,
                        responses[i].photo,
                        responses[i].temperature,
                        responses[i].reporter
                        )
                    customers.push(customer);
                    allName.push(customer.first_name);
                }   
            }, error => {
                console.log(error)
            }
        )
        console.log(customers)
        return {
            'clients': customers,
            'names': allName
        }
    }

        ///////////////mise a jour des donnees///////////////////
    async update(){
        let customer = await this.service_save.put("client/",this.getDataWithoutPhoto(),this.id);
        if(this.photo.name)
            return await this.service_save.put("client/photo/",this.getFormDataPhoto(),this.id);
    }

        /////////////////////////methode static////////////////////////////////////
            //////////appel methode get pour obtenir un seul classe//////////////
    static async get(pk){
        let customer = await this.service.getSingle("client/",pk);
        let cust = new Client(customer.id,customer.username,customer.last_name,
            customer.first_name,customer.CIN,
            customer.telephone,
            customer.statut,customer.sexe,
            customer.adresse, customer.password, customer.photo,
            customer.temperature,customer.reporter)
        return cust;
    }

            //////////appel methode get pour obtenir tous les classes////////////
    static async getMany(){
        let customers = await this.service.getMany("client/");
        let all_customers = [];
        customers.map(
            customer => {
                let cust = new Client(customer.id,customer.username,customer.last_name,
                    customer.first_name,customer.CIN,
                    customer.telephone,
                    customer.statut,customer.sexe,
                    customer.adresse, customer.password, customer.photo);
                all_customers.push(cust);
            }
        )
        return all_customers;
    }

    static async login(data){
        console.log(data);
        return await this.service.post("client/login/",JSON.stringify(data))       
    }

    static async changePassword(data,pk){
        console.log(data);
        return await this.service.put("client/password/",JSON.stringify(data),pk);
    }

            //////////effacer la classe///////////////////////////////////////////////////////
    static async deleteClient(pk){
        await this.service.delete("client/",pk)
    }

    ///////////////////////////constructeur classe/////////////////////////////

    constructor(id,username,last_name,
                first_name,CIN,
                telephone_utilisateur,
                statut_utilisateur=false,sexe,
                adresse, password='a', photo="",temperature=0,reporter=false){
        this.id = id;
        this.username = username;
        this.last_name = last_name;
        this.first_name = first_name;
        this.CIN = CIN;
        this.sexe = sexe;
        this.telephone = telephone_utilisateur;
        this.statut = statut_utilisateur;
        this.adresse = adresse;
        this.password = password;
        this.temperature = temperature;
        this.reporter = reporter;
    }
}

export default Client;