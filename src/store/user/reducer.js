const initialState = {
  id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
  firstName: "chloe",
  lastName: "bataille",
  email: "chloe.bataille@gmail.com",
  phoneNumber: "0665578124",
  userType: "TEST",
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
