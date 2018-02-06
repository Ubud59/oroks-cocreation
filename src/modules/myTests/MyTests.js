import React, { Component } from 'react';
import {connect} from "react-redux";


class MyTests extends Component {

  render() {
    return (
      <div>
        Mes tests
      </div>
    );
  }
}

const MyTestsComponent = connect(null, null)(MyTests)

export default MyTestsComponent;
