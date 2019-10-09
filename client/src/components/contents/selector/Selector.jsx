import React, { Component } from 'react'
import './Selector.css'

export default class Selector extends Component {
    constructor(props){
        super()
    }
    render() {
        // this.props.pets[index]
        return (
            <div className="selector">
                <div>{this.props.username}</div>
                <ul>
                    <li>Your pets</li>
                    {this.props.pets.map((pet, index) => <li onClick={() => this.props.selectPet(this.props.pets[index])} className="pet">{pet.name}</li>)}
                </ul>
                
            </div>
        )
    }
}
