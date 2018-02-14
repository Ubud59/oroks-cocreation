import { postNewTest} from '../../utils/test.services.js';

export function updateTest(dispatch) {
  return {
    updateTestField:(field, value) => dispatch({type:"UPDATE_TEST_FIELD", field:field, value:value}),
    createTest:(test) => {
      return postNewTest(test)
      .then(id => {
        test.id=id;
        dispatch({type:"CREATE_TEST", test:test});
        return id;
      })
    },
    fetchTest:(test) => dispatch({type:"FETCH_TEST", test:test}),
    updateTest:(test) => dispatch({type:"UPDATE_TEST", test:test})
  }
}
