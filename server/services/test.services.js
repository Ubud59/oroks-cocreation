const uuidv4 = require("uuid/v4");


const insertTest = (pool, request) => {

  const uuid=uuidv4();
  return pool.query(
    `INSERT INTO tests (
      id,
      type,
      test_reference,
      title,
      product,
      status,
      description,
      validation_threshold,
      timing,
      image_src,
      evaluation_form_path,
      evaluation_results_path,
      created_by
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id;`,
    [
      uuid,
      request.body.type,
      request.body.test_reference,
      request.body.title,
      request.body.product,
      request.body.status,
      request.body.description,
      request.body.validation_threshold,
      request.body.timing,
      request.body.image_src,
      request.body.evaluation_form_path,
      request.body.evaluation_results_path,
      request.body.created_by
    ]
  );
};

const selectTest = (pool, request) => {

  const testId=request.params.id;
  return pool.query(
    `SELECT *
    FROM tests
    WHERE id=$1;`,
    [testId]
  )
  .then((dbResult) => {
    return test = {
      id: dbResult.rows[0].id,
      type: dbResult.rows[0].type,
      test_reference: dbResult.rows[0].test_reference,
      title : dbResult.rows[0].title,
      product : dbResult.rows[0].product,
      status : dbResult.rows[0].status,
      description : dbResult.rows[0].description,
      validation_threshold : dbResult.rows[0].validation_threshold,
      timing : dbResult.rows[0].timing,
      image_src : dbResult.rows[0].image_src,
      evaluation_form_path : dbResult.rows[0].evaluation_form_path,
      evaluation_results_path : dbResult.rows[0].evaluation_results_path,
      created_by : dbResult.rows[0].created_by
    };
  });
};

const selectTestById = (pool, testId) => {
  return pool.query(
    `SELECT
    	T.id,
    	T.type,
    	T.test_reference,
    	T.title,
    	T.product,
    	T.status,
    	T.description,
    	T.validation_threshold,
    	T.timing,
    	T.image_src,
    	T.evaluation_form_path,
    	T.evaluation_results_path,
    	T.created_by
    FROM tests T
    WHERE T.id = $1::uuid`
    , [testId]
    )
      .then(dbResult => dbResult.rows)
      .catch(e => console.warn(e));
}


const updateTest = (pool, request) => {

  const testId=request.params.id;
  return pool.query(
    `UPDATE tests set
      type = $2,
      test_reference = $3,
      title = $4,
      product = $5,
      status = $6,
      description = $7,
      validation_threshold = $8,
      timing = $9,
      image_src = $10,
      evaluation_form_path = $11,
      evaluation_results_path = $12,
      created_by = $13
    WHERE id = $1;`,
    [
      request.body.id,
      request.body.type,
      request.body.test_reference,
      request.body.title,
      request.body.product,
      request.body.status,
      request.body.description,
      request.body.validation_threshold,
      request.body.timing,
      request.body.image_src,
      request.body.evaluation_form_path,
      request.body.evaluation_results_path,
      request.body.created_by
    ]
  );
}

module.exports = {
  insertTest: insertTest,
  selectTest: selectTest,
  updateTest: updateTest,
  selectTestById: selectTestById
}
