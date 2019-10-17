import React, { Component } from 'react'
import './thread.css'
import Chart from '../Chart'
import { Link } from "react-router-dom";
import ProfileService from "../../../services/profile";


export default class Thread extends Component {

    constructor(props){
        super(props)
        this.state={
            pet:this.props.pet,
            show:false,
            age:"",
            race:"",
            sex:"",
            castrated:"",
            addw:false,
            nweight:""
        }

        this.service = new ProfileService();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ ...this.state, pet: nextProps.pet })
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            show: false,
            addw: false,
        })
    }
    
    showForm(){
        this.setState({
            ...this.state,show:!this.state.show,
            age:this.props.pet.data.age ,
            race:this.props.pet.data.race,
            sex:this.props.pet.data.sex,
            castrated:this.props.pet.data.castrated,
        })
    }

    changeValue(e,campo){
        if(campo==="age")
       { 
           this.setState({
            ...this.state,
            age: e.target.value,
         })
        }else if(campo==="race"){
            this.setState({
                ...this.state,
                race: e.target.value,
            })
        }else if(campo==="sex"){
            this.setState({
                ...this.state,
                sex: e.target.value,
            })
        }else{
            this.setState({
                ...this.state,
                castrated: e.target.value,
            })
        }
    }

        editInfo(e){
        e.preventDefault()
        let x = [this.state.age,this.state.race, this.state.sex, this.state.castrated]
        this.service.updateDataPet(this.props.pet.owner, this.props.pet.name,x)
        .then((data)=>{
            this.setState({
                ...this.state,
                show: false,
            })
            this.props.getNewInfo(data)
         
        })

    }

    changew(){
        this.setState({
            ...this.state,
            addw: true,
        })
    }
    dontShowadd(){
        this.setState({
            ...this.state,
            addw: false,
        })
    }
    newWeight(e){
        e.preventDefault()
        console.log(this.state.pet)
        this.service.addWeight(this.state.nweight, this.state.pet.owner, this.state.pet.name)
       .then(pet=>{
           this.setState({
               ...this.state,
               pet: pet.pet,
               addw: false
           }, () => this.props.getNewInfoTwo(this.state.pet))
       })
        
    }
    changeInput(e){
        this.setState({
            ...this.state,
            nweight: e.target.value,
        })
    }




    render() {
        
        if(!!this.state.pet.name){
            if (this.props.role=="USER"){
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

                if(this.state.addw===false){
                return (
                    <div className="thread">
                        <h4>{this.props.pet.name}</h4>
                        <h5>{this.props.pet.type}</h5>
                        <div className="charts">
                            <Chart weight={this.props.pet.weight} />
                            <div onClick={()=>this.changew()} className="addwidth">Add weight +</div>
                            {!this.state.show &&
                                <div className="generals">
                                    <div>DATA <i onClick={() => this.showForm()} className="fa fa-pencil" aria-hidden="true"></i></div>
                                    <div>Age: {this.props.pet.data.age}</div>
                                    <div>Race: {this.props.pet.data.race}</div>
                                    <div>Sex: {this.props.pet.data.sex}</div>
                                    <div>Castrated: {this.props.pet.data.castrated}</div>
                                </div>
                            }

                            {this.state.show &&
                                <form className="generals">
                                    <div>DATA <i onClick={() => this.showForm()} class="fa fa-pencil" aria-hidden="true"></i></div>
                                    <input placeholder="Age" type="text" onChange={(e)=>{this.changeValue(e,"age")}} value={this.state.age}></input>
                                    <input placeholder="Race" type="text" onChange={(e)=>{this.changeValue(e,"race")}} value={this.state.race}></input>
                                    <input placeholder="Sex" type="text" onChange={(e)=>{this.changeValue(e,"sex")}} value={this.state.sex}></input>
                                    <input placeholder="Castrated" type="text" onChange={(e)=>{this.changeValue(e,"castrated")}} value={this.state.castrated}></input>
                                    <input type="submit" onClick={(e)=>{this.editInfo(e)}} value="Editar"></input>
                                </form>
                            }
                           
                        </div>
                        <div className="options">
                            <Link to="/consults">
                                <div>Historial de consultas</div>
                            </Link>
                            
                            {/* <Link to="/calendar">
                                <div>Calendario</div>
                            </Link> */}
                        </div>

                        
                            <div className="weight">
                            <i onClick={() => this.dontShowadd()} className="fa fa-times" aria-hidden="true"></i>
                                <form>
                                    <label htmlFor="weight">Weight(Kg):</label>
                                    <input placeholder="Weight" id="weight" type="text" />
                                    <button>Add weight</button>
                                </form>
                            </div>
                        

                    </div>
 
                )
                    }else{
                        return(
                            <div className="thread">
                                <h4>{this.props.pet.name}</h4>
                                <h5>{this.props.pet.type}</h5>
                                <div className="charts">
                                    <Chart weight={this.props.pet.weight} />
                                    <div onClick={() => this.changew()} className="addwidth">Add weight +</div>
                                    {!this.state.show &&
                                        <div className="generals">
                                            <div>DATA <i onClick={() => this.showForm()} className="fa fa-pencil" aria-hidden="true"></i></div>
                                            <div>Age: {this.props.pet.data.age}</div>
                                            <div>Race: {this.props.pet.data.race}</div>
                                            <div>Sex: {this.props.pet.data.sex}</div>
                                            <div>Castrated: {this.props.pet.data.castrated}</div>
                                        </div>
                                    }

                                    {this.state.show &&
                                        <form className="generals">
                                            <div>DATA <i onClick={() => this.showForm()} class="fa fa-pencil" aria-hidden="true"></i></div>
                                            <input placeholder="Age" type="text" onChange={(e) => { this.changeValue(e, "age") }} value={this.state.age}></input>
                                            <input placeholder="Race" type="text" onChange={(e) => { this.changeValue(e, "race") }} value={this.state.race}></input>
                                            <input placeholder="Sex" type="text" onChange={(e) => { this.changeValue(e, "sex") }} value={this.state.sex}></input>
                                            <input placeholder="Castrated" type="text" onChange={(e) => { this.changeValue(e, "castrated") }} value={this.state.castrated}></input>
                                            <input type="submit" onClick={(e) => { this.editInfo(e) }} value="Editar"></input>
                                        </form>
                                    }

                                </div>
                                <div className="options">
                                    <Link to="/consults">
                                        <div>Historial de consultas</div>
                                    </Link>

                                    {/* <Link to="/calendar">
                                <div>Calendario</div>
                            </Link> */}
                                </div>

                                <div className="weight show">
                                    <i onClick={() => this.dontShowadd()} className="fa fa-times" aria-hidden="true"></i>
                                    <form>
                                        <label htmlFor="weight">Weight(Kg):</label>
                                        <input onChange={(e)=>this.changeInput(e)} placeholder="Weight" id="weight" type="text" />
                                        <button onClick={(e)=>this.newWeight(e)}>Add weight</button>
                                    </form>
                                </div>
                            </div>
                        )
                    }
            }
            }else{
                return(
                    <div className="thread">
                        
                    <div className="nopet">Select a pet</div>
                    </div>
                )
            }
    }
}
