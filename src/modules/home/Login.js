import React, { Component } from 'react';
import {connect} from "react-redux";

import {getUserProfile} from '../../store/userProfile/selectors';
import {updateProfile} from '../../store/userProfile/actions';
import { getRedirectUri, getNewAccountUri } from '../../utils/auth.services'

import './Login.css';


class Login extends Component {

  render() {
    return (
      <div className="container-fluid background">

        <div className="row justify-content-between bg-top">

          <div className="pt-3 ml-auto">
            <a href="/">
              <img className="logo-login" src={ require("../../images/logo.png")} alt="logo"/>
            </a>
          </div>

          <div className="col ">
            <div className="row justify-content-end pt-3">
              <div className="text-white mx-2" onClick={() => window.location = getRedirectUri()} href="#">
                CONNEXION
              </div>
              <div className="text-white mx-2" onClick={() => window.location = getNewAccountUri()} href="#">INSCRIPTION</div>
            </div>
          </div>
        </div>

        <div className="container login-title justify-content-center">
          <div className="row ">
            <div className="col align-self-end text-center text-white">
              ETRE ACTEUR DE LA CONCEPTION DES PRODUITS DE DEMAIN !
            </div>
          </div>
        </div>
        <div>
          <div className="row container-button center">
            <div className="row justify-content-md-center">
              <a className="btn btn-lg mybutton" href="http://localhost:3000/testsoroks" >
                EN SAVOIR PLUS
              </a>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

const LoginComponent = connect(getUserProfile, updateProfile)(Login)
export default LoginComponent;
