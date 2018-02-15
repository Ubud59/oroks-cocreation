import React, { Component } from 'react';
import { connect } from "react-redux";

import { getTestState } from '../../store/test/selectors';
import { updateTest } from '../../store/test/actions';
import { fetchTest } from '../../utils/test.services.js';
import { Navbar, Nav, NavItem, NavLink, NavbarToggler, Collapse } from "reactstrap";
import './TestResults.css';

class TestResults extends Component {

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
        .catch(error => console.warn(error));
    }
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
              Test : {this.props.test.title}
            </div>
            <div className="row pl-3">
              <Navbar light className="p-0" expand="md">
                <NavbarToggler className="bg-light" onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                    <NavItem className="bg-white border">
                      <NavLink href={`/test/${this.props.test.id}`}>Détails</NavLink>
                    </NavItem>
                    <NavItem  className="bg-white border">
                      <NavLink href={`/test/${this.props.test.id}/eval`}>Evaluation</NavLink>
                    </NavItem>
                    <NavItem active className="bg-white border">
                      <NavLink href={`/test/${this.props.test.id}/results`}>Résultats</NavLink>
                    </NavItem>
                    <NavItem className="bg-white border">
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

          <div className="card-body gform">

            {(this.props.test.id) ? (
              <iframe className="gform" title="Test results"
              src={`${this.props.test.evaluation_results_path}?embedded=true`}
              >
                Loading...
              </iframe>
            ):(
              <p> Veuillez ajouter le lien vers votre page de résultats dans l'onglet Détails </p>
            )}

          </div>
        </div>
      </div>
    );
  }
}



const TestResultsComponent = connect(getTestState, updateTest)(TestResults)
export default TestResultsComponent;
