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
    }
        this.service = new ProfileService();
}

        componentWillReceiveProps(nextProps) {
            this.setState({ ...this.state, pet: nextProps.pet })
        }

        setThread(thread){
            this.setState({ ...this.state, thread: thread,show:true })
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
        async newThread(e){
            e.preventDefault()
            const x = await this.service.newThread(this.props.pet.name, this.props.pet.owner, this.state.title)
        }

        title(e){
            this.setState({ ...this.state, title:e.target.value},()=>console.log(this.state.title))
        }

    render() {
        
        if(!this.state.show){
            if(this.props.user.role==="USER")
            {return (
                <div className="consults">
                    <Link to="/home"><i className="fa fa-arrow-left" aria-hidden="true"></i></Link>
                    <h4>Hilos de consultas</h4>
                    <div className="container">
                        {this.props.pet.thread.map((thread, idx) => <div key={idx} onClick={() => this.setThread(thread)} className="hilo">{thread.title}</div>)}
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
                            {this.props.pet.thread.map((thread, idx) => <div key={idx} onClick={() => this.setThread(thread)} className="hilo">{thread.title}</div>)}
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
                                {this.props.pet.thread.map((thread, idx) => <div key={idx} onClick={() => this.setThread(thread)} className="hilo">{thread.title}</div>)}
                            </div>
                        </div>
                    )
                }
            }
        }
        else{
            return(
                <div className="consults">
                   
                    <i onClick={()=>this.hide()} className="fa fa-arrow-left" aria-hidden="true"></i>
                    <h4>{this.state.thread.title}</h4>
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
                                    trigger={() => <a href="#"><i class="fa fa-print" aria-hidden="true"></i></a>}
                                    content={() => this.componentRef}
                                />
                        </div>
                        )})}
                        {/* <div>{this.state.thread.consultas[0].date}</div> */}

                        
                    </div>
                </div>
            )
        }
        
    }
}
export default withRouter(Consults);