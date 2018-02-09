const initialState = {
  id: "3c9a2dfd-fd84-406a-bb52-317dbeeb2f36",
  firstName: "Virginie",
  lastName: "ZINCK",
  email: "virginie.zinck@decathlon.com",
  phoneNumber: "0637542643",
  userType: "ENGINEER",
  external_id:"1234"
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGGED_IN":
      return {
        id: action.user.id,
        firstName: action.user.firstname,
        lastName: action.user.lastname,
        email: action.user.email,
        phoneNumber: action.user.phoneNumber
      };
    case "SIGN_OUT":
      return initialState;
    default:
      return state;
  }
}
