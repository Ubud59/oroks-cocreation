import React, { Component } from 'react';
import { connect } from "react-redux";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import MyTestsComponent from '../myTests/MyTests';
import AllTestsComponent from '../AllTests/Alltests';
import AuthComponent from '../auth/Auth'
import HomeComponent from './Home';
import LoginComponent from './Login';
import ProfileComponent from '../profile/Profile';
import TestComponent from '../test/Test';
import ParticipantsComponent from '../participants/Participants';
import TestEvalComponent from '../testEval/TestEval';
import TestResultsComponent from '../testResults/TestResults';
import FilterTestTeamComponent from '../filterTestTeam/filterTestTeam'
import TestOroksComponent from '../testsoroks/TestOroks';

import { getUserProfile } from '../../store/userProfile/selectors';
import { updateProfile } from '../../store/userProfile/actions';

import './App.css';
import { Navbar, Nav, NavItem, NavLink, NavbarToggler, NavbarBrand, Collapse } from "reactstrap";

import { isAuthenticated } from '../../utils/auth.services'
import { loadTokenAndFetchUser } from '../../utils/user.services'
import { getRedirectUri, getNewAccountUri } from '../../utils/auth.services'

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
          {
            (this.props.userProfile.id)
            ? (
              <div className="row header-row">
                <div className="bg-navbar">
                  <div className="bg-navbar-container">

                    <Navbar light expand="md">
                      <NavbarBrand href="/">
                        <img src={ require("../../images/logo.png")} alt="Decathlon Oroks" className="logo"/>
                      </NavbarBrand>
                      <NavbarToggler className="bg-white" onClick={this.toggle} />
                      <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav pills className="ml-auto" navbar>
                          <NavItem className="">
                            <NavLink className="text-white mx-2 text-nowrap" href="/profile">PROFILE</NavLink>
                          </NavItem>
                          <NavItem className="">
                            <NavLink className="text-white mx-2 text-nowrap" href="/testoroks">TESTS OROKS</NavLink>
                          </NavItem>
                          <NavItem className="">
                            <NavLink className="text-white mx-2 text-nowrap" href="/mytests">MES TESTS</NavLink>
                          </NavItem>
                          {(this.props.userProfile.user_type==="ENGINEER") ? (
                              <NavItem className="">
                                <NavLink className="text-white mx-2 text-nowrap" href="/alltests">TOUS LES TESTS</NavLink>
                              </NavItem>
                          ):(null)}
                          {(this.props.userProfile.user_type==="ENGINEER") ? (
                            <NavItem className="">
                              <NavLink className="text-white mx-2 text-nowrap" href="/newtest">CREER UN TEST</NavLink>
                            </NavItem>
                          ):(null)}
                          {(this.props.userProfile.id)
                            ?
                            <NavItem className="">
                              <NavLink onClick={() => this.props.signOut()} className="text-white mx-2 text-nowrap" href="#">SIGNOUT</NavLink>
                            </NavItem>
                            :
                            <NavItem className="align-signin-actions">
                              <NavLink className="text-white mx-2 text-nowrap" onClick={() => window.location = getRedirectUri()} href="#">CONNEXION</NavLink>
                              <NavLink className="text-white mx-2 text-nowrap" onClick={() => window.location = getNewAccountUri()} href="#">INSCRIPTION</NavLink>
                            </NavItem>
                          }
                        </Nav>

                      </Collapse>
                    </Navbar>
                  </div>
                </div>
              </div>
            ):(
              null
            )
          }

          <div>
            <Switch>
              <PrivateRoute exact path="/" component={HomeComponent}/>
              <Route path={"/auth/redirect"} component={AuthComponent}></Route>
              <PrivateRoute path="/home" component={HomeComponent}/>
              <PrivateRoute path="/profile" component={ProfileComponent}/>
              <PrivateRoute path="/mytests" component={MyTestsComponent}/>
              <PrivateRoute path="/alltests" component={AllTestsComponent}/>
              <PrivateRoute path="/newtest" component={TestComponent}/>
              <PrivateRoute path="/testoroks" component={TestOroksComponent}/>
              <PrivateRoute path="/test/:id/participants" component={ParticipantsComponent}/>
              <PrivateRoute path="/test/:id/selection" component={FilterTestTeamComponent}/>
              <PrivateRoute path="/test/:id/eval" component={TestEvalComponent}/>
              <PrivateRoute path="/test/:id/results" component={TestResultsComponent}/>
              <PrivateRoute path="/test/:id" component={TestComponent}/>
            </Switch>
          </div>

          <footer>
              <div className="footer-top">
                 <div className="container">
                 </div>
              </div>

              <div className="container">
                  <div className="row text-center">
                      <div className="col-lg-12 col-lg-offset-3">
                            <ul className="menu">
                                   <li>
                                     <div className="col-lg-6 col-xs-6 text-center">
                                         <a href="https://www.facebook.com/Oroks.by.Decathlon/"><i className="fa fa-facebook fa-2x"></i>Facebook</a>
                                     </div>
                                    </li>

                                    <li>
                                      <div className="col-lg-6 col-xs-6 text-center">
                                         <a href="https://www.instagram.com/oroks_by_decathlon/?hl=fr"><i className="fa fa-instagram fa-2x"></i>Instagram</a>
                                     </div>
                                    </li>

                                    <li>
                                      <div className="col-lg-6 col-xs-6 text-center">
                                         <a href="https://hockey-community.com"><i className="fa fa-group fa-2x"></i>Communauté</a>
                                     </div>
                                    </li>
                              </ul>
                      </div>
                  </div>
              </div>
          </footer>
          <div className="copyright">
           <div className="container">

               <div className="row text-center">
               	<p>Copyright © 2018 All rights reserved</p>
               </div>

       	   </div>
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
