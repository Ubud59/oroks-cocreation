import React, { Component } from 'react';
import { connect } from "react-redux";

import { getTestState } from '../../store/test/selectors';
import { updateTest } from '../../store/test/actions';

import './TestNew.css';

class TestNew extends Component {

  submitForm = (event) => {
    event.preventDefault();
    if (this.validateTest(this.props.test)) {this.props.createTest(this.props.test)};
  }

  validateTest = (test) => {
    if (test.type === "") {
      alert("Veuillez renseigner le type de test");
      return false;
    } else if (test.title === "") {
      alert("Veuillez renseigner le titre du test");
      return false;
    } else if (test.status === "") {
      alert("Veuillez renseigner le statut du test");
      return false;
    } else if (test.imageSrc === "") {
      alert("Veuillez uploader une image du produit à tester");
      return false;
    } else if (test.createdBy === "") {
      alert("Veuillez vous connecter avant de procéder à cette action");
      return false;
    } else {
      return true;
    }
  }

  componentDidMount() {
    this.props.updateTestField("createdBy",this.props.user.id);
  }

  render() {

    console.log("this.props dans TestNew Component",this.props);
    console.log("image object",this.props.test.imageSrc.name);

    return (
      <div className="container pt-5">
        <div className="card border-light text-secondary mb-3">
          <div className="card-header">Création d un nouveau test</div>
          <div className="card-body text-dark">
            <form onSubmit={this.submitForm}>

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
                <input type="text" className="form-control" value={this.props.test.testReference} onChange={(event) => this.props.updateTestField("testReference",event.target.value)}/>
              </div>

              <div className="form-group">
                <label >Titre du test</label>
                <input type="text" className="form-control" value={this.props.test.title} onChange={(event) => this.props.updateTestField("title",event.target.value)}/>
              </div>

              <div className="form-group">
                <label >Product référence</label>
                <input type="text" className="form-control" value={this.props.test.product} onChange={(event) => this.props.updateTestField("product",event.target.value)}/>
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
                <input type="text" className="form-control" value={this.props.test.description} onChange={(event) => this.props.updateTestField("description",event.target.value)}/>
              </div>

              <div className="form-group">
                <label >Critères de validation </label>
                <input type="text" className="form-control" value={this.props.test.validationThreshold} onChange={(event) => this.props.updateTestField("validationThreshold",event.target.value)}/>
              </div>

              <div className="form-group">
                <label >Dates du test</label>
                <input type="text" className="form-control" value={this.props.test.timing} onChange={(event) => this.props.updateTestField("timing",event.target.value)}/>
              </div>

              <div className="form-group">
                Upload de l'image produit
              </div>
              <div className="pb-3">
                <label className="btn btn-secondary" >
                    Browse...
                  <input type="file" hidden onChange={(event) => this.props.updateTestField("imageSrc",event.target.files[0])}/>
                </label>
                <span className="pl-2">{this.props.test.imageSrc.name}</span>
              </div>

              <div className="form-group">
                <label >Lien vers le formulaire d'évaluation</label>
                <input type="text" className="form-control" value={this.props.test.evaluationFormPath} onChange={(event) => this.props.updateTestField("evaluationFormPath",event.target.value)}/>
              </div>

              <div className="form-group">
                <label >Lien vers le fichier de résultats</label>
                <input type="text" className="form-control" value={this.props.test.evaluationResultsPath} onChange={(event) => this.props.updateTestField("evaluationResultsPath",event.target.value)}/>
              </div>

              <div className="pt-3">
                <button type="submit" className="btn btn-secondary" >Valider la création du test</button>
              </div>

            </form>
          </div>
        </div>

      </div>
    );
  }
}

const TestNewComponent = connect(getTestState, updateTest)(TestNew)
export default TestNewComponent;
