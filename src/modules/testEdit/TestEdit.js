import React, { Component } from 'react';
import { connect } from "react-redux";


import { getTestState } from '../../store/test/selectors';
import { updateTest } from '../../store/test/actions';

import './TestEdit.css';

class TestEdit extends Component {
  render() {
    return (
      <div>

      </div>
    );
  }
}

const TestEditComponent = connect(getTestState, updateTest)(TestEdit)
export {TestEditComponent};
