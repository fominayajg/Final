import React, { Component } from 'react'
import './vetsearch.css'
import ProfileService from "../../../services/profile";


export default class Vetsearch extends Component {

    constructor(props){
        super()
        this.state={
            pets: [],
            value:"",
            newpet:false,
            type:"",
            email:"",
            name:""
        }
        this.service = new ProfileService();
    }

    changeValue(e){
        
        this.setState({
            ...this.state,
            value: e.target.value
        },()=>this.Vetpet())
    }

    changeEmail(e){
        this.setState({
            ...this.state,
            email: e.target.value
        })
    }

    changeName(e){
        this.setState({
            ...this.state,
            name: e.target.value
        })
    }

    async createPet(e){
        e.preventDefault()
        const x = await this.service.createPet(this.state.type,this.state.email,this.state.name)
        this.setState({
            ...this.state,
            newpet: false
        })

    }

    changeAddpet(){
        this.setState({
            ...this.state,
            newpet: !this.state.newpet
        })
    }

    dontShow(){
        this.setState({
            ...this.state,
            newpet: false,
        })
    }

    checked(e){
        if(e.target.checked===true){
            this.setState({
                ...this.state,
                type: e.target.value
            })
        }
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
        if(this.state.newpet===false){
        return (
            <div className="vet">
                <div onClick={()=>this.changeAddpet()} className="addpet">Add a new pet +</div>
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
        )}else{
            return(
            <div className="vet add">
                    <i onClick={() => this.dontShow()} class="fa fa-times" aria-hidden="true"></i>
            <form>
                <label>Nombre</label>
                 <input onChange={(e) => this.changeName(e)} placeholder="Nombre:" type="text"/>
                <label>Email</label>
                <input onChange={(e) => this.changeEmail(e)} placeholder="Email:" type="text" />
                <div className="radio">
                      <label htmlFor="dog">Dog</label>
                    <input onChange={(e) => this.checked(e)} type="radio" name="pet" id="dog" value="DOG"></input>
                </div>

                <div className="radio">
                    <label htmlFor="cat">Cat</label>
                    <input onChange={(e) => this.checked(e)} type="radio" name="pet" id="cat" value="CAT"></input>
                </div>

                <div className="radio">
                <label htmlFor="exotic">Exotic</label>
                <input onChange={(e)=>this.checked(e)} type="radio" name="pet" id="exotic" value="EXOTIC"></input>
                </div>
                
                <button onClick={(e)=>this.createPet(e)}>Añadir</button>
            </form>
            </div>
            )
        }
    }
}
