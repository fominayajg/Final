import React, { Component } from 'react';
// import { Link } from "react-router-dom";
import ProfileService from "../../services/profile";
import Selector from './selector/Selector';
import Thread from './thread/Thread';
import { Switch, Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom"
import Consults from './consults/Consults';
import Reservations from './reservations/Reservations';
import Vetsearch from './vetsearch/Vetsearch';

class Contents extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: this.props.userInSession,
      userEmail: this.props.userInSession.email,
      clientEmail:"",
      pets: [],
      selectedPet:[]
    };

    this.service = new ProfileService();
  }




  componentDidMount() {
    this.getPets();
  }

  async getPets() {
    const petsArr = await this.service.allPets(this.state.userEmail)
    this.setState({...this.state, pets: petsArr.pet}) 
  }

  getNewInfo=(pet)=>{
    console.log(pet.pet)
    console.log(this.state.selectedPet)
    this.setState({ ...this.state, selectedPet: pet.pet }) 
  }


  selectPet(pet){
    this.setState({
      ...this.state,
      selectedPet: pet, clientEmail: pet.owner
    },()=>this.props.history.push("/home"))
    // this.renderRedirect()
  }

  renderRedirect = () => {

      this.props.history.push("/consult")
  
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] });
  }
  render() {

    if (this.state.loggedInUser.role==="USER") {
      return (
        
        <div className="container">

          <Selector selectPet={(pet) => this.selectPet(pet)} pets={this.state.pets} username={this.state.loggedInUser.username} />
          {/* <Thread pet={this.state.selectedPet} /> */}
          <Switch>
            <Route exact path="/home" render={() => <Thread role={this.state.loggedInUser.role} email={this.state.userEmail} pet={this.state.selectedPet} />} />
            <Route exact path="/consults" render={() => <Consults pet={this.state.selectedPet} />} />
            <Route exact path="/reservations" render={() => <Reservations user={this.state.userEmail} pet={this.state.selectedPet} />} />
          </Switch>
        </div>
      );

    }
    else{
      return(
        <div className="container">

          <Vetsearch selectPet={(pet) => this.selectPet(pet)}></Vetsearch>

          <Switch>
            <Route exact path="/home" render={() => <Thread selectPet={(pet)=>this.selectPet(pet)} role={this.state.loggedInUser.role} pet={this.state.selectedPet} getNewInfo={(data)=>{this.getNewInfo(data)}} />} />
            <Route exact path="/consults" render={() => <Consults pet={this.state.selectedPet} />} />
          </Switch>
        </div>
      )
    }

    // console.log(this.state.loggedInUser.role)
    
  }
}

export default withRouter(Contents);