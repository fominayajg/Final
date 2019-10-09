import React, { Component } from 'react'
import './Thread.css'
import Chart from '../Chart'
import { Link } from "react-router-dom";


export default class Thread extends Component {

    constructor(props){
        super(props)
        this.state={
            pet:this.props.pet
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ ...this.state, pet: nextProps.pet })
    }
    // age: "4 Years"
    // castrated: "Yes"
    // race: "Mix"
    // sex: "M"
    render() {
        if(!!this.state.pet.name){
            return (
                <div className="thread">
                    <h4>{this.props.pet.name}</h4>
                    <h5>{this.props.pet.type}</h5>
                    <div className="charts">
                        <Chart weight={this.props.pet.weight} />
                        <div className="generals">
                            <div>DATA</div>
                            <div>Age: {this.props.pet.data.age}</div>
                            <div>Race: {this.props.pet.data.race}</div>
                            <div>Sex: {this.props.pet.data.sex}</div>
                            <div>Castrated: {this.props.pet.data.castrated}</div>
                            
                        </div>
                    </div>
                    <div className="options">
                        <Link to="/consults">
                            <div>Historial de consultas</div>
                        </Link>
                        <Link to="/reservations">
                            <div>Reserva una consulta</div>
                        </Link>
                        <Link to="/calendar">
                            <div>Calendario</div>
                        </Link>
                    </div>
                </div>
            
        )
            }else{
                return(
                    <div className="thread">
                        
                    <div className="nopet">Select a pet</div>
                    </div>
                )
            }
    }
}
