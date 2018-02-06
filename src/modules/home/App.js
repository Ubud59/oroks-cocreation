import React, { Component } from 'react';
import { connect } from "react-redux";
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';

import LoginComponent from '../login/Login';
import MyTestsComponent from '../myTests/MyTests';

import { getUserState } from '../../store/user/selectors';
import { signOut } from '../../store/user/actions';

import './App.css';

// const user={id:"123"};
const user={};

class App extends Component {
  render() {
    return (

      <Router>
        <div>
          app component

          { user.id ? (
            <div>
              <p> user connected : redirection vers mytests</p>
              <MyTestsComponent />
            </div>
          ) : (
            <div>
              <Link to={`/login`}>
                <p> user not connected : redirection vers login</p>
              </Link>
            </div>
          )}

          <div>
            <Switch>
              <Route exact path="/" component={MyTestsComponent}/>
              <Route path="/login" component={LoginComponent}/>
            </Switch>
          </div>

        </div>
      </Router>
    );
  }
}

const AppComponent = connect(getUserState, signOut)(App)
export {App, AppComponent};
