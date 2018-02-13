import React, { Component } from 'react';
import { connect } from "react-redux";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import LoginComponent from '../login/Login';
import MyTestsComponent from '../myTests/MyTests';
import AuthComponent from '../auth/Auth'
import ProfileComponent from '../profile/Profile';
import TestComponent from '../test/Test';
import ParticipantsComponent from '../participants/Participants';
import TestEvalComponent from '../testEval/TestEval';
import TestResultsComponent from '../testResults/TestResults';
import FilterTestTeamComponent from '../filterTestTeam/filterTestTeam'

import { getUserProfile } from '../../store/userProfile/selectors';
import { updateProfile } from '../../store/userProfile/actions';

import './App.css';
import { Navbar, Nav, NavItem, NavLink, NavbarToggler, Collapse } from "reactstrap";

import { isAuthenticated } from '../../utils/auth.services'
import { loadTokenAndFetchUser } from '../../utils/user.services'


class App extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  componentDidMount() {
    loadTokenAndFetchUser()
    .then(
      userInfos => {
        this.props.handleUserInfo(userInfos)
      }
    )
    .catch(e => console.warn(e));
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (

      <Router>
        <div className="container-fluid  content-general">
          <div className="row header-row">
            <div className=" pt-3 ml-3">
              <img className="logo" src={ require("../../images/logo.png")} alt="logo"/>
            </div>
            <div className="pt-3 ml-3">
              <Navbar light className="p-0" expand="md">
                <NavbarToggler className="bg-white" onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav pills className="ml-auto" navbar>
                    <NavItem className="">
                      <NavLink className="text-white" href="/profile">PROFILE</NavLink>
                    </NavItem>
                    <NavItem className="">
                      <NavLink className="text-white" href="/testsoroks">TESTS OROKS</NavLink>
                    </NavItem>
                    <NavItem className="">
                      <NavLink className="text-white" href="/mytests">MES TESTS</NavLink>
                    </NavItem>
                    {(this.props.userProfile.user_type==="ENGINEER") ? (
                        <NavItem className="">
                          <NavLink className="text-white" href="/alltests">TOUS LES TESTS</NavLink>
                        </NavItem>
                    ):(null)}
                    {(this.props.userProfile.user_type==="ENGINEER") ? (
                      <NavItem className="">
                        <NavLink className="text-white" href="/newtest">CREER UN TEST</NavLink>
                      </NavItem>
                    ):(null)}
                    {(this.props.userProfile.user_type==="ENGINEER") ? (
                      <NavItem className="">
                        <NavLink className="text-white" href="/community">COMMUNAUTE</NavLink>
                      </NavItem>
                    ):(null)}
                  </Nav>
                </Collapse>
              </Navbar>
            </div>
          </div>

          <div>
            <Switch>
              <PrivateRoute exact path="/" component={MyTestsComponent}/>
              <Route path="/login" component={LoginComponent}/>
              <Route path="/mytests" component={MyTestsComponent}/>
              <Route path={"/auth/redirect"} component={AuthComponent}></Route>
              <PrivateRoute path="/newtest" component={TestComponent}/>
              <Route path="/profile" component={ProfileComponent}/>
              <PrivateRoute path="/test/:id/participants" component={ParticipantsComponent}/>
              <PrivateRoute path="/test/:id/selection" component={FilterTestTeamComponent}/>
              <Route path="/test/:id/eval" component={TestEvalComponent}/>
              <PrivateRoute path="/test/:id/results" component={TestResultsComponent}/>
              <PrivateRoute path="/test/:id" component={TestComponent}/>
            </Switch>

          </div>

        </div>
      </Router>
    );
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    (isAuthenticated()) ? (
      <Component {...props}/>
    ) : (
      <Route component={LoginComponent}></Route>
    )
  )}/>
)


const AppComponent = connect(getUserProfile, updateProfile)(App)
export {App, AppComponent};
