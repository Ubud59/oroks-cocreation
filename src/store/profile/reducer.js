const initialState = {
  id: null,
  userId: null,
  expertPanel: null,
  sex: null,
  birthYear: null,
  height: null,
  weight: null,
  practiceType: null,
  clubCity: null,
  category: null,
  nbYearPractice: null,
  shoeSize: null,
  skateWidth: null,
  shinGardSize: null,
  pantSize: null,
  elbowPadSize: null,
  shoulderPadSize: null,
  gloveSize: null,
  helmetSize: null,
  headSize: null,
};

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case "CREATE_MY_PROFILE":
      return action.profile;
    case "UPDATE_PROFILE_FIELD":
      return {...state, [action.field]:action.value};

    default:
      return state;

  }
}
