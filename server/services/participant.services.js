
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
      request.body.test_id,
      request.body.user_id,
      request.body.invitation_status,
      request.body.evaluation_status,
      request.body.evaluation_rating
    ]
  );
}



module.exports = {
  updateParticipant: updateParticipant,
  selectParticipants: selectParticipants
}
