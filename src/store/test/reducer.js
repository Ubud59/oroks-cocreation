import { postNewTest } from '../../utils/test.services.js';

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
    case "UPDATE_TEST_FIELD":
      return {...state, [action.field]: action.value};
    case "CREATE_TEST":
      postNewTest(action.test);
      return initialState;
    default:
      return state;
  }
}
