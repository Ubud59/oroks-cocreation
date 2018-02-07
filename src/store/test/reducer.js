const initialState = {
  id: null,
  type: null,
  testReference: null,
  title: null,
  product: null,
  status: null,
  description: null,
  validationTreshold: null,
  timing: null,
  imgSrc: null,
  evaluationFormPath: null,
  evaluationResultsPath: null,
};



export default function testReducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_TEST_TYPE":
      return {...state, type: action.testType};
    default:
      return state;
  }
}
