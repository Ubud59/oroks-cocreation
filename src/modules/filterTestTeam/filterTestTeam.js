import React, { Component } from 'react';
import {connect} from "react-redux";
import compileExpression from 'filtrex'
import { Navbar, Nav, NavItem, NavLink, NavbarToggler, Collapse, FormGroup, Label, Input } from "reactstrap";
import { getTestState } from '../../store/test/selectors';
import { updateTest } from '../../store/test/actions';
import { patchParticipantsToTest, fetchParticipants } from '../../utils/participant.services';
import { fetchAllUsers } from '../../utils/user.services';
import { fetchTest } from '../../utils/test.services.js';
import translateLabel from '../../utils/translateLabel.js';

class FilterTestTeam extends Component {

  constructor(props) {
    super(props)
    this.state =  {
      tableHeaders: [],
      users: [],
      expression: '',
      filteredList: [],
      selectedUsers: [],
      existingParticipants: []
    }
  }

  componentDidMount() {
    fetchAllUsers()
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

      fetchParticipants(this.props.match.params.id)
          .then(participants => this.setState({existingParticipants: participants}))
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
            <div className="invalid-feedback">Example invalid feedback text</div>
          </div>
          <button className="btn btn-primary" onClick={() => this.handleSubmitFilter()}>Submit</button>
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
        </div>
        <h2>Utilisateurs déjà selectionnés</h2>

        {this.state.existingParticipants.map((participant, index) =>
        <tr key={index}>
          <td>{participant.first_name} {participant.last_name}</td>
          <td>{participant.email} </td>
          <td>{participant.phone_number} </td>
          <td>{translateLabel(participant.invitation_status)} </td>
            <td colspan="3">
              <div className="form-row">
                  <div className="col-6">
                    <fieldset className="form-group">
                      <div className="form-check form-check-inline ml-2">
                        <input className="form-check-input" type="radio" name="evalRadio" id="evalRadio1" value="FILLED" checked={participant.evaluation_status === "FILLED"} onChange={() => this.props.updateParticipantField(participant.id,"evaluationStatus","FILLED")}/>
                        <label className="form-check-label">
                          Oui
                        </label>
                      </div>
                      <div className="form-check form-check-inline ml-2">
                        <input className="form-check-input" type="radio" name="evalRadio" id="evalRadio2" value="NOT_FILLED" checked={participant.evaluation_status === "NOT_FILLED"} onChange={() => this.props.updateParticipantField(participant.id,"evaluationStatus","NOT_FILLED")}/>
                        <label className="form-check-label">
                          Non
                        </label>
                      </div>
                    </fieldset>
                  </div>
                </div>
        </td>
        </tr>
        )}
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
    patchParticipantsToTest(this.props.test, this.state.selectedUsers)
      .then(result => console.log(result));
  }

}



// <div>
//   {
//     this.state.tableHeaders ?
//     <div className="table-responsive">
//       <table className="table">
//         <thead>
//           <tr>
//             <th>#</th>
//             {this.state.tableHeaders.map((key, idx) => <th scope="col">{key}</th>)}
//           </tr>
//         </thead>
//
//         <tbody>
//           {this.state.selectedUsers.map((user, index) =>
//           <tr key={index}>
//             <td>#</td>
//             {Object.values(user).map((elm, idx) =>
//               <td key={idx}>{elm}</td>
//             )}
//           </tr>)
//         }
//         </tbody>
//       </table>
//     </div>
//     :
//     <div>Loading...</div>
//   }
// </div>

const FilterTestTeamComponent = connect(getTestState, updateTest)(FilterTestTeam)

export default FilterTestTeamComponent;
