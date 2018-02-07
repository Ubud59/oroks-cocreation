import React, { Component } from 'react';
import {connect} from "react-redux";

import { getTestsState } from '../../store/tests/selectors';
import { updateTests } from '../../store/tests/actions';
import { fetchMyTests } from '../../utils/tests.services.js';

class MyTests extends Component {

  componentDidMount(){

    fetchMyTests(this.props.user.id)
    .then(tests => {
      console.log("tests in component did mount", tests);
      return tests;
    })
    .then(tests => this.props.fetchMyTests(tests))
    .catch(error => console.warn(error));
  }

  render() {
    console.log("this.props.tests dans mytests component",this.props.tests);
    console.log("this.props.user dans mytests component",this.props.user);

    return (
      <div className="list-group">

      {this.props.tests.map((test, index) =>

        <div key={index} className="list-group-item list-group-item-action flex-column align-items-start">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{test.title}</h5>
            <small>{test.timing}</small>
          </div>
          <p className="mb-1">{test.description}</p>
          <small>
            <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
            <div className="btn-group mr-2" role="group" aria-label="First group">
            <button type="button" className="btn btn-outline btn-secondary btn-sm">Je participe</button>
            </div>
            <div className="btn-group mr-2" role="group" aria-label="Second group">
            <a className="btn btn-secondary btn-sm" href="/myprofile" role="button">Je donne mon avis</a>
            </div>
            </div>
          </small>
        </div>
      )}

      </div>
  );
  }
}

const MyTestsComponent = connect(getTestsState, updateTests)(MyTests)

export default MyTestsComponent;
