import React, { Component } from 'react';
import {connect} from "react-redux";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';





class Profile extends Component {

    constructor(props) {
      super(props);
      this.handleDayChange = this.handleDayChange.bind(this);
      this.state = {
        selectedDay: undefined,
      };
    }
    handleDayChange(day) {
      this.setState({ selectedDay: day });
    }


  render() {
    const { selectedDay } = this.state;
    return (
      <div>
        <form>
          <div className="form-row">

            <div className="form-group col-md-6">
              <label for="FirstName">Prénom</label>
              <input type="text" className="form-control" id="firstname" placeholder="FirstName"/>
            </div>

            <div className="form-group col-md-6">
              <label for="LastName">Nom</label>
              <input type="text" className="form-control" id="lastname" placeholder="LastName"/>
            </div>

          </div>

          <div className="form-group col-md-4">
            <label for="sex">Sexe</label>
            <select id="sexe" className="form-control">
              <option selected>Choose...</option>
              <option>Homme</option>
              <option>Femme</option>
              <option>Trans</option>
            </select>
          </div>

          <div>
            {selectedDay && <p>Date de naissance : {selectedDay.toLocaleDateString()}</p>}
            {!selectedDay && <p>Date de naissance</p>}
            <DayPickerInput   onDayChange={this.handleDayChange} />
          </div>

          <div className="form-group col-md-6">
            <label for="stature">Stature</label>
            <input type="text" className="form-control" id="stature" placeholder="Stature"/>
          </div>

          <div className="form-group col-md-6">
            <label for="PhoneNumber">Numéro de téléphone</label>
            <input type="text" className="form-control" id="phonenumber" placeholder="PhoneNumber"/>
          </div>

          <div className="form-group col-md-6">
            <label for="Email">Email</label>
            <input type="text" className="form-control" id="email" placeholder="Email"/>
          </div>

          <div className="form-group col-md-4">
            <label for="practice_type">Type de pratique</label>
            <select id="practice" className="form-control">
              <option selected>Choose...</option>
              <option>Hockey sur glace</option>
              <option>Roller Hockey</option>
              <option>Hockey Google</option>
            </select>
          </div>

          <div className="form-group col-md-6">
            <label for="ClubCity">Club - Ville</label>
            <input type="text" className="form-control" id="clubcity" placeholder="ClubCity"/>
          </div>

          <div className="form-group col-md-4">
            <label for="experience">`Nombre d'annee de pratique`</label>
            <select id="practice" className="form-control">
              <option selected>Choose...</option>
              <option>`Moins d'un an et demi`</option>
              <option>2-5 ans</option>
              <option>5-10 ans</option>
              <option>10-15 ans</option>
              <option>plus de 15 ans</option>
            </select>
          </div>

          <div className="form-group col-md-4">
            <label for="categories">Catégories</label>
            <select id="categories" className="form-control">
              <option selected>Choose...</option>
              <option>Junior</option>
              <option>U20</option>
              <option>Loisir</option>
              <option>Loisir compétition (trophée loisir)</option>
              <option>Féminin Excellence</option>
              <option>Féminin Elite</option>
              <option>D3 / N3</option>
              <option>D2 / N2</option>
              <option>D1 / N1</option>
              <option>Magnus / Elite</option>
              <option></option>
            </select>
          </div>

          <div className="form-group col-md-4">
            <label for="shoesize">Pointure</label>
            <select id="shoesize" className="form-control">
              <option selected>Choose...</option>
              <option>22 - Y06</option>
              <option>23,5 - Y07</option>
              <option>25 - Y08</option>
              <option>27 - Y09</option>
              <option>28 - Y10</option>
              <option>29 - Y11</option>
              <option>30 - Y12</option>
              <option>31,5 - Y13</option>
              <option>33 - 1</option>
              <option>33,5 - 1,5</option>
              <option>34 - 2</option>
              <option>35 - 2,5</option>
              <option>35,5 - 3</option>
              <option>36 - 3,5</option>
              <option>37 - 4</option>
              <option>37,5 - 4,5</option>
              <option>38 - 5</option>
              <option>38,5 - 5,5</option>
              <option>39 - 6</option>
              <option>40 - 6,5</option>
            </select>
          </div>

          <div className="form-group col-md-4">
            <label for="skatewidth">Largeur de patins</label>
            <select id="skatewidth" className="form-control">
              <option selected>Choose...</option>
              <option>D</option>
              <option>EE</option>
              <option>Je ne sais pas</option>
            </select>
          </div>

          <div className="form-group col-md-4">
            <label for="shinGardSize">Taille jambière</label>
            <select id="shinGardSize" className="form-control">
              <option selected>Choose...</option>
              <option>`8'`</option>
              <option>`9'`</option>
              <option>`10'`</option>
              <option>`11'`</option>
              <option>`12'`</option>
              <option>`13'`</option>
              <option>`14'`</option>
              <option>`15'`</option>
              <option>`16'`</option>
              <option>`17'`</option>
              <option>`18'`</option>
            </select>
          </div>

          <div className="form-group col-md-4">
            <label for="pantsize">Taille culotte</label>
            <select id="pantsize" className="form-control">
              <option selected>Choose...</option>
              <option>`YTH XS`</option>
              <option>`YTH S`</option>
              <option>`YTH M`</option>
              <option>`YTH L`</option>
              <option>`JR S`</option>
              <option>`JR M`</option>
              <option>`JR L`</option>
              <option>`JR XL`</option>
              <option>`SR S`</option>
              <option>`SR M`</option>
              <option>`SR L`</option>
              <option>`SR XL`</option>
              <option>`SR XXL`</option>
            </select>
          </div>

          <div className="form-group col-md-4">
            <label for="elbowPadSize">Coudières</label>
            <select id="elbowPadSize" className="form-control">
              <option selected>Choose...</option>
              <option>`YTH S`</option>
              <option>`YTH M`</option>
              <option>`YTH L`</option>
              <option>`JR S`</option>
              <option>`JR M`</option>
              <option>`JR L`</option>
              <option>`SR S`</option>
              <option>`SR M`</option>
              <option>`SR L`</option>
              <option>`SR XL`</option>
            </select>
          </div>

          <div className="form-group col-md-4">
            <label for="shoulderPadSize">Taille des gants</label>
            <select id="shoulderPadSize" className="form-control">
              <option selected>Choose...</option>
              <option>`8'`</option>
              <option>`9'`</option>
              <option>`10'`</option>
              <option>`11'`</option>
              <option>`12'`</option>
              <option>`13'`</option>
              <option>`14'`</option>
              <option>`15'`</option>
            </select>
          </div>

          <div className="form-group col-md-4">
            <label for="gloveSize">Taille de casque</label>
            <select id="gloveSize" className="form-control">
              <option selected>Choose...</option>
              <option>Junior</option>
              <option>XS</option>
              <option>S</option>
              <option>M</option>
              <option>L</option>
              <option>XL</option>
            </select>
          </div>

          <div className="form-group col-md-6">
            <label for="headSize">Tour de tête</label>
            <input type="text" className="form-control" id="headSize" placeholder="headSize"/>
          </div>

  
          <button type="submit" className="btn btn-primary">Sign in</button>
        </form>
      </div>
    );
  }
}

const ProfileComponent = connect(null, null)(Profile)

export default ProfileComponent;
