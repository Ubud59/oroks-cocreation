import React, { Component } from 'react';
import { connect } from "react-redux";
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';

// import MyTests from '../myTests/MyTests';
import Login from '../login/Login';
import { getUserState } from '../../store/user/selectors';
import { signOut } from '../../store/user/actions';

import './App.css';


class App extends Component {
  render() {
    return (

      <Router>
        <div>

          {this.props.user.id ? (
            <div>
              {this.props.history.push(`/mytests`)}
                <p> user connected : redirection vers mytests</p>
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
              <Route exact path="/" component={App}/>
              <Route path="/login" component={Login}/>
            </Switch>

          </div>

        </div>
      </Router>
    );
  }
}

const AppComponent = connect(getUserState, signOut)(App)
export {App, AppComponent};
