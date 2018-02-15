import React, { Component } from 'react';
import {connect} from "react-redux";

import { getTestsState } from '../../store/tests/selectors';
import { updateTests } from '../../store/tests/actions';
import { fetchAllTests } from '../../utils/alltests.services.js';

import translateLabel from '../../utils/translateLabel.js';
import './Alltests.css';


class AllTests extends Component {

  componentDidMount(){

    fetchAllTests()
      .then(tests => this.props.fetchAllTests(tests))
      .catch(error => console.warn(error));
  }

  render() {

    return (
      <div className="tests-container">
        <h1 className="title">Tous les Tests disponibles chez OROKS</h1>
           <div className="main">
             {this.props.tests.map((test, index) =>
                <div key={index} className="col-6 col-lg-3 col-test">
                <div className="card-deck">
                  <div className="card test-card">
                          <img className="card-img-top" src={test.image_src} alt="title"></img>
                          <div className="card-block">
                            <h4 className="card-title">{test.title}</h4>
                            <p className="card-text">{test.description}</p>
                            <p>type de test : {translateLabel(test.type)}</p>
                            <p>produit à tester : {test.product}</p>
                            <p>{test.validationTreshold}</p>
                            <p>numero de reference : {test.test_reference}</p>
                            <p>statut : {translateLabel(test.status)}</p>
                          </div>
                    <div className="card-footer">
                      <small className="text-muted">{test.timing}
                          <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                          <div className="btn-group mr-2" role="group" aria-label="First group">
                          <div className="btn-group mr-2" role="group" aria-label="Second group">
                          <a className="btn btn-secondary btn-sm" href={`/test/${test.id}`} role="button">Modifier le test.</a>
                          </div>
                          </div>
                          </div>
                      </small>
                    </div>
                  </div>
                </div>
                </div>
              )}
            </div>
      </div>
    );
    }
}

const AllTestsComponent = connect(getTestsState, updateTests)(AllTests)

export default AllTestsComponent;
