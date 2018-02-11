
export function updateTeam(dispatch) {
  return {
    fetchTeam:(team) => dispatch({type:"FETCH_TEAM", team:team}),
    fetchTest:(test) => dispatch({type:"FETCH_TEST", test:test})
  }
}
