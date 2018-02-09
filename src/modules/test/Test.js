import React, { Component } from 'react';
import { connect } from "react-redux";

import { getTestState } from '../../store/test/selectors';
import { updateTest } from '../../store/test/actions';

class Test extends Component {

  render() {

    console.log("this.props dans Test Component",this.props);
    return (
      <div className="container pt-5">
        <div className="card border-light text-secondary mb-3">
          <div className="card-header">Fiche test</div>
          <div className="card-body text-dark">

          </div>
        </div>
      </div>
    );
  }
}



const TestComponent = connect(getTestState, updateTest)(Test)
export default TestComponent;
