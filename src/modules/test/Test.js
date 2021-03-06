import React, { Component } from 'react';
import { connect } from "react-redux";

import { getTestState } from '../../store/test/selectors';
import { updateTest } from '../../store/test/actions';
import { fetchTest } from '../../utils/test.services.js';
import { Navbar, Nav, NavItem, NavLink, NavbarToggler, Collapse } from "reactstrap";
import { uploadFile } from '../../utils/test.services.js';


class Test extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.userProfile.id && this.props.userProfile.id){
      if (this.props.match.params.id) {
        fetchTest(this.props.match.params.id)
          .then(test => this.props.fetchTest(test))
          .catch(error => console.warn(error));
      } else {
        this.props.updateTestField("created_by",this.props.userProfile.id);
      }
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  submitForm = (event) => {
    event.preventDefault();
    if (this.validateTest(this.props.test)) {
      if (this.props.test.id) {
        this.props.updateTest(this.props.test);
      } else {
        this.props.createTest(this.props.test)
        .then (id => this.props.history.push(`/test/${id}`));
      }
    }
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
    } else if (test.image_src === "") {
      alert("Veuillez uploader une image du produit à tester");
      return false;
    } else if (test.created_by === "") {
      alert("Veuillez vous connecter avant de procéder à cette action");
      return false;
    } else {
      return true;
    }
  }

  handleUpload = (file) => {
    uploadFile(file)
    .then((response) => {
      this.props.updateTestField("image_src",response);
    });
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
                    <NavItem active className="bg-white border">
                      <NavLink href={`/test/${this.props.test.id}`}>Détails</NavLink>
                    </NavItem>
                    <NavItem className="bg-white border">
                      <NavLink href={`/test/${this.props.test.id}/eval`}>Evaluation</NavLink>
                    </NavItem>
                    <NavItem className="bg-white border">
                      <NavLink href={`/test/${this.props.test.id}/selection`}>Constituer équipe</NavLink>
                    </NavItem>
                    <NavItem className="bg-white border">
                      <NavLink href={`/test/${this.props.test.id}/participants`}>Equipe tests</NavLink>
                    </NavItem>
                    <NavItem className="bg-white border">
                      <NavLink href={`/test/${this.props.test.id}/results`}>Résultats</NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
              </Navbar>
            </div>
          </div>

          <div className="card-body">


          <form onSubmit={this.submitForm}>

            <div className="row pt-5">
              <div className="col-9">
                <div className="form-group">
                  <label >Référence du produit ou du prototype</label>
                  <input type="text" className="form-control" value={this.props.test.product} onChange={(event) => this.props.updateTestField("product",event.target.value)}/>
                </div>

                <div className="form-group">
                  <label >URL de l'image produit</label>
                  <input type="text" className="form-control" value={this.props.test.image_src} onChange={(event) => this.props.updateTestField("image_src",event.target.value)}/>
                </div>
                <div className="pb-5">
                  <label className="btn mybutton" >
                      Upload de l'image
                    <input type="file" hidden onChange={(event) => this.handleUpload(event.target.files[0])}/>
                  </label>
                </div>
              </div>
              <div className="col-3">
                {
                  (this.props.test.image_src) ?
                  (<img className="img-fluid product-image" alt="" src={this.props.test.image_src}/>)
                  : (null)
                }
              </div>
            </div>

            <div className="form-group">
              <label >Titre du test</label>
              <input type="text" className="form-control" value={this.props.test.title} onChange={(event) => this.props.updateTestField("title",event.target.value)}/>
            </div>

            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label >Numéro du test</label>
                  <input type="text" className="form-control col-10" value={this.props.test.test_reference} onChange={(event) => this.props.updateTestField("test_reference",event.target.value)}/>
                </div>

                <fieldset className="form-group">
                  <div className="row text-secondary">
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
              </div>

              <div className="col">
                <fieldset className="form-group">
                  <div className="row text-secondary">
                    <legend className="col-form-label col-sm-4 offset-col-sm-1 pl-3">Type de test</legend>
                    <div className="col-sm-7">
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
              </div>
            </div>

            <div className="form-group">
              <label >Description </label>
              <input type="text" className="form-control" value={this.props.test.description} onChange={(event) => this.props.updateTestField("description",event.target.value)}/>
            </div>

            <div className="form-group">
              <label >Critères de validation </label>
              <input type="text" className="form-control" value={this.props.test.validation_threshold} onChange={(event) => this.props.updateTestField("validation_threshold",event.target.value)}/>
            </div>

            <div className="form-group">
              <label >Dates du test</label>
              <input type="text" className="form-control" value={this.props.test.timing} onChange={(event) => this.props.updateTestField("timing",event.target.value)}/>
            </div>

            <div className="form-group">
              <label >Lien vers le formulaire d'évaluation</label>
              <input type="text" className="form-control" value={this.props.test.evaluation_form_path} onChange={(event) => this.props.updateTestField("evaluation_form_path",event.target.value)}/>
            </div>

            <div className="form-group">
              <label >Lien vers le fichier de résultats</label>
              <input type="text" className="form-control" value={this.props.test.evaluation_results_path} onChange={(event) => this.props.updateTestField("evaluation_results_path",event.target.value)}/>
            </div>

            <div className="pt-3">
              <button type="submit" className="btn mybutton" >Enregistrer</button>
            </div>

          </form>

          </div>
        </div>
      </div>
    );
  }
}



const TestComponent = connect(getTestState, updateTest)(Test)
export default TestComponent;
