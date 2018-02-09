
const selectTeam = (pool, request) => {

  const testId=request.params.id;
  console.log("testId in selectTeam",testId);

  return pool.query(
    `SELECT *
    FROM test_participants p, users u
    WHERE test_id=$1
    and p.user_id = u.id;`,
    [testId]
  )
  .then((dbResult) => {
    console.log("nb rows returned in selectTeam",dbResult.rows.length);
    return team = dbResult.rows;
  })
  .then((team) => {
    return team.map((participant) => {
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

module.exports = {
  selectTeam: selectTeam
}
