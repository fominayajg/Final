import React, { Component } from 'react'
import './Consults.css'
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import ReactToPrint from "react-to-print";
import ProfileService from "../../../services/profile";

 class Consults extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pet: this.props.pet,
            thread:[],
            show:false,
            showform:false,
            title:"",
            key:null,
            showncons:false,
            desc:"",
            esp:"",
            indi:"",
    }
        this.service = new ProfileService();
}

        componentWillReceiveProps(nextProps) {
            this.setState({ ...this.state, pet: nextProps.pet })
        }

        setThread(thread,idx){

            this.setState({ ...this.state, thread: thread,show:true,key:idx })
        }

        hide(){
            this.setState({ ...this.state, show: false })
        }

        showform(){
            this.setState({ ...this.state, showform: true })
        }
        hideform() {
            this.setState({ ...this.state, showform: false })
        }
        newThread(e){
            
            e.preventDefault()
            this.service.newThread(this.props.pet.name, this.props.pet.owner, this.state.title)
            .then((data)=>{
                
                this.setState({
                    ...this.state,
                    pet: data.pet,

                    showform: false,
                })
                this.props.getNewInfoTwo(data.pet)
            })
        }

        title(e){
            this.setState({ ...this.state, title:e.target.value})
        }

        showAddcons(){
            this.setState({ ...this.state, showncons:true})
        }
        hidecons(){
            this.setState({ ...this.state, showncons: false })
        }
        newConsult(e){
            e.preventDefault()
            this.service.newConsult(this.props.pet.name, this.props.pet.owner, this.state.esp, this.state.indi, this.state.desc,this.state.key)
                .then((data) => {
                    console.log(this.state.thread)
                    console.log(data.pet.thread[this.state.key])
                    this.setState({
                        ...this.state,
                        pet: data.pet.pet,
                        thread:data.pet.thread[this.state.key],
                        showncons: false,
                    })
                    this.props.getNewInfoTwo(data.pet)
                })
        }
        changeDesc(e){
            this.setState({ ...this.state, desc: e.target.value })
        }
        changeEsp(e){
            this.setState({ ...this.state, esp: e.target.value })
        }
        changeIndi(e){
            this.setState({ ...this.state, indi: e.target.value })
        }

    render() {
        
        if(!this.state.show){
            if(this.props.user.role==="USER")
            {return (
                <div className="consults">
                    <Link to="/home"><i className="fa fa-arrow-left" aria-hidden="true"></i></Link>
                    <h4>Hilos de consultas</h4>
                    <div className="container">
                        {this.props.pet.thread.map((thread, idx) => <div key={idx} onClick={() => this.setThread(thread,idx)} className="hilo">{thread.title}</div>)}
                    </div>
                </div>
            )}
            else{
                if(!this.state.showform)
                {return (
                    <div className="consults">
                        <div className="form">
                            <div className="filtro"></div>
                            <form>
                                <input type="text" placeholder="Titulo del nuevo hilo"></input>
                            </form>
                        </div>
                        <Link to="/home"><i className="fa fa-arrow-left" aria-hidden="true"></i></Link>
                        <h4>Hilos de consultas</h4>
                        <h5 onClick={()=>this.showform()}>Crear nuevo hilo +</h5>
                        <div className="container">
                            {this.props.pet.thread.map((thread, idx) => <div key={idx} onClick={() => this.setThread(thread,idx)} className="hilo">{thread.title}</div>)}
                        </div>
                    </div>
                )}else{
                    return (
                        <div className="consults">
                            <div className="form show">
                                <div className="filtro"><i onClick={() => this.hideform()} class="fa fa-times" aria-hidden="true"></i></div>
                                <form>
                                    <div>Añade un titulo</div>
                                    <input onChange={(e)=>this.title(e)} type="text" placeholder="Titulo del nuevo hilo"></input>
                                    <input onClick={(e)=>this.newThread(e)} type="submit" value="Nuevo hilo"></input>
                                </form>
                            </div>
                            <Link to="/home"><i className="fa fa-arrow-left" aria-hidden="true"></i></Link>
                            <h4>Hilos de consultas</h4>
                            <h5 onClick={() => this.showform()}>Crear nuevo hilo +</h5>
                            <div className="container">
                                {this.props.pet.thread.map((thread, idx) => <div key={idx} onClick={() => this.setThread(thread,idx)} className="hilo">{thread.title}</div>)}
                            </div>
                        </div>
                    )
                }
            }
        }
        else{
            if(!this.state.showncons){
            return(
                <div className="consults">
                   
                    <i onClick={()=>this.hide()} className="fa fa-arrow-left" aria-hidden="true"></i>
                    <h4>{this.state.thread.title}</h4>
                    {this.props.user.role==="VET" &&
                    <h6 onClick={()=>this.showAddcons()}>Nueva consulta +</h6>
                    }
                    <div className="containerdos">
                        {this.state.thread.consultas.map(consulta =>{return(
                            
                            <div ref={el => (this.componentRef = el)} className="consulta">
                               
                            <div className="fecha">
                                <div>{consulta.date}</div>
                                <div className="esp">{consulta.esp}</div>
                            </div>
                            <div className="description">
                                    Description:<br></br><br></br>
                                {consulta.description}
                            </div>
                            <div className="indications">
                                    Indications:<br></br><br></br>
                                {consulta.indications}
                            </div>
                                <ReactToPrint
                                    trigger={() => <a href="#"><i className="fa fa-print" aria-hidden="true"></i></a>}
                                    content={() => this.componentRef}
                                />
                        </div>
                        )})}
                        {/* <div>{this.state.thread.consultas[0].date}</div> */}

                        <form className="formy">
                           
                        </form>
                    </div>
                </div>
            )
            }else{
                return (
                    <div className="consults">

                        <i onClick={() => this.hide()} className="fa fa-arrow-left" aria-hidden="true"></i>
                        <h4>{this.state.thread.title}</h4>
                        {this.props.user.role === "VET" &&
                            <h6 onClick={() => this.showAddcons()}>Nueva consulta +</h6>
                        }
                        <div className="containerdos">
                            {this.state.thread.consultas.map(consulta => {
                                return (

                                    <div ref={el => (this.componentRef = el)} className="consulta">

                                        <div className="fecha">
                                            <div>{consulta.date}</div>
                                            <div className="esp">{consulta.esp}</div>
                                        </div>
                                        <div className="description">
                                            Description:<br></br><br></br>
                                            {consulta.description}
                                        </div>
                                        <div className="indications">
                                            Indications:<br></br><br></br>
                                            {consulta.indications}
                                        </div>
                                        <ReactToPrint
                                            trigger={() => <a href="#"><i className="fa fa-print" aria-hidden="true"></i></a>}
                                            content={() => this.componentRef}
                                        />
                                    </div>
                                )
                            })}
                            {/* <div>{this.state.thread.consultas[0].date}</div> */}
                            <form className="formy mostrar">
                                <i onClick={() => this.hidecons()} class="fa fa-times" aria-hidden="true"></i>
                                <div>
                                    Nueva Consulta
                                    <label htmlFor="esp">Especialidad</label>
                                    <input onChange={(e)=>this.changeEsp(e)} placeholder="Especialidad:" id="esp" type="text"/>
                                    <label htmlFor="desc">Descripción</label>
                                    <textarea onChange={(e)=>this.changeDesc(e)} placeholder="Descripción:" id="desc" ></textarea>
                                    <label htmlFor="indic">Indicaciones</label>
                                    <textarea onChange={(e)=>this.changeIndi(e)} placeholder="Indicaciones:" id="indic" ></textarea>
                                    <button onClick={(e)=>this.newConsult(e)}>Crear consulta</button>
                                </div>
                            </form>

                        </div>
                    </div>
                )
            }
        }
        
    }
}
export default withRouter(Consults);