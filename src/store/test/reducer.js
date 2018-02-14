import { postUpdatedTest} from '../../utils/test.services.js';

const initialState = {
  id: null,
  type: "",
  test_reference: "",
  title: "",
  product: "",
  status: "",
  description: "",
  validation_threshold: "",
  timing: "",
  image_src: "",
  evaluation_form_path: "",
  evaluation_results_path: "",
  created_by:""
};



export default function testReducer(state = initialState, action) {
  switch (action.type) {

    case "UPDATE_TEST_FIELD":
      return {...state, [action.field]: action.value};

    case "CREATE_TEST":
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
