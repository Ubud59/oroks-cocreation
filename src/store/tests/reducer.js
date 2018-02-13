const initialState = [];

export default function testsReducer(state = initialState, action) {
  switch (action.type) {

    case "FETCH_MY_TESTS":
      return action.tests;

    case "UPDATE_MY_TEST":
      console.log("state",state);
      const updatedTests=[...state];
      const index = updatedTests.findIndex(function(element) {
        return (element.id===action.test.id);
      });
      updatedTests[index] = action.test;
      return updatedTests;

      case "FETCH_ALL_TESTS":
      console.log("state de fetch all tests",action.tests);
        return action.tests;

    default:
      return state;
  }
}
