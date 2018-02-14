const uuidv4 = require('uuid/v4');
const testServices = require("./test.services")

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

const setPartcipantToTest = (pool, testId, userId) => {
  return pool.query(
    "INSERT INTO test_participants (id, test_id, user_id, invitation_status, evaluation_status) VALUES($1::uuid, $2::uuid, $3::uuid, $4, $5)",
    [uuidv4(), testId, userId, "IGNORED", "NOT_FILLED"]
  )
}

const getTestAndParticipants = (pool, testId) => {
  // recup detail d'un testId
    const promise1 = testServices.selectTestById(pool, testId)
  // get participants d'un testId
    const promise2 = getUserProfileAndParticipantsInfos(pool, testId)
  // promise All et rerutn full object

  return Promise.all([promise1, promise2]).then(function(values) {
    let testDetail = {...values[0][0], participants: values[1]};
    testDetail.participants = values[1];
    return testDetail
  });
}


const getUserProfileAndParticipantsInfos = (pool, testId) => {
  return pool.query(
    `SELECT
      	U.first_name,
      	U.last_name,
      	U.birthdate,
      	U.sex,
      	U.email,
      	U.phone_number,
      	U.user_type,
      		TP.invitation_status,
      		TP.evaluation_status,
      		TP.evaluation_rating,
      		    UP.expert_panel,
      	    	UP.height,
      	    	UP.weight,
      	    	UP.practice_type,
      	    	UP.club_city,
      	    	UP.club_name,
      	    	UP.start_of_practice_year,
      	    	UP.category,
      	    	UP.shoe_size,
      	    	UP.skate_width,
      	    	UP.shin_gard_size,
      	    	UP.pant_size,
      	    	UP.elbow_pad_size,
      	    	UP.shoulder_pad_size,
      	    	UP.glove_size,
      	    	UP.helmet_size,
      	    	UP.head_size
      FROM test_participants TP
      INNER JOIN users U on TP.user_id = U.id
      INNER JOIN user_profiles UP on UP.user_id = U.id
      WHERE TP.test_id = $1::uuid`,
    [testId]
  ).then(dbResult => dbResult.rows)
}

module.exports = {
  updateParticipant: updateParticipant,
  selectParticipants: selectParticipants,
  setPartcipantToTest: setPartcipantToTest,
  getTestAndParticipants: getTestAndParticipants
}
