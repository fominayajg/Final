import React, { Component } from 'react'
import './Reservations.css'
import ProfileService from "../../../services/profile";
import { Link } from "react-router-dom";

export default class Reservations extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pet: this.props.pet,
            date:"",
            reservations:[],
            hour:"",
            show:false,
            existe:false,
            ok:false,
            
        }
        this.service = new ProfileService();
    }

    

    async getReservations(date){
        
        const reservationsArr = await this.service.allReservations(date)
        this.setState({ ...this.state, reservations: reservationsArr , show:true}) 
    }

    updateDate(e){
        
        this.setState({
            ...this.state,
            date:e.target.value
        },()=>{this.getReservations(this.state.date)})
    }

    checkHour(){
        let existe=false
        for(var i=0;i<this.state.reservations.consulta.length;i++){
            if (this.state.hour == this.state.reservations.consulta[i].time){
                existe=true
            }
        }
        if(existe==false){
            this.setState({
                ...this.state,
                ok: true,
                existe:false
            })
        }else{
            this.setState({
                ...this.state,
                existe: true,
                ok:false
            })
        }
    }

    updateHour(e){
        this.setState({
            ...this.state,
            hour: e.target.value
        }, () => { this.checkHour() })
    }

    render() {
        return (
            <div className="reservations">
                <Link to="/home"><i className="fa fa-arrow-left" aria-hidden="true"></i></Link>
                <form>
                    <h4>Pide cita para {this.state.pet.name}</h4>
                    <input type="hidden" name="pet" value={this.state.pet.name}></input>
                    <input type="hidden" name="email" value={this.props.user}></input>
                    <label htmlFor="start">Elige un día</label>
                    <input type="date" id="start" name="trip-start"
                        value={this.state.date}
                        min="2019-10-18" 
                        onChange={(e)=>this.updateDate(e)}>
                    </input>
                    
                    {this.state.show &&(
                        <React.Fragment>
                            <label htmlFor="appt">Elige una hora:</label>
                            <input step="900" onChange={(e) => this.updateHour(e)} type="time" id="appt" name="appt"
                                min="09:00" max="18:00" required></input>
                        </React.Fragment>
                    )}
                    
                    {this.state.existe && (
                        <p>Esta hora está ocupada</p>
                    )}

                    {this.state.ok &&(
                        <input type="submit" value="OK"></input>
                    )}
                    
                </form>  

                
            </div>
        )
    }
}
