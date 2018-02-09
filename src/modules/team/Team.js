import React, { Component } from 'react';
import { connect } from "react-redux";

import { getTeamState } from '../../store/team/selectors';
import { updateTeam } from '../../store/team/actions';
import { fetchTeam } from '../../utils/team.services.js';
import { fetchTest } from '../../utils/test.services.js';
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
                    <NavItem active className="bg-white border">
                      <NavLink href={`/test/${this.props.test.id}`}>Details</NavLink>
                    </NavItem>
                    <NavItem className="bg-white border">
                      <NavLink href={`/test/${this.props.test.id}/eval`}>Evaluation</NavLink>
                    </NavItem>
                    <NavItem className="bg-white border">
                      <NavLink href={`/test/${this.props.test.id}/results`}>Resultats</NavLink>
                    </NavItem>
                    <NavItem className="bg-white border">
                      <NavLink href={`/test/${this.props.test.id}/team`}>Equipe tests</NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
              </Navbar>
            </div>
          </div>

          <div className="card-body">


          </div>
        </div>
      </div>
    );
  }
}



const TeamComponent = connect(getTeamState, updateTeam)(Team)
export default TeamComponent;
