export function updateTests(dispatch) {
  return {
    fetchMyTests: (tests) => dispatch({type:"FETCH_MY_TESTS", tests: tests})
  }
}
