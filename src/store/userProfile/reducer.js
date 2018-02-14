import { postNewProfile } from '../../utils/profile.services.js';
import { clearToken } from '../../utils/auth.services';

const initialState = {
  id: null,
  first_name: null,
  last_name: null,
  birthdate: null,
  sex: null,
  email: null,
  phone_number: null,
  user_type: null,
  expert_panel: null,
  height: null,
  weight: null,
  practice_type: null,
  club_city: null,
  club_name: null,
  start_of_practice_year: null,
  category: null,
  shoe_size: null,
  skate_width: null,
  shin_gard_size: null,
  pant_size: null,
  elbow_pad_size: null,
  shoulder_pad_size: null,
  glove_size: null,
  helmet_size: null,
  head_size: null
};

export default function userProfileReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGGED_IN":
      return action.user;
    case "SIGN_OUT":
      clearToken();
      return initialState;
    case "UPDATE_MY_PROFILE":
      return postNewProfile(action.profile);
      case "UPDATE_PROFILE_FIELD":
        return {...state, [action.field]: action.value};
    default:
      return state;
  }
}
