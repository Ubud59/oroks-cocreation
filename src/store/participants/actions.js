
export function updateParticipants(dispatch) {
  return {
    updateParticipantField:(index, field, value) => dispatch({type:"UPDATE_PARTICIPANT_FIELD", index:index, field:field, value:value}),
    fetchParticipants:(participants) => dispatch({type:"FETCH_PARTICIPANTS", participants:participants}),
    fetchTest:(test) => dispatch({type:"FETCH_TEST", test:test}),
    updateParticipant:(participant) => dispatch({type:"UPDATE_PARTICIPANT", participant:participant})

  }
}
