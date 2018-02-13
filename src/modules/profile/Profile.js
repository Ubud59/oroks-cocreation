import React, { Component } from 'react';
import {connect} from "react-redux";

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
            <label for="stature">Taille</label>
            <input type="text" className="form-control" id="height" placeholder="Stature" value={this.props.userProfile.height} onChange={(event) => this.props.updateProfileField("height", event.target.value)}/>
          </div>



          <div className="form-group col-md-4" >
            <label for="practice_type">Type de pratique</label>
            <select id="practice" className="form-control" value={this.props.userProfile.practice_type} onChange={(event) => this.props.updateProfileField("practice_type", event.target.value)}>
              <option>Choose...</option>
              <option selected={this.props.userProfile.practice_type === "Hockey sur glace"}>Hockey sur glace</option>
              <option selected={this.props.userProfile.practice_type === "Roller Hockey"}>Roller Hockey</option>
            </select>
          </div>

          <div className="form-group col-md-6" >
            <label for="ClubCity">Club - Ville</label>
            <input type="text" className="form-control" id="clubcity" value={this.props.userProfile.club_city} placeholder="ClubCity" onChange={(event) => this.props.updateProfileField("club_city", event.target.value)}/>
          </div>

          <div className="form-group col-md-6" >
            <label for="start_of_practice_year">Pratique depuis l'année</label>
            <input type="text" className="form-control" id="start_of_practice_year" value={this.props.userProfile.start_of_practice_year} placeholder="ClubCity" onChange={(event) => this.props.updateProfileField("start_of_practice_year", event.target.value)}/>
          </div>

          <div className="form-group col-md-4">
            <label for="categories">Catégories</label>
            <select id="categories" className="form-control" value={this.props.userProfile.category} onChange={(event) => this.props.updateProfileField("category", event.target.value)}>
              <option >Choose...</option>
              <option selected={this.props.userProfile.category === "Junior"}>Junior</option>
              <option selected={this.props.userProfile.category === "U20"}>U20</option>
              <option selected={this.props.userProfile.category === "Loisir"}>Loisir</option>
              <option selected={this.props.userProfile.category === "Loisir compétition (trophée loisir)"}>Loisir compétition (trophée loisir)</option>
              <option selected={this.props.userProfile.category === "Féminin Excellence"}>Féminin Excellence</option>
              <option selected={this.props.userProfile.category === "Féminin Elite"}>Féminin Elite</option>
              <option selected={this.props.userProfile.category === "D3 / N3"}>D3 / N3</option>
              <option selected={this.props.userProfile.category === "D2 / N2"}>D2 / N2</option>
              <option selected={this.props.userProfile.category === "D1 / N1"}>D1 / N1</option>
              <option selected={this.props.userProfile.category === "Magnus / Elite"}>Magnus / Elite</option>
              <option></option>
            </select>
          </div>

          <div className="form-group col-md-4">
            <label for="shoesize">Pointure</label>
            <select id="shoesize" className="form-control" value={this.props.userProfile.shoe_size} onChange={(event) => this.props.updateProfileField("shoe_size", event.target.value)}>
              <option selected>Choose...</option>
              <option selected={this.props.userProfile.shoe_size === "22 - Y06"}>22 - Y06</option>
              <option selected={this.props.userProfile.shoe_size === "23,5 - Y07"}>23,5 - Y07</option>
              <option selected={this.props.userProfile.shoe_size === "25 - Y08"}>25 - Y08</option>
              <option selected={this.props.userProfile.shoe_size === "27 - Y09"}>27 - Y09</option>
              <option selected={this.props.userProfile.shoe_size === "28 - Y10"}>28 - Y10</option>
              <option selected={this.props.userProfile.shoe_size === "29 - Y11"}>29 - Y11</option>
              <option selected={this.props.userProfile.shoe_size === "30 - Y12"}>30 - Y12</option>
              <option selected={this.props.userProfile.shoe_size === "31,5 - Y13"}>31,5 - Y13</option>
              <option selected={this.props.userProfile.shoe_size === "33 - 1"}>33 - 1</option>
              <option selected={this.props.userProfile.shoe_size === "33,5 - 1,5"}>33,5 - 1,5</option>
              <option selected={this.props.userProfile.shoe_size === "34 - 2"}>34 - 2</option>
              <option selected={this.props.userProfile.shoe_size === "35 - 2,5"}>35 - 2,5</option>
              <option selected={this.props.userProfile.shoe_size === "35,5 - 3"}>35,5 - 3</option>
              <option selected={this.props.userProfile.shoe_size === "36 - 3,5"}>36 - 3,5</option>
              <option selected={this.props.userProfile.shoe_size === "37 - 4"}>37 - 4</option>
              <option selected={this.props.userProfile.shoe_size === "37,5 - 4,5"}>37,5 - 4,5</option>
              <option selected={this.props.userProfile.shoe_size === "38 - 5"}>38 - 5</option>
              <option selected={this.props.userProfile.shoe_size === "38,5 - 5,5"}>38,5 - 5,5</option>
              <option selected={this.props.userProfile.shoe_size === "39 - 6"}>39 - 6</option>
              <option selected={this.props.userProfile.shoe_size === "40 - 6,5"}>40 - 6,5</option>
            </select>
          </div>

          <div className="form-group col-md-4">
            <label for="skatewidth">Largeur de patins</label>
            <select id="skatewidth" className="form-control" value={this.props.userProfile.skate_width} onChange={(event) => this.props.updateProfileField("skate_width", event.target.value)}>
              <option selected>Choose...</option>
              <option selected={this.props.userProfile.skate_width === "D"}>D</option>
              <option selected={this.props.userProfile.skate_width === "EE"}>EE</option>
              <option selected={this.props.userProfile.skate_width === "Je ne sais pas"}>Je ne sais pas</option>
            </select>
          </div>

          <div className="form-group col-md-4">
            <label for="shinGardSize">Taille jambière</label>
            <select id="shinGardSize" className="form-control"  onChange={(event) => this.props.updateProfileField("shin_gard_size", event.target.value)}>
              <option selected>Choose...</option>
              <option  selected={this.props.userProfile.shin_gard_size === "8'"}>8'</option>
              <option  selected={this.props.userProfile.shin_gard_size === "9'"}>9'</option>
              <option  selected={this.props.userProfile.shin_gard_size === "10'"}>10'</option>
              <option  selected={this.props.userProfile.shin_gard_size === "11'"}>11'</option>
              <option  selected={this.props.userProfile.shin_gard_size === "12'"}>12'</option>
              <option  selected={this.props.userProfile.shin_gard_size === "13'"}>13'</option>
              <option  selected={this.props.userProfile.shin_gard_size === "14'"}>14'</option>
              <option  selected={this.props.userProfile.shin_gard_size === "15'"}>15'</option>
              <option  selected={this.props.userProfile.shin_gard_size === "16'"}>16'</option>
              <option  selected={this.props.userProfile.shin_gard_size === "17'"}>17'</option>
              <option  selected={this.props.userProfile.shin_gard_size === "18'"}>18'</option>
            </select>
          </div>

          <div className="form-group col-md-4">
            <label for="pantsize">Taille culotte</label>
            <select id="pantsize" className="form-control" onChange={(event) => this.props.updateProfileField("pant_size", event.target.value)}>
              <option selected>Choose...</option>
              <option  selected={this.props.userProfile.pant_size === "YTH XS"}>YTH XS</option>
              <option  selected={this.props.userProfile.pant_size === "YTH S"}>YTH S</option>
              <option  selected={this.props.userProfile.pant_size === "YTH M"}>YTH M</option>
              <option  selected={this.props.userProfile.pant_size === "YTH L"}>YTH L</option>
              <option  selected={this.props.userProfile.pant_size === "JR S"}>JR S</option>
              <option  selected={this.props.userProfile.pant_size === "JR M"}>JR M</option>
              <option  selected={this.props.userProfile.pant_size === "JR L"}>JR L</option>
              <option  selected={this.props.userProfile.pant_size === "JR XL"}>JR XL</option>
              <option  selected={this.props.userProfile.pant_size === "SR S"}>SR S</option>
              <option  selected={this.props.userProfile.pant_size === "SR M"}>SR M</option>
              <option  selected={this.props.userProfile.pant_size === "SR L"}>SR L</option>
              <option  selected={this.props.userProfile.pant_size === "SR XL"}>SR XL</option>
              <option  selected={this.props.userProfile.pant_size === "SR XXL"}>SR XXL</option>
            </select>
          </div>

          <div className="form-group col-md-4">
            <label for="elbowPadSize">Coudières</label>
            <select id="elbowPadSize" className="form-control" onChange={(event) => this.props.updateProfileField("elbow_pad_size", event.target.value)}>
              <option selected>Choose...</option>
              <option  selected={this.props.userProfile.elbow_pad_size === "YTH S"}>YTH S</option>
              <option  selected={this.props.userProfile.elbow_pad_size === "YTH M"}>YTH M</option>
              <option   selected={this.props.userProfile.elbow_pad_size === "YTH L"}>YTH L</option>
              <option  selected={this.props.userProfile.elbow_pad_size === "JR S"}>JR S</option>
              <option  selected={this.props.userProfile.elbow_pad_size === "JR M"}>JR M</option>
              <option  selected={this.props.userProfile.elbow_pad_size === "JR L"}>JR L</option>
              <option  selected={this.props.userProfile.elbow_pad_size === "SR S"}>SR S</option>
              <option>  selected={this.props.userProfile.elbow_pad_size === "SR M"}SR M</option>
              <option>  selected={this.props.userProfile.elbow_pad_size === "SR L"}SR L</option>
              <option>  selected={this.props.userProfile.elbow_pad_size === "SR XL"}SR XL</option>
            </select>
          </div>

          <div className="form-group col-md-4">
            <label for="shoulderPadSize">Taille des gants</label>
            <select id="shoulderPadSize" className="form-control" onChange={(event) => this.props.updateProfileField("shoulder_pad_size", event.target.value)}>
              <option selected>Choose...</option>
              <option selected={this.props.userProfile.shoulder_pad_size === "8'"}>8'</option>
              <option selected={this.props.userProfile.elbow_pad_size === "9'"}>9'</option>
              <option selected={this.props.userProfile.elbow_pad_size === "10'"}>10'</option>
              <option selected={this.props.userProfile.elbow_pad_size === "11'"}>11'</option>
              <option selected={this.props.userProfile.elbow_pad_size === "12'"} >12'</option>
              <option selected={this.props.userProfile.elbow_pad_size === "13'"}>13'</option>
              <option selected={this.props.userProfile.elbow_pad_size === "14'"}>14'</option>
              <option selected={this.props.userProfile.elbow_pad_size === "15'"}>15'</option>
            </select>
          </div>

          <div className="form-group col-md-4">
            <label for="gloveSize">Taille de casque</label>
            <select id="gloveSize" className="form-control" onChange={(event) => this.props.updateProfileField("glove_size", event.target.value)}>
              <option selected>Choose...</option>
              <option selected={this.props.userProfile.glove_size === "Junior"}>Junior</option>
              <option selected={this.props.userProfile.glove_size === "XS"}>XS</option>
              <option selected={this.props.userProfile.glove_size === "S"}>S</option>
              <option selected={this.props.userProfile.glove_size === "M"}>M</option>
              <option selected={this.props.userProfile.glove_size === "L"}>L</option>
              <option selected={this.props.userProfile.glove_size === "XL"}>XL</option>
            </select>
          </div>

          <div className="form-group col-md-6">
            <label for="headSize">Tour de tête</label>
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
