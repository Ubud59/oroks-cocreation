import React, { Component } from 'react';
import {connect} from "react-redux";

import { getTestsState } from '../../store/tests/selectors';
import { updateTests } from '../../store/tests/actions';
import { fetchMyTests } from '../../utils/tests.services.js';
import { postUpdatedParticipant } from '../../utils/participant.services.js';

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

  handleClick=(test)=> {
    test.invitation_status = "ACCEPTED";
    console.log("this.props.tests in handleClick",this.props.tests);
    //update state
    this.props.updateMyTest(test);
    //update database via api
    const participant={...test,id:test.participant_id};
    postUpdatedParticipant(participant);
  }


  render() {

    return (

  <div className="row">

      {this.props.tests.map((test, index) =>

    <div key={index} className="col-sm-6 col-md-3">
    <div className="card-deck">
    <div className="card">
            <img className="card-img-top" src={test.image_src} alt="Card image cap"></img>
            <div className="card-block">
              <h4 className="card-title">{test.title}</h4>
              <p className="card-text">{test.description}</p>
              <p>type de test : {translateLabel(test.type)}</p>
              <p>produit à tester : {test.product}</p>
              <p>{test.validationTreshold}</p>
              <p>numero de reference : {test.test_reference}</p>
              <p>statut : {test.status}</p>
            </div>
      <div className="card-footer">
        <small className="text-muted">{test.timing}
            <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
            <div className="btn-group mr-2" role="group" aria-label="First group">
            <button
              type="button"
              disabled={test.invitation_status === "ACCEPTED"}
              className="btn btn-outline btn-secondary btn-sm"
              onClick={()=> {
                if (test.invitation_status !== "ACCEPTED") {
                  this.handleClick(test)
                }
              }}
            >
              {test.invitation_status !== "ACCEPTED" ? <MyModal /> : "J'ai participé" }
            </button>
            </div>
            <div className="btn-group mr-2" role="group" aria-label="Second group">
            <a className="btn btn-secondary btn-sm" href={`/test/${test.id}/eval`} role="button">Je donne mon avis</a>
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
