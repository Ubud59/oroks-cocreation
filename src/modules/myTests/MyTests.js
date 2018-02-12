import React, { Component } from 'react';
import {connect} from "react-redux";

import { getTestsState } from '../../store/tests/selectors';
import { updateTests } from '../../store/tests/actions';
import { fetchMyTests } from '../../utils/tests.services.js';

import translateLabel from '../../utils/translateLabel.js';
import MyModal from './myButton.js';


class MyTests extends Component {

  componentDidMount(){

    fetchMyTests(this.props.user.id)
    .then(tests => {
      return tests;
    })
    .then(tests => this.props.fetchMyTests(tests))
    .catch(error => console.warn(error));
  }

  render() {

    return (

  <div className="row">

      {this.props.tests.map((test, index) =>

    <div key={index} className="col-sm-6 col-md-4">
    <div class="card-deck">
    <div class="card">
            <img class="card-img-top" src={test.image_src} alt="Card image cap"></img>
            <div class="card-block">
              <h4 class="card-title">{test.title}</h4>
              <p class="card-text">{test.description}</p>
              <p>type de test : {translateOroksVocab(test.type)}</p>
              <p>produit à tester : {test.product}</p>
              <p>{test.validationTreshold}</p>
              <p>numero de reference : {test.test_reference}</p>
              <p>statut : {test.status}</p>
            </div>
      <div class="card-footer">
        <small class="text-muted">{test.timing}
            <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
            <div className="btn-group mr-2" role="group" aria-label="First group">
            <button type="button" className="btn btn-outline btn-secondary btn-sm">
            <MyModal />
            </button>
            </div>
            <div className="btn-group mr-2" role="group" aria-label="Second group">
            <a className="btn btn-secondary btn-sm" href="{test.evaluationFormPath}" role="button">Je donne mon avis</a>
            </div>
            </div>
        </small>
      </div>
    </div>
    </div>
    </div>
          )}
  </div>
  );
  }
}

const MyTestsComponent = connect(getTestsState, updateTests)(MyTests)

export default MyTestsComponent;
