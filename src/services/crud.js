import axios from "axios";

export class ServiceCRUD{
    //baseUrlImage = "http://192.168.88.22:8000"
    //baseUrl = "http://192.168.88.22:8000/";
    //baseUrlImage = "http://10.42.0.1:8000"
    //baseUrl = "http://10.42.0.1:8000/";
    baseUrlImage = "https://back.soatrans.com"
    baseUrl = "https://back.soatrans.com/"


    async post(uri,data){
        return await axios.post(this.baseUrl+uri,data).then(
            response => {
                return response.data;
            }, error => {
                console.log(error)
            }
        )
    }

    async getSingle(uri, pk){
        return await axios.get(this.baseUrl+uri+pk).then(
            response => {
                return response.data;
            }
        )
    }

    async getMany(uri){
        return await axios.get(this.baseUrl+uri).then(
            response => {
                return response.data;
            }
        )
    }

    async put(uri,data,pk){
        return await axios.put(this.baseUrl+uri+pk,data).then(
            response => {
                return response.data;
            }
        )
    }

    async putSpecial(uri,data){
        return await axios.put(this.baseUrl+uri,data).then(
            response => {
                return response;
            }
        )
    }

    delete(uri,pk){
        axios.delete(this.baseUrl+uri+pk).then(
            response => {
                console.log(response);
            }
        )
    }
}

export default ServiceCRUD