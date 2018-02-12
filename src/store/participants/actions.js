
export function updateParticipants(dispatch) {
  return {
    updateParticipantField:(id, field, value) => dispatch({type:"UPDATE_PARTICIPANT_FIELD", id:id, field:field, value:value}),
    fetchParticipants:(participants) => dispatch({type:"FETCH_PARTICIPANTS", participants:participants}),
    fetchTest:(test) => dispatch({type:"FETCH_TEST", test:test}),
    updateParticipant:(participant) => dispatch({type:"UPDATE_PARTICIPANT", participant:participant})

  }
}
