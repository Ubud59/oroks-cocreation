import React, { Component } from 'react';
import {connect} from "react-redux";

import {getUserProfile} from '../../store/userProfile/selectors';
import {updateProfile} from '../../store/userProfile/actions';
import { fetchMyProfile } from '../../utils/profile.services.js';

import './Home.css';


class Home extends Component {

  componentDidUpdate(prevProps) {
    if (!prevProps.userProfile.id && this.props.userProfile.id){
      fetchMyProfile(this.props.userProfile.id)
      .then(profile => {
        return profile;
      })
      .then(profile => this.props.fetchMyProfile(profile))
      .catch(error => console.warn(error));
    }
  }

  render() {
    return (
      <div className="container pt-5">
        <div className="row">
          <h5 className="pb-1 bold">
            OROKS CO-CREATION
          </h5>
          <h5 className="pb-3">
            Chez OROKS, les tests de nos produits font partie intégrante du processus de conception et de développement
            de nos produits. Notre objectif est de proposer à nos utilisateurs des produits qui soient le plus adapté à leurs besoin.
          </h5>
        </div>

        <div className="row homepage">

          <div className="col-sm col-card">
            <div className="card">
              <img class="card-img-top home-img" src="/media/background-player.jpg" alt="Card image cap"/>
              <div className="card-body">
                <header>
                  <h5 className="card-title">TON PROFIL</h5>
                  <p className="card-text">
                    Nous recherchons des pratiquants de tous niveau et types de pratique afin que nous puissions réaliser des tests les plus pertinents possibles avec des utilisateurs qui entrent dans la cible du produit.
                  </p>
                  <p className="card-text pb-2">
                    Si tu souhaites être invité à participer à nos tests, rempli ton profil à 100% !
                  </p>
                </header>
                <div className="container container-button px-10 mx-10 center">
                  <div className="row justify-content-md-center">
                    <a className="btn btn-lg mybutton" href="/profile" >
                      MON PROFIL
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm col-card">
            <div className="card">
              <img class="card-img-top home-img" src="/media/fitting_statique.png" alt="Card image cap"/>
              <div className="card-body">
                <header>
                  <h5 className="card-title">QUELS SONT LES TESTS OROKS ?</h5>
                  <p className="card-text">
                    Chez OROKS, nous réalisons différents type de tests (Essayage, Fonction terrain, usage ...). Le type de test à réalisé dépend du niveau d’avancé dans le développement du produit et des contraintes lié à ce dernier.
                  </p>
                </header>
                <div className="container container-button center">
                  <div className="row justify-content-md-center">
                    <a className="btn btn-lg mybutton" href="/testoroks" >
                      TESTS OROKS
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm col-card">
            <div className="card">
              <img class="card-img-top home-img" src="/media/test_durabilite.png" alt="Card image cap"/>
              <div className="card-body">
                <header>
                  <h5 className="card-title">MES TESTS</h5>
                  <p className="card-text">
                    Pour voir les tests auxquels tu as déjà été invité, clique sur le bouton ci-dessous !
                  </p>
                </header>
                <div className="container container-button center">
                  <div className="row justify-content-md-center">
                    <a className="btn btn-lg mybutton" href="/mytests" >
                      MES TESTS
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

const HomeComponent = connect(getUserProfile, updateProfile)(Home)
export default HomeComponent;
