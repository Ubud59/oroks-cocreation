export function updateTest(dispatch) {
  return {
    updateTestType: (testType) => dispatch({type:"UPDATE_TEST_TYPE", testType: testType})
  }
}
