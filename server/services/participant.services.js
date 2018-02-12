
const selectParticipants = (pool, request) => {

  const testId=request.params.id;

  return pool.query(
    `SELECT
      p.id,
      p.test_id,
      p.user_id,
      p.invitation_status,
      p.evaluation_status,
      p.evaluation_rating,
      u.first_name,
      u.last_name,
      u.email,
      u.phone_number,
      u.user_type,
      u.external_id
    FROM test_participants p, users u
    WHERE test_id=$1
    and p.user_id = u.id;`,
    [testId]
  )
  .then((dbResult) => {
    return participants = dbResult.rows;
  })
  .then((participants) => {
    return participants.map((participant) => {
      return {
        id: participant.id,
        testId: participant.test_id,
        userId: participant.user_id,
        invitationStatus: participant.invitation_status,
        evaluationStatus: participant.evaluation_status,
        evaluationRating: participant.evaluation_rating,
        firstName: participant.first_name,
        lastName: participant.last_name,
        email: participant.email,
        phoneNumber: participant.phone_number,
        userType: participant.user_type,
        externalId: participant.external_id
      };
    });
  });
}


const updateParticipant = (pool, request) => {

  const participantId=request.params.id;

  return pool.query(
    `UPDATE test_participants set
      test_id = $2,
      user_id = $3,
      invitation_status = $4,
      evaluation_status = $5,
      evaluation_rating = $6
    WHERE id = $1;`,
    [
      request.body.id,
      request.body.testId,
      request.body.userId,
      request.body.invitationStatus,
      request.body.evaluationStatus,
      request.body.evaluationRating
    ]
  );
}



module.exports = {
  updateParticipant: updateParticipant,
  selectParticipants: selectParticipants
}
