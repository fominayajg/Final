import axios from 'axios';


class ProfileService {
    constructor() {
        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/profile`,
            withCredentials: true
        });
    }

    allPets = (user) => {
        return this.service.get(`/pets/${user}`)
            .then(response => response.data)
    }

    allReservations=(date)=>{
        
        return this.service.get(`/reservations/${date}`)
        .then(response=>response.data)
    }
    createReservation = (hour,date,pet,user) => {

        // console.log(hour,date)
        return this.service.get(`/createreservations/?date=${date}&hour=${hour}&pet=${pet}&user=${user}`)
            .then(response => response.data)
    }

    searchVetPet(email){
        return this.service.get(`/search/${email}`)
            .then(response => response.data)
    }

    updateDataPet(email,petName,data){
        // console.log(data[0])
        return this.service.get(`/updatepet/?email=${email}&name=${petName}&age=${data[0]}&race=${data[1]}&sex=${data[2]}&castrated=${data[3]}`)
            .then(response => response.data)
    }


}

export default ProfileService;