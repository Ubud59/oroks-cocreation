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
                      <input className="form-check-input" type="radio" name="TypeRadio" id="TypeRadio1" value="STATIC_FITTING" checked={this.props.test.type === "STATIC_FITTING"} onChange={() => this.props.updateTestField("type","STATIC_FITTING")}/>
                      <label className="form-check-label">
                        Fitting statique
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="TypeRadio" id="TypeRadio2" value="DYNAMIC_FITTING" checked={this.props.test.type === "DYNAMIC_FITTING"} onChange={() => this.props.updateTestField("type","DYNAMIC_FITTING")}/>
                      <label className="form-check-label">
                        Fitting dynamique
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="TypeRadio" id="TypeRadio3" value="FIELD" checked={this.props.test.type === "FIELD"} onChange={() => this.props.updateTestField("type","FIELD")}/>
                      <label className="form-check-label">
                        Fonction terrain
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="TypeRadio" id="TypeRadio4" value="DURABILITY" checked={this.props.test.type === "DURABILITY"} onChange={() => this.props.updateTestField("type","DURABILITY")}/>
                      <label className="form-check-label">
                        Durabilité
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="TypeRadio" id="TypeRadio5" value="SENSORIAL" checked={this.props.test.type === "SENSORIAL"} onChange={() => this.props.updateTestField("type","SENSORIAL")}/>
                      <label className="form-check-label">
                        Sensoriel
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="TypeRadio" id="TypeRadio6" value="USAGE" checked={this.props.test.type === "USAGE"} onChange={() => this.props.updateTestField("type","USAGE")}/>
                      <label className="form-check-label">
                        Usage
                      </label>
                    </div>
                  </div>
                </div>
              </fieldset>

              <div className="form-group">
                <label >Référence du test</label>
                <input type="text" className="form-control" id="ref" placeholder="Référence du test" value={this.props.test.ref} onChange={(event) => this.props.updateTestField("ref",event.target.value)}/>
              </div>

              <div className="form-group">
                <label >Titre du test</label>
                <input type="text" className="form-control" id="ref" placeholder="Titre du test" value={this.props.test.title} onChange={(event) => this.props.updateTestField("title",event.target.value)}/>
              </div>

              <div className="form-group">
                <label >Product référence</label>
                <input type="text" className="form-control" id="ref" placeholder="Référence du produit ou du prototype testé" value={this.props.test.product} onChange={(event) => this.props.updateTestField("product",event.target.value)}/>
              </div>

              <fieldset className="form-group">
                <div className="row text-secondary">
                  <legend className="col-form-label col-sm-2 pt-0">Statut</legend>
                  <div className="col-sm-10">
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="statusRadio" id="statusRadio1" value="NOT_STARTED" checked={this.props.test.status === "NOT_STARTED"} onChange={() => this.props.updateTestField("status","NOT_STARTED")}/>
                      <label className="form-check-label">
                        Non démarré
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="statusRadio" id="statusRadio2" value="IN_PROGRESS" checked={this.props.test.status === "IN_PROGRESS"} onChange={() => this.props.updateTestField("status","IN_PROGRESS")}/>
                      <label className="form-check-label">
                        En cours
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="statusRadio" id="statusRadio3" value="DONE" checked={this.props.test.status === "DONE"} onChange={() => this.props.updateTestField("status","DONE")}/>
                      <label className="form-check-label">
                        Clôturé
                      </label>
                    </div>
                  </div>
                </div>
              </fieldset>

              <div className="form-group">
                <label >Description </label>
                <input type="text" className="form-control" id="ref" placeholder="Description du test" value={this.props.test.description} onChange={(event) => this.props.updateTestField("description",event.target.value)}/>
              </div>

              <div className="form-group">
                <label >Critères de validation </label>
                <input type="text" className="form-control" id="ref" placeholder="Critères de validation" value={this.props.test.validation_treshold} onChange={(event) => this.props.updateTestField("validation_treshold",event.target.value)}/>
              </div>

              <div className="form-group">
                <label >Dates du test</label>
                <input type="text" className="form-control" id="ref" placeholder="Dates du test" value={this.props.test.timing} onChange={(event) => this.props.updateTestField("timing",event.target.value)}/>
              </div>

              <div className="form-group">
                <label >Upload de l'image produit</label>
                <input type="file" onChange={(event) => this.props.updateTestField("image_src",event.target.files[0])}/>
              </div>




              <div className="form-group">
                <label >Lien vers le formulaire d'évaluation</label>
                <input type="text" className="form-control" id="ref" placeholder="Lien Google Drive vers le formulaire d'évaluation" value={this.props.test.evaluation_form_path} onChange={(event) => this.props.updateTestField("evaluation_form_path",event.target.value)}/>
              </div>

              <div className="form-group">
                <label >Lien vers le fichier de résultats</label>
                <input type="text" className="form-control" id="ref" placeholder="Lien Google Drive vers le fichier de résultats" value={this.props.test.evaluation_form_path} onChange={(event) => this.props.updateTestField("evaluation_form_path",event.target.value)}/>
              </div>

              <button type="submit" className="btn btn-primary" onSubmit={() => this.props.createTest(this.props.test)}>Créer le test</button>
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
