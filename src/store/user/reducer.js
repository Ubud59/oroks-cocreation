const initialState = {
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  phoneNumber: null,
  userType: null
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGGED_IN":
      return {
        firstName: action.user.firstname,
        lastName: action.user.lastname
      };
    case "SIGN_OUT":
      return initialState;
    default:
      return state;
  }
}
