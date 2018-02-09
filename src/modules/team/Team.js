import React, { Component } from 'react';
import { connect } from "react-redux";

import { getTeamState } from '../../store/team/selectors';
import { updateTeam } from '../../store/team/actions';
import { fetchTeam } from '../../utils/team.services.js';
import { fetchTest } from '../../utils/test.services.js';
import translateLabel from '../../utils/translateLabel.js';
import { Navbar, Nav, NavItem, NavLink, NavbarToggler, Collapse } from "reactstrap";


class Team extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  componentDidMount() {
    fetchTest(this.props.match.params.id)
    .then(test => this.props.fetchTest(test))
    .then(() => fetchTeam(this.props.match.params.id))
    .then(team => this.props.fetchTeam(team))
    .catch(error => console.warn(error));
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
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
                      <NavLink href={`/test/${this.props.test.id}/team`}>Equipe tests</NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
              </Navbar>
            </div>
          </div>

          <div className="card-body">

            <div class="table-responsive-md">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Nom</th>
                    <th scope="col">email</th>
                    <th scope="col">Telephone</th>
                    <th scope="col">Statut invitation</th>
                    <th scope="col">Statut évaluation</th>
                    <th scope="col">Note évaluation</th>
                    <th scope="col">Profil</th>

                  </tr>
                </thead>

                <tbody>
                  {this.props.team.team.map((participant, index) =>

                    <tr key={index}>
                      <td>{participant.firstName} {participant.lastName}</td>
                      <td>{participant.email} </td>
                      <td>{participant.phoneNumber} </td>
                      <td>{translateLabel(participant.invitationStatus)} </td>
                      <td>{translateLabel(participant.evaluationStatus)} </td>
                      <td>{participant.evaluationRating} </td>
                      <td>{translateLabel(participant.userType)} </td>
                    </tr>
                  )}

                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    );
  }
}



const TeamComponent = connect(getTeamState, updateTeam)(Team)
export default TeamComponent;
