const initialState = {
  id: "643df341-6eb2-4ff2-9af9-9b169f8447fd",
  first_name: "Romuald",
  last_name: "OROKS",
  birthdate: "1967-03-22T00:00:00.000+0000",
  sex: "1",
  email: "test.orocks.2@decathlon.com",
  phone_number: null,
  user_type: "TEST",
  expert_panel: "EXPERT",
  height: "170",
  weight: "70",
  practice_type: "ROLLER",
  club_city: "PARIS",
  club_name: "CLUB PARIS",
  start_of_practice_year: "2016",
  category: "D2",
  shoe_size: "41",
  skate_width: "EE",
  shin_gard_size: "SR XL",
  pant_size: "SR XL",
  elbow_pad_size: "SR XL",
  shoulder_pad_size: "SR XL",
  glove_size: "12",
  helmet_size: "L",
  head_size: "56"
};

export default function userProfileReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGGED_IN":
      return initialState;
    case "SIGN_OUT":
      return initialState;
    default:
      return state;
  }
}
