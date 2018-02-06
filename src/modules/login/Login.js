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
            onClick={ () => console.log("faut que mette une fonction login") }>
          </button>
        </form>
      </div>
    );
  }
}

const LoginComponent = connect(null, null)(Login)

export default LoginComponent;
