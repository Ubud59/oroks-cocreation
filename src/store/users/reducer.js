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
        id: action.id,
        firstName: action.firstName,
        lastName: action.lastName,
        email: action.email,
        phoneNumber: action.phoneNumber,
        userType: action.userType
      };
    case "SIGN_OUT":
      return initialState;
    default:
      return state;
  }
}
