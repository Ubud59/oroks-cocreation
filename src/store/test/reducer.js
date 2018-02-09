import { postNewTest, postUpdatedTest} from '../../utils/test.services.js';

const initialState = {
  id: null,
  type: "",
  testReference: "",
  title: "",
  product: "",
  status: "",
  description: "",
  validationThreshold: "",
  timing: "",
  imageSrc: "",
  evaluationFormPath: "",
  evaluationResultsPath: "",
  createdBy:""
};



export default function testReducer(state = initialState, action) {
  switch (action.type) {

    case "UPDATE_TEST_FIELD":
      return {...state, [action.field]: action.value};

    case "CREATE_TEST":
      postNewTest(action.test);
      return action.test;

    case "UPDATE_TEST":
      postUpdatedTest(action.test);
      return action.test;

    case "FETCH_TEST":
      return action.test;

    default:
      return state;
  }
}
