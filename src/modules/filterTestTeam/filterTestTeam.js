import React, { Component } from 'react';
import {connect} from "react-redux";
import compileExpression from 'filtrex'
import { Navbar, Nav, NavItem, NavLink, NavbarToggler, Collapse, FormGroup, Label, Input } from "reactstrap";
import { getTestState } from '../../store/test/selectors';
import { updateTest } from '../../store/test/actions';
import { patchParticipantsToTest } from '../../utils/participant.services';
import { fetchTest } from '../../utils/test.services.js';

class FilterTestTeam extends Component {

  constructor(props) {
    super(props)
    this.state =  {
      tableHeaders: [],
      users: [],
      expression: '',
      filteredList: [],
      selectedUsers: []
    }
  }

  componentDidMount() {
    fetch("http://localhost:8080/api/users", {
      method: 'GET'
    })
    .then(res => res.json())
    .then(users => {
      this.setState({tableHeaders: Object.keys(users[0])});
      return users
    })
    .then(users => this.setState({users: users, filteredList: users}))
    .catch(e => console.warn(e));


    if (this.props.match.params.id!=="null") {
      fetchTest(this.props.match.params.id)
        .then(test => this.props.fetchTest(test))
        .catch(error => console.warn(error));
    }


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
                    <NavItem className="bg-white border">
                      <NavLink href={`/test/${this.props.test.id}/eval`}>Evaluation</NavLink>
                    </NavItem>
                    <NavItem className="bg-white border">
                      <NavLink href={`/test/${this.props.test.id}/results`}>Résultats</NavLink>
                    </NavItem>
                    <NavItem className="bg-white border">
                      <NavLink href={`/test/${this.props.test.id}/participants`}>Equipe tests</NavLink>
                    </NavItem>
                    <NavItem active className="bg-white border">
                      <NavLink href={`/test/${this.props.test.id}/selection`}>Constituer équipe</NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
              </Navbar>
            </div>
          </div>

      <div className="card-body">


        <div>
          <div className="input-group input-group-sm mb-3">
            <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={this.state.expression} onChange={this.filterUsers}/>
          </div>
          <button className="btn btn-primary" onClick={() => this.handleSubmitFilter()}>Submit</button>
          {
            this.state.tableHeaders ?
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    {this.state.tableHeaders.map((key, idx) => <th scope="col">{key}</th>)}
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
        </div>
        <div>
          {this.state.selectedUsers.map((elm, idx) => <div key={idx}>{elm}</div>)}
        </div>
        <div>
          <button className="btn btn-primary" onClick={() => this.saveParticpants()}>Save</button>
        </div>

      </div>
    </div>
    </div>

    );
  }

  filterUsers = (event) => {
    console.log(event.target.value);
    this.setState({expression: event.target.value})
  }

  handleSubmitFilter = () => {
    if (this.state.expression !== '') {
      const myfilter = compileExpression(this.state.expression);
      // Execute function
      console.log(this.state.users.filter(elm => myfilter(elm)));
      this.setState({filteredList: this.state.users.filter(elm => myfilter(elm))});
    } else {
      this.setState({filteredList: this.state.users})
    }
  }

  handleCheck = (event) => {
    const userId = event.target.value
    if (event.target.checked) {
      // push dans selectedUsers
      this.setState({selectedUsers: [...this.state.selectedUsers, event.target.value]})
    } else {
      // remove de selectedUsers
      this.setState({selectedUsers: this.state.selectedUsers.filter((elm) => elm !== userId)})
    }

  }

  saveParticpants = () => {
    console.log(this.props.test.id);
    patchParticipantsToTest(this.props.test.id, this.state.selectedUsers)
      .then(result => console.log(result));
  }

}



const FilterTestTeamComponent = connect(getTestState, updateTest)(FilterTestTeam)

export default FilterTestTeamComponent;
