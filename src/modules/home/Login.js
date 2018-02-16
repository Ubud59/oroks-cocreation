import React, { Component } from 'react';
import {connect} from "react-redux";

import {getUserProfile} from '../../store/userProfile/selectors';
import {updateProfile} from '../../store/userProfile/actions';
import {Modal} from 'react-bootstrap'
import { getRedirectUri, getNewAccountUri } from '../../utils/auth.services'

import './Login.css';


class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
  }

  close = () => {
    this.setState({ showModal: false });
  }

  open = ()=> {
    this.setState({ showModal: true });
  }

  render() {
    return (
      <div className="container-fluid background">

        <div className="row justify-content-between bg-top">

          <div className="pt-3 mx-2">
            <a href="/">
              <img className="logo-login" src="/media/logo.png" alt="logo"/>
            </a>
          </div>

          <div className="pt-3 mx-2">
            <div className="row justify-content-end login-button pt-3">
              <div className="text-white mx-2" onClick={() => window.location = getRedirectUri()} href="#">
                CONNEXION
              </div>
              <div className="text-white mx-2" onClick={() => window.location = getNewAccountUri()} href="#">INSCRIPTION</div>
            </div>
          </div>
        </div>

        <div className="container login-title justify-content-center">
          <div className="row ">
            <div className="align-self-end text-center text-white login-background px-10 font-weight-bold">
              ETRE ACTEUR DE LA CONCEPTION DES PRODUITS DE DEMAIN !
            </div>
          </div>
        </div>
        <div>
          <div className="row container-button center">
            <div className="row justify-content-md-center">
              <a className="btn btn-lg mybutton text-white" onClick={() => this.open()}>
                EN SAVOIR PLUS
              </a>
            </div>
          </div>
        </div>

        <Modal animation={false} show={this.state.showModal} onHide={this.close} className="modal-background">
          <Modal.Header className="modal-header">
            <Modal.Title>
              Deviens testeur !
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div  className="container ">
              <p>
                La cellule test OROKS  est à la recherche de testeurs. Car, oui chez OROKS nous développons et validons tous nos produits en usage avec nos utilisateurs avant de les proposer en magasin.
              </p>
              <p>
                Pour cela, nous avons besoin de toi ! Nous recherchons des pratiquants de tous niveau et types de pratique (Roller hockey - hockey sur glace). En effet, pour réaliser nos tests nous n'avons pas recours au même profil d'utilisateur en fonction du produit à tester. Nous nous efforçons de toujours réaliser nos tests avec des utilisateurs qui entrent dans la cible du produit, afin que les résultats de nos tests soient le plus pertinent possible !
              </p>
              <p>
                Si tu as envie de nous aider à concevoir et développer des produits qui soient le plus adaptés à ton besoin et que tu es motivé, alors n'hésite plus et inscrit toi pour te porter volontaire à la participation de test OROKS ! Car, qui de mieux placé pour connaitre les besoins de nos utilisateurs que les utilisateurs eux-même ?
              </p>
              <p>
                Comme nous te l'avons expliqué juste avant, nous sélectionnons nos testeurs en fonction de la cible utilisateur du produit. Alors si tu n'es pas contacté tout de suite, ne t'en fais pas, dès que ton profil correspond pour l'un de nos test, nous te contacterons !
              </p>
              <p>
                MAKE HOCKEY HAPPEN !
              </p>
              <p>
                L'équipe OROKS
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer className="justify-content-center">
            <div className="row container-button center">
              <div className="row justify-content-md-center">
                <a className="btn btn-lg mybutton text-white" onClick={this.close}>
                  OK !
                </a>
              </div>
            </div>
          </Modal.Footer>

        </Modal>

      </div>
    );
  }
}

const LoginComponent = connect(getUserProfile, updateProfile)(Login)
export default LoginComponent;
