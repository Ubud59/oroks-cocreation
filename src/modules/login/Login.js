import React, { Component } from 'react';
import {connect} from "react-redux";


class Login extends Component {

  render() {
    return (
      <div>
        <form>
          <input
            type="text"
            name="email"
            onChange={this.props.handleNameChange}
          />
          <button
            onClick={ () => this.props.login() }>
          </button>
        </form>
      </div>
    );
  }
}

const LoginComponent = connect(, login)(Login)

export default LoginComponent;
