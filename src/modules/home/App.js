import React, { Component } from 'react';
import { connect } from "react-redux";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import LoginComponent from '../login/Login';
import MyTestsComponent from '../myTests/MyTests';
import AuthComponent from '../auth/Auth'
import TestNewComponent from '../testNew/TestNew';
import ProfileComponent from '../profile/Profile';
import TestComponent from '../test/Test';

import { getUserState } from '../../store/user/selectors';
import { userAuthentication } from '../../store/user/actions';

import './App.css';
import { Navbar, Nav, NavItem, NavLink, NavbarToggler, Collapse } from "reactstrap";

import { getRedirectUri, isAuthenticated } from '../../utils/auth.services'

// en attente de gestion authent par Damien
const user = {
  id:"1123",
  userType:"ENGINEER"
};


class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
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
          <div className="row header-row align-items-end">

            <Navbar light className="p-0" expand="md">
              <NavbarToggler className="bg-light" onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav tabs className="ml-auto" navbar>
                  <NavItem className="bg-light">
                    <NavLink href="/testsoroks">Les tests Oroks</NavLink>
                  </NavItem>
                  <NavItem className="bg-light">
                    <NavLink href="/myprofile">Mon profile</NavLink>
                  </NavItem>
                  <NavItem className="bg-light">
                    <NavLink href="/mytests">Mes tests</NavLink>
                  </NavItem>
                  {(user.userType==="ENGINEER") ? (
                      <NavItem className="bg-light">
                        <NavLink href="/alltests">Tous les tests</NavLink>
                      </NavItem>
                  ):(null)}
                  {(user.userType==="ENGINEER") ? (
                    <NavItem className="bg-light">
                      <NavLink href="/newtest">Créer un test</NavLink>
                    </NavItem>
                  ):(null)}
                  {(user.userType==="ENGINEER") ? (
                    <NavItem className="bg-light">
                      <NavLink href="/community">La communauté</NavLink>
                    </NavItem>
                  ):(null)}
                </Nav>
              </Collapse>
            </Navbar>
          </div>

          <div>
            <Switch>
              <Route exact path="/" component={MyTestsComponent}/>
              <Route path="/login" component={LoginComponent}/>
              <Route path="/mytests" component={MyTestsComponent}/>
              <Route path={"/auth/callback"} component={AuthComponent}></Route>
              <Route path="/newtest" component={TestComponent}/>
              <Route path="/profile" component={ProfileComponent}/>
              <Route path="/test/:id" component={TestComponent}/>

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
      <Route component={() => window.location = getRedirectUri()}></Route>
    )
  )}/>
)


const AppComponent = connect(getUserState)(App)
export {App, AppComponent};
