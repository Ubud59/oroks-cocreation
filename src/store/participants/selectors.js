export function getParticipantsState(state) {
  return {
    tests: {
      id: state.user.id,
      test_id: state.user.test_id,
      user_id: state.user.user_id,
      invitation_status: state.user.invitation_status,
      evaluation_status: state.user.evaluation_status,
      evaluation_rating: state.user.evaluation_rating,
    }
  };
}
