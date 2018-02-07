import React, { Component } from 'react';
import {connect} from "react-redux";
import { getRedirectUri } from '../../utils/auth.services'

class Login extends Component {

  render() {
    return (
      <div>
        <button onClick={() => window.location = getRedirectUri()}>Login with Decathlon</button>
      </div>
    );
  }
}

const LoginComponent = connect(null, null)(Login)

export default LoginComponent;
