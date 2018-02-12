import React, { Component } from 'react';
import {connect} from "react-redux";
import filtrex from '../../utils/filtrex';

class FilterTestTeam extends Component {

  constructor(props) {
    super(props)
    this.state =  {
      tableHeaders: [],
      users: [],
      expression: '',
      filteredList: []
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

  }

  render() {
    return (
      <div>
        <div className="input-group input-group-sm mb-3">
          <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={this.state.expression} onChange={this.filterUsers}/>
        </div>
        <button onClick={() => this.handleSubmitFilter()}>Submit</button>
        {
          this.state.tableHeaders ?
            <table className="table-responsive">
              <thead>
                <tr>
                  {this.state.tableHeaders.map((key, idx) => <th scope="col">{key}</th>)}
                </tr>
              </thead>

              <tbody>
                {this.state.filteredList.map((user, index) =>
                <tr key={index}>
                  {Object.values(user).map((elm, idx) =>
                    <td key={idx}>{elm}</td>
                  )}
                </tr>)
              }
              </tbody>
            </table>
          :
          <div>Loading...</div>
        }
      </div>
    );
  }

  filterUsers = (event) => {
    console.log(event.target.value);
    this.setState({expression: event.target.value})
  }

  handleSubmitFilter = () => {
    if (this.state.expression !== '') {
      const myfilter = filtrex.compileExpression(this.state.expression);

      // Execute function
      console.log(this.state.users.filter(elm => myfilter(elm)));
      this.setState({filteredList: this.state.users.filter(elm => myfilter(elm))});
    } else {
      this.setState({filteredList: this.state.users})
    }

  }

}



const FilterTestTeamComponent = connect(null, null)(FilterTestTeam)

export default FilterTestTeamComponent;
