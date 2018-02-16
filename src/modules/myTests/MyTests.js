import React, { Component } from 'react';
import {connect} from "react-redux";

import { getTestsState } from '../../store/tests/selectors';
import { updateTests } from '../../store/tests/actions';
import { fetchMyTests } from '../../utils/tests.services.js';
import { postUpdatedParticipant } from '../../utils/participant.services.js';

import translateLabel from '../../utils/translateLabel.js';
import './MyTests.css';
import {Modal} from 'react-bootstrap'

class MyTests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
  }

  componentDidUpdate(prevProps){
if (!prevProps.userProfile.id && this.props.userProfile.id){
    fetchMyTests(this.props.userProfile.id)
    .then(tests => this.props.fetchMyTests(tests))
    .catch(error => console.warn(error));
    }
  }

  close = () => {
    this.setState({ showModal: false });
  }

  open = () => {
    this.setState({ showModal: true });
  }

  handleClick=(test)=> {
    this.open()
    test.invitation_status = "ACCEPTED";
    //update state
    this.props.updateMyTest(test);
    //update database via api
    const participant={...test,id:test.participant_id};
    postUpdatedParticipant(participant);
  }


  render() {

    return (

  <div className="tests-container">
    <h1 className="title">Tous les Tests OROKS auxquels vous êtes invités.</h1>
      {(this.props.tests.length===0) ? (
        <div className="container">
          <div className="row">
            <div className="mx-auto align-middle">Vous n'avez pas encore été invité à une campagne de test OROKS.</div>
          </div>
        </div>
      ): (
       <div className="main">{this.props.tests.map((test, index) =>

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
              {test.invitation_status !== "ACCEPTED" ?
                    <div>
                      <a href="#" onClick={this.open}>
                      Je participe
                      </a>
                    </div> : "J'ai participé" }
            </button>
              <Modal animation={false} show={this.state.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                  <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <h4>Merci d'avoir confirmé ta participation.</h4>
                  <p>Tu seras contacté par l'équipe Oroks qui te donnera tous les détails nécessaires.</p>
                </Modal.Body>
              </Modal>
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
      )
        }
  </div>
  );
  }
}

const MyTestsComponent = connect(getTestsState, updateTests)(MyTests)

export default MyTestsComponent;
