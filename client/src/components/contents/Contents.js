import React, { Component } from 'react';
// import { Link } from "react-router-dom";
import ProfileService from "../../services/profile";
import Selector from './selector/Selector';
import Thread from './thread/Thread';
import { Switch, Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom"
import Consults from './consults/Consults';

class Contents extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: this.props.userInSession,
      userEmail: this.props.userInSession.email,
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


  selectPet(pet){

    this.setState({
      ...this.state,
      selectedPet: pet
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


    // console.log(this.state.loggedInUser)
    return (

      <div className="container">
        
        <Selector selectPet={(pet)=>this.selectPet(pet)} pets={this.state.pets} username={this.state.loggedInUser.username} />
        {/* <Thread pet={this.state.selectedPet} /> */}
        <Switch>
          <Route exact path="/home" render={() => <Thread pet={this.state.selectedPet} />} />
          <Route exact path="/consults" render={() => <Consults pet={this.state.selectedPet} />} />
        </Switch>
      </div>
    );

  }
}

export default withRouter(Contents);