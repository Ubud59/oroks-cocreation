const uuidv4 = require('uuid/v4');

const getUserProfileByExternalId = (pool, externalId) => {

  return pool.query(`
    SELECT
    U.id,
    U.first_name,
    U.last_name,
    U.birthdate,
    U.sex,
    U.email,
    U.phone_number,
    U.user_type,
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
    FROM USERS U
    INNER JOIN USER_PROFILES UP on UP.user_id = U.id
    WHERE U.external_id = $1::text`,
    [externalId])
}

const findbyExternalIdOrCreateUser = (pool, oauthUser) => {

    return getUserProfileByExternalId(pool, oauthUser.id)
      .then(dbRows => {
        if (dbRows.rows.length > 0) {
          return 'existingUser'
        } else {
          return createUser(pool, oauthUser)
        }
      })
      .catch(e => console.warn(e))
}


const createUser = (pool, user) => {
  return pool.query("INSERT INTO USERS (id, first_name, last_name, birthdate, sex, email, phone_number, user_type, external_id) VALUES ($1::uuid, $2::text, $3::text, $4::text, $5::text, $6::text, $7::text, $8, $9::text) RETURNING id",
  [uuidv4(), user.firstname, user.lastname, user.birthdate, user.sexe, user.email , user.phone ,'TEST', user.id]
  )
    .then(userRecordId => {return createUserProfile(pool, userRecordId.rows[0].id)})
    .catch(e => console.warn(e));
}

const createUserProfile = (pool, userId) => {
  return pool.query("INSERT INTO USER_PROFILES (id, user_id) VALUES ($1::uuid, $2::uuid)", [uuidv4(), userId])
      .then(res => {
        return 'createdUser'
      })
      .catch(e => console.warn(e));
}

module.exports = {
  findbyExternalIdOrCreateUser: findbyExternalIdOrCreateUser,
  getUserProfileByExternalId: getUserProfileByExternalId
}
