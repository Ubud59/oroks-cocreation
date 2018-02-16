import React, { Component } from 'react';
import {connect} from "react-redux";
import compileExpression from 'filtrex'
import { Navbar, Nav, NavItem, NavLink, NavbarToggler, Collapse, FormGroup, Label, Input } from "reactstrap";
import { getTestState } from '../../store/test/selectors';
import { updateTest } from '../../store/test/actions';
import { patchParticipantsToTest, fetchTestAndParticipants } from '../../utils/participant.services';
import { fetchAllUsers } from '../../utils/user.services';


import './filterTestTeam.css';

class FilterTestTeam extends Component {

  constructor(props) {
    super(props)
    this.state =  {
      tableHeaders: [],
      users: [],
      expression: '',
      filteredList: [],
      selectedUsers: [],
      existingParticipants: [],
      test: '',
      tableHeadersTestParticipants: []
    }
  }

  componentDidMount() {
    if (this.props.match.params.id !== "null") {

      fetchAllUsers(this.props.match.params.id)
      .then(users => {
        if (users.length > 0){
          this.setState({tableHeaders: Object.keys(users[0])});
        }
        return users
      })
      .then(users => this.setState({users: users, filteredList: users}))
      .catch(e => console.warn(e));

      fetchTestAndParticipants(this.props.match.params.id)
        .then(testFull => {
          if (testFull.participants.length > 0){
            this.setState({tableHeadersTestParticipants: Object.keys(testFull.participants[0])})
          }
          return testFull
        }
      ).then(testFull => this.setState({test: testFull}))
      .catch(error => console.warn(error));
    }


  }

  render() {

    return (

      <div className="container pt-5">

        <div className="card text-secondary">

          <div className="card-header px-0 pb-0">
            <div className="row pl-5 pb-3 font-weight-bold">
              Test : {this.state.test.title}
            </div>
            <div className="row pl-3">
              <Navbar light className="p-0" expand="md">
                <NavbarToggler className="bg-light" onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                    <NavItem className="bg-white border">
                      <NavLink href={`/test/${this.state.test.id}`}>Détails</NavLink>
                    </NavItem>
                    <NavItem className="bg-white border">
                      <NavLink href={`/test/${this.state.test.id}/eval`}>Evaluation</NavLink>
                    </NavItem>
                    <NavItem active className="bg-white border">
                      <NavLink href={`/test/${this.state.test.id}/selection`}>Constituer équipe</NavLink>
                    </NavItem>
                    <NavItem className="bg-white border">
                      <NavLink href={`/test/${this.state.test.id}/participants`}>Equipe tests</NavLink>
                    </NavItem>
                    <NavItem className="bg-white border">
                      <NavLink href={`/test/${this.state.test.id}/results`}>Résultats</NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
              </Navbar>
            </div>
          </div>

      <div className="card-body">


        <div>
          <div className="form-expression">
            <div className="input-expression">
              <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={this.state.expression} onChange={this.filterUsers}/>
            </div>
            <button className="btn btn-primary" onClick={() => this.handleSubmitFilter()}>Submit</button>
          </div>

          <div className="community-table">
            <h2>Utilisateurs de la communauté</h2>
            {
              this.state.tableHeaders ?
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      {this.state.tableHeaders.map((key, idx) => <th key={idx} scope="col">{key}</th>)}
                    </tr>
                  </thead>

                  <tbody>
                    {this.state.filteredList.map((user, index) =>
                    <tr key={index}>
                      <td>
                      <FormGroup check>
                        <Label check>
                          <Input value={user.id} type="checkbox" onChange={(event) => this.handleCheck(event)}/>{' '}
                        </Label>
                      </FormGroup>
                      </td>
                      {Object.values(user).map((elm, idx) =>
                        <td key={idx}>{elm}</td>
                      )}
                    </tr>)
                  }
                  </tbody>
                </table>
              </div>
              :
              <div>Loading...</div>
            }
              <div>
                <button className="btn btn-primary" onClick={() => this.saveParticpants()}>Valider la sélection</button>
              </div>
            </div>
          </div>

        <div className="community-table">
          <h2>Utilisateurs déjà selectionnés</h2>
            {
              this.state.tableHeadersTestParticipants ?
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      {this.state.tableHeadersTestParticipants.map((key, idx) => <th key={idx} scope="col">{key}</th>)}
                    </tr>
                  </thead>

                  <tbody>
                    {this.state.test ? this.state.test.participants.map((participant, index) =>
                    <tr key={index}>
                      {Object.values(participant).map((elm, idx) =>
                        <td key={idx}>{elm}</td>
                      )}
                    </tr>)
                    :
                    <tr></tr>
                  }
                  </tbody>
                </table>
              </div>
              :
              <div>Loading...</div>
            }
        </div>

      </div>
    </div>
    </div>

    );
  }

  filterUsers = (event) => {

    this.setState({expression: event.target.value})
  }

  handleSubmitFilter = () => {
    if (this.state.expression !== '') {
      try {
        const myfilter = compileExpression(this.state.expression);
        this.setState({filteredList: this.state.users.filter(elm => myfilter(elm))});
      } catch (e) {
        console.warn(e.message);
      }
    } else {
      this.setState({filteredList: this.state.users})
    }
  }

  handleCheck = (event) => {
    const userId = event.target.value
    if (event.target.checked) {

      const userDetailFromId = this.state.users.filter(elm => elm.id === userId)[0]
      this.setState({selectedUsers: [...this.state.selectedUsers, userDetailFromId]})
    } else {
      this.setState({selectedUsers: this.state.selectedUsers.filter((elm) => elm.id !== userId)})
    }

  }

  saveParticpants = () => {
    patchParticipantsToTest(this.state.test, this.state.selectedUsers)
      .then(test => {
        this.setState({test: test})
        fetchAllUsers(test.id)
        .then(users => {
          if (users.length > 0) {
            this.setState({tableHeaders: Object.keys(users[0])});
          }
          return users
        })
        .then(users => this.setState({users: users, filteredList: users}))
        .catch(e => console.warn(e));
      });
  }

}


const FilterTestTeamComponent = connect(getTestState, updateTest)(FilterTestTeam)

export default FilterTestTeamComponent;
