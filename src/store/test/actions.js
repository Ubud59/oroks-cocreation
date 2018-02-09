export function updateTest(dispatch) {
  return {
    updateTestField:(field, value) => dispatch({type:"UPDATE_TEST_FIELD", field:field, value:value}),
    createTest:(test) => dispatch({type:"CREATE_TEST", test:test}),
    fetchTest:(test) => dispatch({type:"FETCH_TEST", test:test}),
    updateTest:(test) => dispatch({type:"UPDATE_TEST", test:test})
  }
}
