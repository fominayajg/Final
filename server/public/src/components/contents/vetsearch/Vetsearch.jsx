import React, { Component } from 'react'
import './vetsearch.css'
import ProfileService from "../../../services/profile";


export default class Vetsearch extends Component {

    constructor(props){
        super()
        this.state={
            pets: [],
            value:""
        }
        this.service = new ProfileService();
    }

    changeValue(e){
        
        this.setState({
            ...this.state,
            value: e.target.value
        },()=>this.Vetpet())
    }

    async Vetpet(){
        const x = await this.service.searchVetPet(this.state.value)
        

        this.setState({
            ...this.state,
            pets: x.pets
        })
    }

    componentWillUpdate(){
        this.Vetpet();
    }

    render() {
        return (
            <div className="vet">

                <form>
                    <label>Busca el email de un usuario</label>
                    <input value={this.value} onChange={(e)=>this.changeValue(e)} placeholder="Email" type="text"></input>
                </form>

            {!!this.state.pets &&(
                    <ul>
                        <li>Pets :</li>
                        {this.state.pets.map((pet, index) => <li className="pet" onClick={() => this.props.selectPet(this.state.pets[index])}>
                            <p>{pet.name}</p>
                            <p>{pet.owner}</p>
                        </li>)}
                    </ul>
            
            )}
                
            </div>
        )
    }
}
