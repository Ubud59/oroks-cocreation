import React, { Component } from 'react';
import {connect} from "react-redux";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import {getUserProfile} from '../../store/userProfile/selectors';
import {updateProfile} from '../../store/userProfile/actions';
import { fetchMyProfile } from '../../utils/profile.services.js';



class Profile extends Component {

  componentDidMount(){
    fetchMyProfile(this.props.userProfile.id)
    .then(profile => {
      return profile;
    })
    .then(profile => this.props.fetchMyProfile(profile))
    .catch(error => console.warn(error));
  }


  render() {
    return (
      <div className="container pt-5">
        <div className="card border-light text-secondary mb-3">
          <div className="card-header">Mise à jour du profil</div>
          <div className="card-body text-dark">
          <form onSubmit={ (event) => {
            event.preventDefault();
            this.props.updateMyProfile(this.props.userProfile);
          }}>


          <div className="form-group col-md-6">
            <label htmlFor="stature">Stature</label>
            <input type="text" className="form-control" id="height" placeholder="Stature" onChange={(event) => this.props.updateProfileField("height", event.target.value)}/>
          </div>



          <div className="form-group col-md-4" >
            <label htmlFor="practice_type">Type de pratique</label>
            <select id="practice" className="form-control" value={this.props.userProfile.practice_type} onChange={(event) => this.props.updateProfileField("practice_type", event.target.value)}>
              <option selected>Choose...</option>
              <option>Hockey sur glace</option>
              <option>Roller Hockey</option>
              <option>Hockey Google</option>
            </select>
          </div>

          <div className="form-group col-md-6" >
            <label htmlFor="ClubCity">Club - Ville</label>
            <input type="text" className="form-control" id="clubcity" value={this.props.userProfile.club_city} placeholder="ClubCity" onChange={(event) => this.props.updateProfileField("club_city", event.target.value)}/>
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="experience">Nombre d'année de pratique</label>
            <select id="practice" className="form-control" onChange={(event) => this.props.updateProfileField("start_of_practice_year", event.target.value)}>
              <option selected>Choose...</option>
              <option>Moins d'un an et demi</option>
              <option>2-5 ans</option>
              <option>5-10 ans</option>
              <option>10-15 ans</option>
              <option>plus de 15 ans</option>
            </select>
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="categories">Catégories</label>
            <select id="categories" className="form-control" value={this.props.userProfile.category} onChange={(event) => this.props.updateProfileField("category", event.target.value)}>
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
            <label htmlFor="shoesize">Pointure</label>
            <select id="shoesize" className="form-control" value={this.props.userProfile.shoe_size} onChange={(event) => this.props.updateProfileField("shoe_size", event.target.value)}>
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
            <label htmlFor="skatewidth">Largeur de patins</label>
            <select id="skatewidth" className="form-control" value={this.props.userProfile.skate_width} onChange={(event) => this.props.updateProfileField("skate_width", event.target.value)}>
              <option selected>Choose...</option>
              <option>D</option>
              <option>EE</option>
              <option>Je ne sais pas</option>
            </select>
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="shinGardSize">Taille jambière</label>
            <select id="shinGardSize" className="form-control"  onChange={(event) => this.props.updateProfileField("shin_gard_size", event.target.value)}>
              <option selected>Choose...</option>
              <option>8'</option>
              <option>9'</option>
              <option>10'</option>
              <option>11'</option>
              <option>12'</option>
              <option>13'</option>
              <option>14'</option>
              <option>15'</option>
              <option>16'</option>
              <option>17'</option>
              <option>18'</option>
            </select>
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="pantsize">Taille culotte</label>
            <select id="pantsize" className="form-control" onChange={(event) => this.props.updateProfileField("pant_size", event.target.value)}>
              <option selected>Choose...</option>
              <option>YTH XS</option>
              <option>YTH S</option>
              <option>YTH M</option>
              <option>YTH L</option>
              <option>JR S</option>
              <option>JR M</option>
              <option>JR L</option>
              <option>JR XL</option>
              <option>SR S</option>
              <option>SR M</option>
              <option>SR L</option>
              <option>SR XL</option>
              <option>SR XXL</option>
            </select>
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="elbowPadSize">Coudières</label>
            <select id="elbowPadSize" className="form-control" onChange={(event) => this.props.updateProfileField("elbow_pad_size", event.target.value)}>
              <option selected>Choose...</option>
              <option>YTH S</option>
              <option>YTH M</option>
              <option>YTH L</option>
              <option>JR S</option>
              <option>JR M</option>
              <option>JR L</option>
              <option>SR S</option>
              <option>SR M</option>
              <option>SR L</option>
              <option>SR XL</option>
            </select>
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="shoulderPadSize">Taille des gants</label>
            <select id="shoulderPadSize" className="form-control" onChange={(event) => this.props.updateProfileField("shoulder_pad_size", event.target.value)}>
              <option selected>Choose...</option>
              <option>8'</option>
              <option>9'</option>
              <option>10'</option>
              <option>11'</option>
              <option>12'</option>
              <option>13'</option>
              <option>14'</option>
              <option>15'</option>
            </select>
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="gloveSize">Taille de casque</label>
            <select id="gloveSize" className="form-control" onChange={(event) => this.props.updateProfileField("glove_size", event.target.value)}>
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
            <label htmlFor="headSize">Tour de tête</label>
            <input type="text" className="form-control" id="headSize" value={this.props.userProfile.head_size} placeholder="headSize" onChange={(event) => this.props.updateProfileField("head_size", event.target.value)}/>
          </div>


          <button type="submit" className="btn btn-primary" >Enregister</button>
        </form>
      </div>
    </div>
      </div>
    );
  }
}

const ProfileComponent = connect(getUserProfile, updateProfile)(Profile)
export default ProfileComponent;
