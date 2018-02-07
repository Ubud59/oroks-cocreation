import React, { Component } from 'react';
import { connect } from "react-redux";

import { getTestState } from '../../store/test/selectors';
import { updateTest } from '../../store/test/actions';

import './TestNew.css';

class TestNew extends Component {
  render() {

    console.log("this.props dans TestNew Component",this.props);
    return (
      <div className="container pt-5">
        <div className="card border-light text-secondary mb-3">
          <div className="card-header">Création d un nouveau test</div>
          <div className="card-body text-dark">
            <form>

              <fieldset className="form-group">
                <div className="row text-secondary">
                  <legend className="col-form-label col-sm-2 pt-0">Type de test</legend>
                  <div className="col-sm-10">
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="STATIC_FITTING" checked={this.props.test.type === "STATIC_FITTING"} onChange={() => this.props.updateTestType("STATIC_FITTING")}/>
                      <label className="form-check-label">
                        Fitting statique
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="DYNAMIC_FITTING" checked={this.props.test.type === "DYNAMIC_FITTING"} onChange={() => this.props.updateTestType("DYNAMIC_FITTING")}/>
                      <label className="form-check-label">
                        Fitting dynamique
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="FIELD" checked={this.props.test.type === "FIELD"} onChange={() => this.props.updateTestType("FIELD")}/>
                      <label className="form-check-label">
                        Fonction terrain
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios4" value="DURABILITY" checked={this.props.test.type === "DURABILITY"} onChange={() => this.props.updateTestType("DURABILITY")}/>
                      <label className="form-check-label">
                        Durabilité
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios5" value="SENSORIAL" checked={this.props.test.type === "SENSORIAL"} onChange={() => this.props.updateTestType("SENSORIAL")}/>
                      <label className="form-check-label">
                        Sensoriel
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios6" value="USAGE" checked={this.props.test.type === "USAGE"} onChange={() => this.props.updateTestType("USAGE")}/>
                      <label className="form-check-label">
                        Usage
                      </label>
                    </div>
                  </div>
                </div>
              </fieldset>

              <div className="form-group">
                <label >Référence du test</label>
                <input type="text" className="form-control" id="ref" placeholder="Référence du test" value={this.props.test.ref} onChange={(event) => this.props.updateTestRef(event.target.value)}/>
              </div>
              <div className="form-group">
                <label >Titre du test</label>
                <input type="text" className="form-control" id="ref" placeholder="Titre du test"/>
              </div>



              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>

      </div>
    );
  }
}


// CREATE TYPE test_status AS ENUM ('NOT_STARTED','IN_PROGRESS','DONE');
//
// CREATE TABLE  tests  (
//    id                   uuid,
//    type                 test_type,
//    test_reference       VARCHAR,
//    title                VARCHAR,
//    product              VARCHAR,
//    status               test_status,
//    description          VARCHAR,
//    validation_treshold  VARCHAR,
//    timing               VARCHAR,
//    image_src            VARCHAR,
//    evaluation_form_path   VARCHAR,
//    evaluation_results_path  VARCHAR,
//   PRIMARY KEY ( id )
// );


const TestNewComponent = connect(getTestState, updateTest)(TestNew)
export default TestNewComponent;
