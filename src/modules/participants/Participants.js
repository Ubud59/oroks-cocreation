import React, { Component } from 'react';
import { connect } from "react-redux";

import { getParticipantsState } from '../../store/participants/selectors';
import { updateParticipants } from '../../store/participants/actions';
import { fetchParticipants } from '../../utils/participant.services.js';
import { fetchTest } from '../../utils/test.services.js';
import translateLabel from '../../utils/translateLabel.js';
import { Navbar, Nav, NavItem, NavLink, NavbarToggler, Collapse } from "reactstrap";


class Participants extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  componentDidMount() {
    if (this.props.match.params.id!=="null") {
      fetchTest(this.props.match.params.id)
      .then(test => this.props.fetchTest(test))
      .then(() => fetchParticipants(this.props.match.params.id))
      .then(participants => this.props.fetchParticipants(participants))
      .catch(error => console.warn(error));
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  submitForm = (event, participant) => {
    event.preventDefault();
    this.props.updateParticipant(participant);
  }

  render() {

    return (
      <div className="container pt-5">

        <div className="card text-secondary">

          <div className="card-header px-0 pb-0">
            <div className="row pl-5 pb-3 font-weight-bold">
              Fiche test : {this.props.test.title}
            </div>
            <div className="row pl-3">
              <Navbar light className="p-0" expand="md">
                <NavbarToggler className="bg-light" onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                    <NavItem  className="bg-white border">
                      <NavLink href={`/test/${this.props.test.id}`}>Details</NavLink>
                    </NavItem>
                    <NavItem className="bg-white border">
                      <NavLink href={`/test/${this.props.test.id}/eval`}>Evaluation</NavLink>
                    </NavItem>
                    <NavItem className="bg-white border">
                      <NavLink href={`/test/${this.props.test.id}/results`}>Resultats</NavLink>
                    </NavItem>
                    <NavItem active className="bg-white border">
                      <NavLink href={`/test/${this.props.test.id}/participants`}>Equipe tests</NavLink>
                    </NavItem>
                    <NavItem className="bg-white border">
                      <NavLink href={`/test/${this.props.test.id}/selection`}>Constituer équipe</NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
              </Navbar>
            </div>
          </div>

          <div className="card-body">

            {(this.props.participants.participants.length===0) ? (

              <p className="pt-4"> Votre équipe de tests ne contient aucun testeur  </p>

            ):(

              <div className="table-responsive-md">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Nom</th>
                      <th scope="col">email</th>
                      <th scope="col">Telephone</th>
                      <th scope="col">Statut Invitation </th>
                      <th scope="col">Evaluation renseignée? </th>
                      <th scope="col">Note évaluation</th>
                      <th scope="col">Action </th>

                    </tr>
                  </thead>

                  <tbody>

                    {this.props.participants.participants.map((participant, index) =>
                    <tr key={index}>
                      <td>{participant.first_name} {participant.last_name}</td>
                      <td>{participant.email} </td>
                      <td>{participant.phone_number} </td>
                      <td>{translateLabel(participant.invitation_status)} </td>

                        <td colspan="3">
                          <form onSubmit={(event) => this.submitForm(event,participant)}>
                          <div className="form-row">
                              <div className="col-6">
                                <fieldset className="form-group">
                                  <div className="form-check form-check-inline ml-2">
                                    <input className="form-check-input" type="radio" name="evalRadio" id="evalRadio1" value="FILLED" checked={participant.evaluation_status === "FILLED"} onChange={() => this.props.updateParticipantField(participant.id,"evaluation_status","FILLED")}/>
                                    <label className="form-check-label">
                                      Oui
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline ml-2">
                                    <input className="form-check-input" type="radio" name="evalRadio" id="evalRadio2" value="NOT_FILLED" checked={participant.evaluation_status === "NOT_FILLED"} onChange={() => this.props.updateParticipantField(participant.id,"evaluation_status","NOT_FILLED")}/>
                                    <label className="form-check-label">
                                      Non
                                    </label>
                                  </div>
                                </fieldset>
                              </div>
                              <div className="col-3">
                                <select className="custom-select" onChange={(event) => this.props.updateParticipantField(participant.id,"evaluation_rating",event.target.value)}>
                                  <option value="1" selected={participant.evaluation_rating === 1} >
                                    1
                                  </option>
                                  <option value="2" selected={participant.evaluation_rating === 2}>
                                    2
                                  </option>
                                  <option value="3" selected={participant.evaluation_rating === 3} >
                                    3
                                  </option>
                                  <option value="4" selected={participant.evaluation_rating === 4} >
                                    4
                                  </option>
                                  <option value="5" selected={participant.evaluation_rating === 5} >
                                    5
                                  </option>
                                </select>
                              </div>
                              <div className="col-3">
                                <button type="submit" className="btn btn-secondary ml-3" >Enregistrer</button>
                              </div>
                            </div>
                      </form>
                    </td>
                    </tr>
                    )}

                  </tbody>
                </table>
              </div>

            )}

          </div>
        </div>
      </div>
    );
  }
}



const ParticipantsComponent = connect(getParticipantsState, updateParticipants)(Participants)
export default ParticipantsComponent;
