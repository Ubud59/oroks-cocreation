import React, { Component } from 'react';
import {connect} from "react-redux";


class Login extends Component {

  render() {
    return (
      <div>
      Login
      </div>
    );
  }
}

const LoginComponent = connect(null, null)(Login)

export default LoginComponent;
