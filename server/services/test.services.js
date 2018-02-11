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
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);`,
    [
      uuid,
      request.body.type,
      request.body.testReference,
      request.body.title,
      request.body.product,
      request.body.status,
      request.body.description,
      request.body.validationThreshold,
      request.body.timing,
      request.body.imageSrc,
      request.body.evaluationFormPath,
      request.body.evaluationResultsPath,
      request.body.createdBy
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
      testReference: dbResult.rows[0].test_reference,
      title : dbResult.rows[0].title,
      product : dbResult.rows[0].product,
      status : dbResult.rows[0].status,
      description : dbResult.rows[0].description,
      validationThreshold : dbResult.rows[0].validation_threshold,
      timing : dbResult.rows[0].timing,
      imageSrc : dbResult.rows[0].image_src,
      evaluationFormPath : dbResult.rows[0].evaluation_form_path,
      evaluationResultsPath : dbResult.rows[0].evaluation_results_path,
      createdBy : dbResult.rows[0].created_by
    };
  });
};


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
      request.body.testReference,
      request.body.title,
      request.body.product,
      request.body.status,
      request.body.description,
      request.body.validationThreshold,
      request.body.timing,
      request.body.imageSrc,
      request.body.evaluationFormPath,
      request.body.evaluationResultsPath,
      request.body.createdBy
    ]
  );
}

module.exports = {
  insertTest: insertTest,
  selectTest: selectTest,
  updateTest: updateTest
}
