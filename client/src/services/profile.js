import axios from 'axios';

class ProfileService {
    constructor() {
        this.service = axios.create({
            baseURL: 'http://localhost:3010/profile',
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

}

export default ProfileService;