const initialState = [];

export default function testsReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_MY_TESTS":
      return action.tests;
    default:
      return state;
  }
}
