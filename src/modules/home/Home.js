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
          <h5 className="pb-5 bold">
            OROKS CO-CREATION
          </h5>
          <h5 className="pb-5">
            Chez OROKS, les tests de nos produits font partie intégrante du processus de conception et de développement
            de nos produits. Notre objectif est de proposer à nos utilisateurs des produits qui soient le plus adapté à leurs besoin.
          </h5>
        </div>

        <div>
          <h5 className="pb-5">
            Et pour cela, nous avons besoin de toi ! Nous recherchons des pratiquants de tous niveau et types de pratique (Roller hockey - hockey sur glace). En effet, pour réaliser nos tests nous n'avons pas recours au même profil d'utilisateur en fonction du produit à tester. Nous nous efforçons de toujours réaliser nos tests avec des utilisateurs qui entrent dans la cible du produit, afin que les résultats de nos tests soient le plus pertinent possible !
          </h5>
          <h5 className="pb-5">
            Si tu as envie de nous aider à concevoir et développer des produits qui soient le plus adaptés à ton besoin et que tu es motivé, alors n'hésite plus et rempli ton profil à 100% pour te porter volontaire à la participation
            de test OROKS, sans quoi tu ne recevra pas d’invitation pour participer à des tests !
          </h5>
          <div className="container container-button px-10 mx-10 center">
            <div className="row justify-content-md-center">
              <a className="btn btn-lg mybutton" href="/profile" >
                MON PROFILE
              </a>
            </div>
          </div>
        </div>  


        <h5 className="pt-5 bold">
          QUELS SONT LES TESTS OROKS ?
        </h5>
        <h5 className="pt-5 pb-5">
          Chez OROKS, nous réalisons différents type de tests (Essayage, Fonction terrain, usage ...). Le type de test à réalisé dépend du niveau d’avancé dans le développement du produit et des contraintes lié à ce dernier.
        </h5>
        <div className="container container-button center">
          <div className="row justify-content-md-center">
            <a className="btn btn-lg mybutton" href="/testsoroks" >
              TESTS OROKS
            </a>
          </div>
        </div>

        <h5 className="pt-5 bold">
          MES TESTS
        </h5>
        <h5 className="pt-5 pb-5">
          Pour voir les tests auxquels tu as déjà été invité, clique sur le bouton ci-dessous !
        </h5>
        <div className="container container-button center">
          <div className="row justify-content-md-center">
            <a className="btn btn-lg mybutton" href="/mytests" >
              MES TESTS
            </a>
          </div>
        </div>

      </div>
    );
  }
}

const HomeComponent = connect(getUserProfile, updateProfile)(Home)
export default HomeComponent;
