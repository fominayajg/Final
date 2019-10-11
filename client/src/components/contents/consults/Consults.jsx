import React, { Component } from 'react'
import './Consults.css'
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import ReactToPrint from "react-to-print";

 class Consults extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pet: this.props.pet,
            thread:[],
            show:false
    }
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

    render() {
        
        if(!this.state.show){
            return (
                <div className="consults">
                    <Link to="/home"><i className="fa fa-arrow-left" aria-hidden="true"></i></Link>
                    <h4>Hilos de consultas</h4>
                    <div className="container">
                        {this.props.pet.thread.map((thread, idx) => <div key={idx} onClick={() => this.setThread(thread)} className="hilo">{thread.title}</div>)}
                    </div>
                </div>
            )
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