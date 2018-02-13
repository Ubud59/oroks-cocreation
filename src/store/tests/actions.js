export function updateTests(dispatch) {
  return {
    fetchMyTests: (tests) => dispatch({type:"FETCH_MY_TESTS", tests: tests}),
    updateMyTest: (test) => dispatch({type:"UPDATE_MY_TEST", test: test}),
    fetchAllTests: (tests) => dispatch({type:"FETCH_ALL_TESTS", tests: tests})
  }
}
